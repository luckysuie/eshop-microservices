
## Infrastructure provisioning using Azure CLI commands
az group create --name eshop-rg --location CentralIndia
az vm create --resource-group eshop-rg --name eshop-vm --image Canonical:ubuntu-24_04-lts:server:latest --size Standard_D2s_v3 --admin-username azureuser --admin-password AdminPassword123! --public-ip-address-dns-name eshop-vm-dns --output json
az vm open-port --resource-group eshop-rg --name eshop-vm --port 8080-8085
az vm open-port --resource-group eshop-rg --name eshop-vm --port 3000 --priority 1001
az sql server create --name eshop-sqlserver7894 --resource-group eshop-rg --location CentralIndia --admin-user adminuser --admin-password AdminPassword123!
az sql db create --resource-group eshop-rg --server eshop-sqlserver7894 --name eshopdb --service-objective S0
az sql server firewall-rule create --resource-group eshop-rg --server eshop-sqlserver7894 --name AllowYourIP --start-ip-address  49.43.219.93 --end-ip-address  49.43.219.93  ## Replace with your actual system IP address to allow access to the SQL Server from your machine
az sql server firewall-rule create --resource-group eshop-rg --server eshop-sqlserver7894 --name AllowAzureServices --start-ip-address  0.0.0.0 --end-ip-address  255.255.255.255
az sql server firewall-rule create --resource-group eshop-rg --server eshop-sqlserver7894 --name eshop-vm --start-ip-address 4.240.49.232 --end-ip-address 4.240.49.232  ## Replace with the public IP address of your VM to allow access to the SQL Server from the VM
az keyvault create --name eshop-kv7894 --resource-group eshop-rg --location CentralIndia
az acr create --resource-group eshop-rg --name eshopacr7894 --sku Basic --admin-enabled true --output json  
az aks create --resource-group eshop-rg --name eshop-aks7894 --node-count 1 --generate-ssh-keys --attach-acr eshopacr7894

## Assign Key Vault Administrator role to the signed-in user for the Key Vault
USER_OBJECT_ID=$(az ad signed-in-user show --query id -o tsv)  ## Get the object ID of the signed-in user and store it in a variable
KV_ID=$(az keyvault show --name eshop-kv7894 --resource-group eshop-rg --query id -o tsv)  ## Get the resource ID of the Key Vault and store it in a variable
az role assignment create --assignee $USER_OBJECT_ID --role "Key Vault Administrator" --scope $KV_ID  ## Assign the Key Vault Administrator role to the signed-in user for the Key Vault


## Store the database connection string, username, and password as secrets in Azure Key Vault
az keyvault secret set --vault-name eshop-kv7894 --name "db-url" --value "jdbc:sqlserver://eshop-sqlserver7894.database.windows.net:1433;database=eshopdb;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;"
az keyvault secret set --vault-name eshop-kv7894 --name "db-username" --value "adminuser"
az keyvault secret set --vault-name eshop-kv7894 --name "db-password" --value "AdminPassword123!"


## Assign a managed identity to the VM and grant it access to the Key Vault
az vm identity assign --name eshop-vm --resource-group eshop-rg  ## Assign a managed identity to the VM
VM_IDENTITY_PRINCIPAL_ID=$(az vm show --name eshop-vm --resource-group eshop-rg --query identity.principalId -o tsv) ## Get the principal ID of the managed identity assigned to the VM and store it in a variable
KV_ID=$(az keyvault show --name eshop-kv7894 --resource-group eshop-rg --query id -o tsv) ## Get the resource ID of the Key Vault and store it in a variable
az role assignment create --assignee $VM_IDENTITY_PRINCIPAL_ID --role "Key Vault Secrets User" --scope $KV_ID ## Grant the managed identity access to the Key Vault
az role assignment list --assignee $VM_IDENTITY_PRINCIPAL_ID --scope $KV_ID --output table ## Verify that the managed identity has been granted access to the Key Vault


## Sign in to the VM using SSH
open command prompt or terminal and run the following command to SSH into the VM:
ssh azureuser@<VM_PUBLIC_IP>


## Install Docker on the VM and use it without sudo
sudo apt-get update
wget -qO- https://get.docker.com/ | sh ### Install Docker using the convenience script provided by Docker
sudo groupadd -f docker ## Create the docker group if it doesn't exist
sudo usermod -aG docker $USER ## Add the current user to the docker group
sudo systemctl restart docker
newgrp docker
docker --version  ## Verify that Docker is installed and running


## Install kubectl on the VM
sudo apt-get update
sudo snap install --classic kubectl
kubectl version --client  

## Install Azure CLI on the VM  
sudo apt-get update
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
az --version 

## Login to Azure from the VM
az login --use-device-code  ## Use device code authentication to log in to Azure from the VM
az acr login --name eshopacr7894  ## Log in to the Azure Container Registry
az aks get-credentials --resource-group eshop-rg --name eshop-aks7894 ## Get the credentials for the AKS cluster and configure kubectl to use them

## Copy the project files from your local machine to the VM using SCP
scp -r D:\Bootcamp11 azureuser@4.240.49.232:/home/azureuser/

## Create a Docker network for the microservices
docker network create eshop-network

## Build and run the microservices in Docker containers
docker build -t user-service:latest .
docker tag user-service:latest eshopacr7894.azurecr.io/user-service:latest
docker push eshopacr7894.azurecr.io/user-service:latest
docker run -d --name user-service --network eshop-network -p 8083:8083 user-service:latest

docker build -t order-service:latest .
docker tag order-service:latest eshopacr7894.azurecr.io/order-service:latest
docker push eshopacr7894.azurecr.io/order-service:latest
docker run -d --name order-service --network eshop-network -p 8080:8080 order-service:latest

docker build -t product-service:latest .
docker tag product-service:latest eshopacr7894.azurecr.io/product-service:latest
docker push eshopacr7894.azurecr.io/product-service:latest
docker run -d --name product-service --network eshop-network -p 8082:8082 product-service:latest

docker build -t payment-service:latest .
docker tag payment-service:latest eshopacr7894.azurecr.io/payment-service:latest
docker push eshopacr7894.azurecr.io/payment-service:latest
docker run -d --name payment-service --network eshop-network -p 8084:8084 payment-service:latest

docker build -t frontend-service:latest .
docker tag frontend-service:latest eshopacr7894.azurecr.io/frontend-service:latest
docker push eshopacr7894.azurecr.io/frontend-service:latest
docker run -d --name frontend-service --network eshop-network -p 3000:80 frontend-service:latest


## check all pushed images in ACR
az acr repository list --name eshopacr7894 --output table

## Deploy the microservices to AKS using kubectl
cd k8s # inside the vm itself navigate to the k8s directory where the deployment and service YAML files are located
kubectl apply -f frontend/deployment.yaml -f frontend/service.yaml
kubectl apply -f order-service/deployment.yaml -f order-service/service.yaml
kubectl apply -f product-service/deployment.yaml -f product-service/service.yaml
kubectl apply -f payment-service/deployment.yaml -f payment-service/service.yaml
kubectl apply -f user-service/deployment.yaml -f user-service/service.yaml

## Verify that the pods are running in the AKS cluster
kubectl get pods --all-namespaces
kubectl get services --all-namespaces
kubectl get deployments --all-namespaces
kubectl get nodes
kubectl describe pod <pod-name>  ## Replace <pod-name> with the name of the pod you want to describe



az group delete --name eshop-rg --yes --no-wait

