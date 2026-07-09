# ====================================
# Stage 1: Build the application
# ====================================
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml first so Docker can cache the dependency download step.
# Dependencies are only re-downloaded if pom.xml changes.
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Now copy source code and build the JAR
COPY src ./src
RUN mvn clean package -DskipTests

# ====================================
# Stage 2: Create a lightweight runtime image
# ====================================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy only the built JAR from Stage 1 (keeps the image small)
COPY --from=build /app/target/*.jar app.jar

# Expose the service port
EXPOSE 8081

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
