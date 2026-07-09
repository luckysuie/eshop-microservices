# ShopEase - Microservices E-Commerce Application

A full-stack e-commerce platform built with **React** frontend and **Spring Boot** microservices backend, deployed on **Azure Kubernetes Service (AKS)**.

## Architecture Overview

```
                    ┌─────────────────────────────────────────┐
                    │           React Frontend (Vite)          │
                    │              Port: 3000                  │
                    └──────────────────┬──────────────────────┘
                                       │ HTTP (Axios)
          ┌────────────────────────────┼────────────────────────────┐
          │                            │                            │
    ┌─────▼──────┐   ┌─────────────┐  │  ┌─────────────┐  ┌───────▼──────┐
    │   User     │   │  Product    │  │  │   Order     │  │  Payment     │
    │  Service   │   │  Service   │  │  │  Service    │  │  Service     │
    │ Port: 8081 │   │ Port: 8082 │  │  │ Port: 8083 │  │ Port: 8084   │
    └─────┬──────┘   └─────┬───────┘  │  └─────┬───────┘  └──────┬──────┘
          │                │           │         │                  │
          └────────────────┴───────────┴─────────┴──────────────────┘
                                       │
                              ┌────────▼────────┐
                              │  Azure SQL DB    │
                              │ (one per service │
                              │   in production) │
                              └─────────────────┘
```

## Services

| Service | Port | Description | Technology |
|---------|------|-------------|------------|
| `frontend` | 3000 | Shopping UI | React 18, Vite, Bootstrap 5 |
| `user-service` | 8081 | User auth & profiles | Spring Boot 3.2, Java 17 |
| `product-service` | 8082 | Product catalog | Spring Boot 3.2, Java 17 |
| `order-service` | 8083 | Order management | Spring Boot 3.2, Java 17 |
| `payment-service` | 8084 | Payment processing | Spring Boot 3.2, Java 17 |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 + Bootstrap 5 + Axios |
| Backend | Spring Boot 3.2.3 + Java 17 + Lombok + JPA |
| Database | Azure SQL Database (SQL Server) |
| Secrets | Azure Key Vault |
| Container Registry | Azure Container Registry (ACR) |
| Orchestration | Azure Kubernetes Service (AKS) |
| Monitoring | Azure Managed Grafana + Container Insights |
| CI/CD | GitHub Actions |

## Repository Structure

```
Bootcamp11/
├── frontend/                      # React + Vite app
│   ├── src/
│   │   ├── context/               # Auth + Cart state
│   │   ├── services/              # Axios API calls per service
│   │   ├── components/            # Navbar, Footer, ProductCard, etc.
│   │   └── pages/                 # One file per route
│   ├── Dockerfile
│   └── README.md
│
├── backend/
│   ├── user-service/              # Port 8081
│   │   ├── src/main/java/com/ecommerce/userservice/
│   │   │   ├── entity/            # JPA entities
│   │   │   ├── dto/               # Request/Response DTOs
│   │   │   ├── repository/        # Spring Data JPA repos
│   │   │   ├── service/           # Business logic (interface + impl)
│   │   │   ├── controller/        # REST controllers
│   │   │   └── exception/         # Global error handler
│   │   ├── Dockerfile
│   │   └── README.md
│   ├── product-service/           # Port 8082
│   ├── order-service/             # Port 8083
│   └── payment-service/           # Port 8084
│
├── k8s/                           # Kubernetes manifests
│   ├── frontend/                  # deployment.yaml + service.yaml
│   ├── user-service/              # deployment.yaml + service.yaml
│   ├── product-service/           # deployment.yaml + service.yaml
│   ├── order-service/             # deployment.yaml + service.yaml
│   └── payment-service/           # deployment.yaml + service.yaml
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions CI/CD pipeline
│
├── monitoring/
│   └── README.md                  # Grafana + Azure Monitor setup guide
│
└── README.md                      # This file
```

## Deployment to Azure AKS

#### Prerequisites
```bash
# Install tools
az --version         # Azure CLI
kubectl version      # kubectl
docker --version     # Docker
```

#### Step 1: Create Azure Resources

```bash
# Login
az login

# Create resource group
az group create --name shopease-rg --location eastus

# Create Azure Container Registry
az acr create --name shopeaseacr --resource-group shopease-rg --sku Basic

# Create AKS cluster (attaches to ACR automatically)
az aks create \
  --resource-group shopease-rg \
  --name shopease-aks \
  --node-count 2 \
  --attach-acr shopeaseacr \
  --generate-ssh-keys
```

#### Step 2: Set GitHub Secrets

In your GitHub repository: **Settings → Secrets and variables → Actions**

Add these secrets:

| Secret Name | How to Get |
|-------------|-----------|
| `AZURE_CREDENTIALS` | Run the az command below |
| `ACR_NAME` | Your ACR name (e.g. `shopeaseacr`) |
| `AKS_CLUSTER_NAME` | Your AKS name (e.g. `shopease-aks`) |
| `AZURE_RESOURCE_GROUP` | Your resource group (e.g. `shopease-rg`) |

```bash
# Generate AZURE_CREDENTIALS (copy the entire JSON output)
az ad sp create-for-rbac \
  --name "shopease-github-actions" \
  --role contributor \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/shopease-rg \
  --sdk-auth
```

#### Step 3: Set Your Key Vault Name

In VS Code press **`Ctrl + Shift + H`**:
- **Find:** `YOUR_KEYVAULT_NAME`
- **Replace:** your Key Vault name (e.g. `shopease-kv`)
- Click **Replace All**

Done. All four backend services are updated in one shot.

#### Step 4: Push to Main

Push your code to the `main` branch to trigger the CI/CD pipeline:

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

The GitHub Actions pipeline will:
1. Build all 5 Docker images
2. Push them to Azure Container Registry
3. Deploy to AKS

Monitor the deployment in the **Actions** tab of your GitHub repository.

## API Reference

### User Service (8081)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login |
| GET | `/api/users/{id}` | Get user |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |

### Product Service (8082)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get product |
| GET | `/api/products/search?name=x` | Search by name |
| GET | `/api/products/category/{cat}` | Filter by category |
| POST | `/api/products` | Create product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |

### Order Service (8083)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/orders` | Place order |
| GET | `/api/orders/user/{userId}` | User's orders |
| GET | `/api/orders/{id}` | Get order |
| PUT | `/api/orders/{id}/status` | Update status |
| DELETE | `/api/orders/{id}` | Delete order |

### Payment Service (8084)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/payments` | Process payment |
| GET | `/api/payments/{id}` | Get payment |
| GET | `/api/payments/order/{orderId}` | Payment for order |
| PUT | `/api/payments/{id}/status` | Update status |

## Azure Key Vault Setup (One-Time)

Database credentials are stored exclusively in Azure Key Vault. Spring Boot fetches them at startup via **Spring Cloud Azure** + **Workload Identity** — no credentials in code, `.env` files, or K8s manifests.

### 1. Create Key Vault and store secrets

```bash
KEYVAULT_NAME="shopease-kv"
az keyvault create --name $KEYVAULT_NAME --resource-group shopease-rg --location eastus --enable-rbac-authorization true

# Store DB credentials (secret names must match exactly)
az keyvault secret set --vault-name $KEYVAULT_NAME --name "db-url"      --value "jdbc:sqlserver://YOUR_SERVER.database.windows.net:1433;database=YOUR_DB;encrypt=true"
az keyvault secret set --vault-name $KEYVAULT_NAME --name "db-username" --value "your-sql-username"
az keyvault secret set --vault-name $KEYVAULT_NAME --name "db-password" --value "your-sql-password"
```

### 2. Create Managed Identity and grant Key Vault access

```bash
IDENTITY_NAME="shopease-kv-identity"
az identity create --name $IDENTITY_NAME --resource-group shopease-rg

IDENTITY_CLIENT_ID=$(az identity show --name $IDENTITY_NAME --resource-group shopease-rg --query clientId -o tsv)
IDENTITY_PRINCIPAL_ID=$(az identity show --name $IDENTITY_NAME --resource-group shopease-rg --query principalId -o tsv)
KV_ID=$(az keyvault show --name $KEYVAULT_NAME --resource-group shopease-rg --query id -o tsv)

az role assignment create --role "Key Vault Secrets User" --assignee-object-id $IDENTITY_PRINCIPAL_ID --assignee-principal-type ServicePrincipal --scope $KV_ID
```

### 3. Enable Workload Identity on AKS

```bash
az aks update --name shopease-aks --resource-group shopease-rg --enable-oidc-issuer --enable-workload-identity

AKS_OIDC=$(az aks show --name shopease-aks --resource-group shopease-rg --query "oidcIssuerProfile.issuerUrl" -o tsv)

az identity federated-credential create \
  --name "shopease-fedcred" --identity-name $IDENTITY_NAME --resource-group shopease-rg \
  --issuer $AKS_OIDC \
  --subject "system:serviceaccount:ecommerce:ecommerce-workload-identity-sa" \
  --audience "api://AzureADTokenExchange"
```

### 4. Create the Workload Identity Service Account in AKS

```bash
kubectl create namespace ecommerce --dry-run=client -o yaml | kubectl apply -f -

kubectl create serviceaccount ecommerce-workload-identity-sa \
  --namespace ecommerce \
  --dry-run=client -o yaml \
  | kubectl annotate --local -f - azure.workload.identity/client-id=$IDENTITY_CLIENT_ID -o yaml \
  | kubectl apply -f -
```

### 5. Set Your Key Vault Name — One Search-Replace

In VS Code press **`Ctrl + Shift + H`** (Find & Replace across all files):

- **Find:** `YOUR_KEYVAULT_NAME`
- **Replace:** your actual Key Vault name (e.g. `shopease-kv`)
- Click **Replace All**

That replaces it in all four `application.properties` files at once. Spring Boot reads the URL at startup and connects to Key Vault automatically.

---

## Security Best Practices

- DB credentials live only in Azure Key Vault — never in code or K8s manifests
- Spring Boot authenticates to Key Vault via Workload Identity (no passwords needed)
- CORS is configured on each backend service
- In production: enable HTTPS on the Ingress using cert-manager

## Monitoring

See [monitoring/README.md](monitoring/README.md) for:
- Azure Managed Grafana setup
- Azure Monitor + Container Insights
- Useful KQL queries for log analysis
- Alert configuration

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request to `main`
