# Product Service

Spring Boot microservice for the ShopEase product catalog.

**Port:** `8082`

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/{id}` | Get product by ID |
| `GET` | `/api/products/search?name=laptop` | Search products by name |
| `GET` | `/api/products/category/{category}` | Get products by category |
| `POST` | `/api/products` | Create new product |
| `PUT` | `/api/products/{id}` | Update product |
| `DELETE` | `/api/products/{id}` | Delete product |
| `GET` | `/actuator/health` | Health check |

## Example Requests

### Create Product
```bash
curl -X POST http://localhost:8082/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Pro",
    "description": "High performance laptop",
    "price": 999.99,
    "stock": 50,
    "category": "Electronics"
  }'
```

### Get All Products
```bash
curl http://localhost:8082/api/products
```

### Search by Name
```bash
curl "http://localhost:8082/api/products/search?name=laptop"
```

## Running Locally

### Environment Variables

```bash
# Windows PowerShell
$env:DB_URL="jdbc:sqlserver://YOUR_SERVER.database.windows.net:1433;database=YOUR_DB;encrypt=true"
$env:DB_USERNAME="your_username"
$env:DB_PASSWORD="your_password"
```

### Run
```bash
mvn spring-boot:run
```

## Running with Docker

```bash
docker build -t product-service .
docker run -p 8082:8082 \
  -e DB_URL="jdbc:sqlserver://..." \
  -e DB_USERNAME="user" \
  -e DB_PASSWORD="pass" \
  product-service
```

## Project Structure

```
product-service/
├── src/main/java/com/ecommerce/productservice/
│   ├── ProductServiceApplication.java
│   ├── entity/Product.java
│   ├── dto/
│   │   ├── ProductDTO.java
│   │   └── CreateProductRequest.java
│   ├── repository/ProductRepository.java
│   ├── service/
│   │   ├── ProductService.java
│   │   └── impl/ProductServiceImpl.java
│   ├── controller/ProductController.java
│   └── exception/GlobalExceptionHandler.java
├── Dockerfile
└── pom.xml
```
