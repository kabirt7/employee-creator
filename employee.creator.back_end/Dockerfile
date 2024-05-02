# Stage 1: Build the application
FROM maven:3.8.5-openjdk-17 as builder
WORKDIR /build
COPY pom.xml .
COPY src src
# Run Maven build (skip unit tests with -DskipTests)
RUN mvn clean package -DskipTests

# Stage 2: Setup the runtime container
FROM openjdk:17
WORKDIR /app
# Copy only the built JAR from the builder stage
COPY --from=builder /build/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]




# # WORKDIR /employee.creator.back_end
# COPY . .
# RUN mvn clean install

# CMD mvn spring-boot:run