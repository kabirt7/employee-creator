FROM maven:3.8.5-openjdk-17 AS builder
WORKDIR /build
COPY employee.creator.back_end/pom.xml .
COPY employee.creator.back_end/src src
RUN mvn clean package -DskipTests


FROM openjdk:17
WORKDIR /app
COPY --from=builder /build/target/employee.creator.back_end-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
