# Deploying a Java spring boot microservice application to AKS via GitHub actions

### Monolithic vs Microservices

---

#### 1. Monolithic Application

### Definition

A Monolithic Application is a single application that contains all business functionalities in one codebase, one build, and one deployment unit.

### Example

E-commerce Application

```text
├── Login
├── Products
├── Orders
├── Payments
└── Notifications
```

### Java Spring Boot Repository Structure

```text
ecommerce-monolithic/
├── pom.xml
├── Dockerfile
└── src/
    └── main/java/com/company/ecommerce/
        ├── user/
        ├── product/
        ├── order/
        ├── payment/
        └── EcommerceApplication.java
```

### Build and Deployment

```text
Source Code ---> mvn clean package --> ecommerce.jar --> Single Deployment
```

---

### 2. Microservices Application

### Definition

A Microservices Application is an architecture where the application is divided into multiple small, independent services that communicate with each other through APIs.

### Example

E-commerce System

```text
User Service
Product Service
Order Service
Payment Service
Notification Service
```

Each service is an independent Spring Boot application.

### Build Outputs

```text
user-service.jar
product-service.jar
order-service.jar
payment-service.jar
notification-service.jar
```

### Java Spring Boot Repository Structure (Monorepo Approach)

```text
ecommerce-microservices/
├── user-service/
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
├── product-service/
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
├── order-service/
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
├── payment-service/
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
├── notification-service/
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
└── .github/workflows/
    ├── user-service.yml
    ├── product-service.yml
    ├── order-service.yml
    ├── payment-service.yml
    └── notification-service.yml
```

### Build and Deployment

```text
user-service --> user-service.jar --> Deploy Independently

product-service --> product-service.jar --> Deploy Independently
```

---

### What is an API?

An API is a way for one application or service to talk to another application or service.

### Simple meaning

```text
Service A needs data
     ↓
Calls API
     ↓
Service B gives response
```

### Example

Suppose we have:

```text
User Service
Product Service
Order Service
```

Customer places an order.

order-service needs user details and product details.

So it calls APIs:

```text
order-service --> GET /users/101 --> user-service
```

Response:

```json
{
  "id": 101,
  "name": "Lucky"
}
```

Then:

```text
order-service --> GET /products/500 --> product-service
```

Response:

```json
{
  "id": 500,
  "name": "iPhone",
  "price": 1000
}
```

Now order-service can create the order.

---

### How APIs work inside AKS cluster

Inside AKS, each microservice runs as a pod.

```text
AKS Cluster

user-service pod
product-service pod
order-service pod
```

Kubernetes also creates service names like:

```text
user-service
product-service
order-service
```

So order-service can call:

```text
http://user-service/users/101
```

and:

```text
http://product-service/products/500
```

---

#### Microservices communication in AKS

```text
Customer
  ↓
API Gateway / Frontend
  ↓
order-service pod
  ↓
  ├── calls user-service API
  │       GET http://user-service/users/101
  │
  └── calls product-service API
          GET http://product-service/products/500
```

## Simple understanding

In AKS, microservices communicate through APIs using Kubernetes service names instead of IP addresses.

### steps
1. Fork the repo to your Github account. url: 
2. Open the forked repo in your local machine using visual studio code


### Provision Infrastructure using Azure CLI or portal
1. create a resouce group in the centraal india region or any other region of your choice.
2. create an sql server with admin username and password.
3. create an azrure sql database with the name of your choice in the sql server created in step 2.
4. create an firewall rule to allow your local machine to access the database.
5. creat an azure key vault named eshop-kv7894 or any other unique name in the above resource group
   Imp Note: since the keyvault name is globally unique, you can use any other name of your choice and it should match in the application.properties file of the microservices.

### Assign kevault administrator to the signed-in user for the keyvault created in step 5.
1. Get the object id of the signed-in user and store in a variable.
2. Get the resource id of the keyvault created in step 5 and store in a variable.
3. Assign the keyvault administrator role to the signed-in user using the object id and resource id stored in the above steps.

### store the database credentials in the keyvault created in step 5.
1. Store the database jdbc url in the keyvault as a secret with the name db-url.
2. Store the database username in the keyvault as a secret with the name db-username.
3. Store the database password in the keyvault as a secret with the name db-password.

Note: Before going to the next step, make sure the keyvault name in the application.properties file of the microservices matches with the keyvault name created in step 5 if not please update the application.properties file of the microservices with the correct keyvault name.

### Create an ACR and AKS cluster using Azure CLI or portal
1. Create an Azure Container Registry (ACR) in the same resource group with admin access enabled 
2. Create an AKS cluster in the same resource group created in step 2 and attach the ACR created in step 1 to the AKS cluster.

### service principal creation and role assignment
1. Create a service principal and store the appId, password, and tenant in variables.
2. Assign the service principal as contributor role at subscription level
3. store the clientId, clientSecret, subscriptionId, and tenantId in the github secrets of the forked repo as variable AZURE_CREDENTIALS in the below format:
```json
{
  "clientId": "<service-principal-appId>",
  "clientSecret": "<service-principal-password>",
  "subscriptionId": "<subscription-id>",
  "tenantId": "<tenant-id>"
}
```

## Writing Yaml files(deployment and service) for frontend and backend microservices
1. Navigate to the frontend folder insde the k8s folder and write the deployment and service yaml files with below hints
   deployment.yaml
    a. create a kubernetes deployment manifest using apiversion: apps/v1 and se the application name as frontend
    b. confgure the deployment to run the 2 replicas of the frontend application
    c. use labels and selectors properly so that the deployment can identify pods with app: frontend
    d. Add one container named frontend, use the frontend image from Azure Container Registry, and expose container port 80
    e. Add basic CPU/memory requests, limits, liveness probe, and readiness probe to make the frontend pod production-ready.
    
    service.yaml
    a. Create a Kubernetes Service manifest using apiVersion: v1 and kind: Service.
    b. set the Service name as frontend and use the label app: frontend.
    c. Configure the selector so the Service can connect to pods with app: frontend.
    d. Expose the Service on port 80 and forward traffic to container targetPort: 80.
    e. Use type: LoadBalancer so the frontend application gets a public IP address.

2. For backend services below are the hints
    a. Create a Kubernetes Deployment for each backend service such as user-service, product-service, order-service, and payment-service.
    b. Use proper service names, labels, and selectors. The metadata.name, labels.app, selector.matchLabels.app, and pod labels.app should match the microservice name.
    c. Configure each Deployment with 2 replicas and use the correct Docker image from Azure Container Registry.
    d. Expose the correct container port for each service:
    ````text
    user-service: 8081
    product-service: 8082
    order-service: 8083
    payment-service: 8084
    ``
    e. Since backend services use Azure Workload Identity, include this label inside pod template metadata:

    ``` bash azure.workload.identity/use: "true" ```
    f. Also include the service account name inside pod spec because the services may need to access Azure resources like Key Vault:
    ```bash serviceAccountName: ecommerce-workload-identity-sa ```
    g. Add resource requests and limits for CPU and memory so the pods have controlled resource usage.
    h. Add liveness and readiness probes using the Spring Boot health endpoint: ```bash /actuator/health ```
    h. Create a separate Kubernetes Service for each backend microservice.
    i. Use type: ClusterIP for backend services because they should be accessible only inside the AKS cluster, not directly from the internet.

## writing GitHub Actions workflow files for frontend and backend microservices
