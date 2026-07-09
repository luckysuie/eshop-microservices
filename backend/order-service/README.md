# Order Service

Spring Boot microservice for managing orders in ShopEase.

**Port:** `8083`

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders` | Place a new order |
| `GET` | `/api/orders` | Get all orders (admin) |
| `GET` | `/api/orders/{id}` | Get order by ID |
| `GET` | `/api/orders/user/{userId}` | Get orders for a user |
| `PUT` | `/api/orders/{id}/status?status=CONFIRMED` | Update order status |
| `DELETE` | `/api/orders/{id}` | Delete an order |
| `GET` | `/actuator/health` | Health check |

## Order Status Flow

```
PENDING → CONFIRMED → SHIPPED → DELIVERED
                               ↘ CANCELLED
```

## Example Request

### Place an Order
```bash
curl -X POST http://localhost:8083/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "totalAmount": 1299.98,
    "items": [
      { "productId": 5, "quantity": 2, "price": 649.99 }
    ]
  }'
```

## Running Locally

```bash
# Set environment variables
$env:DB_URL="jdbc:sqlserver://YOUR_SERVER.database.windows.net:1433;database=YOUR_DB;encrypt=true"
$env:DB_USERNAME="your_username"
$env:DB_PASSWORD="your_password"

# Run
mvn spring-boot:run
```

## Running with Docker

```bash
docker build -t order-service .
docker run -p 8083:8083 \
  -e DB_URL="jdbc:sqlserver://..." \
  -e DB_USERNAME="user" \
  -e DB_PASSWORD="pass" \
  order-service
```
