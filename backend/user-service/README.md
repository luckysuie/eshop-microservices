# User Service

Spring Boot microservice responsible for user registration, login, and profile management.

**Port:** `8081`

## REST API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/users/register` | Register a new user | Public |
| `POST` | `/api/users/login` | Login with email/password | Public |
| `GET` | `/api/users` | Get all users | Public |
| `GET` | `/api/users/{id}` | Get user by ID | Public |
| `PUT` | `/api/users/{id}` | Update user profile | Public |
| `DELETE` | `/api/users/{id}` | Delete user account | Public |
| `GET` | `/actuator/health` | Health check (for K8s) | Public |

## Example Requests

### Register
```bash
curl -X POST http://localhost:8081/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret123"}'
```

### Login
```bash
curl -X POST http://localhost:8081/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret123"}'
```

## Running Locally

### Prerequisites
- Java 17+
- Maven 3.9+
- Azure SQL Database (or local SQL Server)

### Environment Variables

Set these before running:

```bash
# Windows PowerShell
$env:DB_URL="jdbc:sqlserver://YOUR_SERVER.database.windows.net:1433;database=YOUR_DB;encrypt=true;trustServerCertificate=false"
$env:DB_USERNAME="your_username"
$env:DB_PASSWORD="your_password"
```

```bash
# macOS/Linux
export DB_URL="jdbc:sqlserver://YOUR_SERVER.database.windows.net:1433;database=YOUR_DB;encrypt=true"
export DB_USERNAME="your_username"
export DB_PASSWORD="your_password"
```

### Run
```bash
mvn spring-boot:run
```

Service starts at: http://localhost:8081

## Running with Docker

```bash
# Build image
docker build -t user-service .

# Run container
docker run -p 8081:8081 \
  -e DB_URL="jdbc:sqlserver://..." \
  -e DB_USERNAME="user" \
  -e DB_PASSWORD="pass" \
  user-service
```

## Azure SQL Connection String Format

```
jdbc:sqlserver://{server}.database.windows.net:1433;database={database};encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30
```

## Project Structure

```
user-service/
├── src/main/java/com/ecommerce/userservice/
│   ├── UserServiceApplication.java   # Entry point
│   ├── entity/
│   │   └── User.java                 # Database entity
│   ├── dto/
│   │   ├── UserDTO.java              # Response DTO (no password)
│   │   ├── CreateUserRequest.java    # Registration request
│   │   ├── LoginRequest.java         # Login request
│   │   └── LoginResponse.java        # Login response
│   ├── repository/
│   │   └── UserRepository.java       # Database queries
│   ├── service/
│   │   ├── UserService.java          # Interface
│   │   └── impl/UserServiceImpl.java # Business logic
│   ├── controller/
│   │   └── UserController.java       # REST endpoints
│   └── exception/
│       └── GlobalExceptionHandler.java
├── src/main/resources/
│   └── application.properties
├── Dockerfile
└── pom.xml
```
