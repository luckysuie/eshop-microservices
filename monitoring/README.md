# Monitoring with Azure Managed Grafana

This guide explains how to set up monitoring for the ShopEase AKS cluster
using Azure Managed Grafana and Azure Monitor.

## Architecture

```
AKS Cluster → Azure Monitor → Azure Managed Grafana
                  ↑
            Container Insights
```

## Setup Steps

### 1. Enable Container Insights on AKS

In Azure Portal:
1. Go to your AKS cluster
2. Click **Monitoring** → **Insights**
3. Click **Enable** and select/create an Azure Monitor workspace

Or via Azure CLI:
```bash
az aks enable-addons \
  --resource-group YOUR_RESOURCE_GROUP \
  --name YOUR_AKS_CLUSTER \
  --addons monitoring \
  --workspace-resource-id YOUR_LOG_ANALYTICS_WORKSPACE_ID
```

### 2. Create Azure Managed Grafana

```bash
az grafana create \
  --name shopease-grafana \
  --resource-group YOUR_RESOURCE_GROUP \
  --location eastus
```

### 3. Connect Grafana to Azure Monitor

1. Open your Grafana instance in the Azure Portal
2. Go to **Configuration** → **Data Sources**
3. Add **Azure Monitor** as a data source
4. Select your subscription and Log Analytics workspace

### 4. Import AKS Dashboards

In Grafana:
1. Click **+** → **Import**
2. Import these official dashboards by ID:
   - **10956** - Kubernetes Cluster Monitoring
   - **13105** - AKS - Container Insights
   - **3119** - Kubernetes Deployment Statuses

### 5. Create Custom Alerts

Recommended alerts for ShopEase:

| Alert | Condition | Severity |
|-------|-----------|----------|
| Pod CrashLooping | `kube_pod_container_status_restarts_total > 5` | Critical |
| High Memory | Container memory > 80% of limit | Warning |
| High CPU | Container CPU > 90% of limit | Warning |
| Deployment Unavailable | Available replicas < desired | Critical |

### Create an Alert via Azure CLI

```bash
az monitor metrics alert create \
  --name "high-cpu-alert" \
  --resource-group YOUR_RESOURCE_GROUP \
  --scopes YOUR_AKS_CLUSTER_ID \
  --condition "avg Percentage CPU > 80" \
  --description "AKS CPU usage is above 80%" \
  --window-size 5m \
  --evaluation-frequency 1m
```

### 6. Useful KQL Queries for Log Analytics

#### View logs from a specific service
```kql
ContainerLog
| where ContainerName == "user-service"
| where TimeGenerated > ago(1h)
| project TimeGenerated, LogEntry
| order by TimeGenerated desc
```

#### Count errors per service
```kql
ContainerLog
| where LogEntry contains "ERROR"
| where TimeGenerated > ago(1h)
| summarize ErrorCount = count() by ContainerName
| order by ErrorCount desc
```

#### Pod restart count
```kql
KubePodInventory
| where Namespace == "ecommerce"
| summarize Restarts = sum(PodRestartCount) by ContainerName
| order by Restarts desc
```

## Azure Key Vault Integration

For production, store all secrets in Azure Key Vault and use the
**Secrets Store CSI Driver** to inject them into pods.

### Setup

1. Install the CSI Driver:
```bash
az aks enable-addons \
  --addons azure-keyvault-secrets-provider \
  --name YOUR_AKS_CLUSTER \
  --resource-group YOUR_RESOURCE_GROUP
```

2. Create a SecretProviderClass manifest (example):
```yaml
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: ecommerce-kv-secrets
  namespace: ecommerce
spec:
  provider: azure
  parameters:
    usePodIdentity: "false"
    useVMManagedIdentity: "true"
    userAssignedIdentityID: YOUR_MANAGED_IDENTITY_CLIENT_ID
    keyvaultName: YOUR_KEYVAULT_NAME
    objects: |
      array:
        - |
          objectName: db-url
          objectType: secret
        - |
          objectName: db-username
          objectType: secret
        - |
          objectName: db-password
          objectType: secret
    tenantId: YOUR_TENANT_ID
```

3. Create Key Vault secrets:
```bash
az keyvault secret set --vault-name YOUR_KEYVAULT --name db-url     --value "jdbc:sqlserver://..."
az keyvault secret set --vault-name YOUR_KEYVAULT --name db-username --value "your-username"
az keyvault secret set --vault-name YOUR_KEYVAULT --name db-password --value "your-password"
```
