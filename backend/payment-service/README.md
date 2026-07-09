# Payment Service

Spring Boot microservice for processing payments in ShopEase.

**Port:** `8084`

> **Note:** This is a demo/simulation. No real money is transferred.
> For production, integrate with Stripe, Razorpay, or PayPal.

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/payments` | Process a payment |
| `GET` | `/api/payments` | Get all payments (admin) |
| `GET` | `/api/payments/{id}` | Get payment by ID |
| `GET` | `/api/payments/order/{orderId}` | Get payment for an order |
| `PUT` | `/api/payments/{id}/status?status=REFUNDED` | Update payment status |
| `GET` | `/actuator/health` | Health check |

## Payment Methods

| Method | Description |
|--------|-------------|
| `CREDIT_CARD` | Credit card payment |
| `DEBIT_CARD` | Debit card payment |
| `UPI` | UPI payment (India) |
| `NET_BANKING` | Net banking |

## Payment Status Flow

```
PENDING → COMPLETED (successful)
        → FAILED     (gateway declined)
COMPLETED → REFUNDED (order cancelled)
```

## Example Request

### Process Payment
```bash
curl -X POST http://localhost:8084/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": 1,
    "amount": 1299.98,
    "paymentMethod": "CREDIT_CARD"
  }'
```

### Response
```json
{
  "id": 1,
  "orderId": 1,
  "amount": 1299.98,
  "paymentMethod": "CREDIT_CARD",
  "status": "COMPLETED",
  "transactionId": "TXN-A1B2C3D4",
  "createdAt": "2024-01-15T10:30:00"
}
```

## Running Locally

```bash
$env:DB_URL="jdbc:sqlserver://YOUR_SERVER.database.windows.net:1433;database=YOUR_DB;encrypt=true"
$env:DB_USERNAME="your_username"
$env:DB_PASSWORD="your_password"
mvn spring-boot:run
```

## Running with Docker

```bash
docker build -t payment-service .
docker run -p 8084:8084 \
  -e DB_URL="jdbc:sqlserver://..." \
  -e DB_USERNAME="user" \
  -e DB_PASSWORD="pass" \
  payment-service
```
