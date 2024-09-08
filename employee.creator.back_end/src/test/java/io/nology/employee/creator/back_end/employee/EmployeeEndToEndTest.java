package io.nology.employee.creator.back_end.employee;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

import java.time.LocalDate;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class EmployeeEndToEndTest {
    @LocalServerPort
    private int port;

    @Autowired
    private EmployeeRepository employeeRepository;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
        employeeRepository.deleteAll();

        Employee employee1 = new Employee();
        employee1.setFirstName("John");
        employee1.setLastName("Doe");
        employee1.setJobTitle("Developer");
        employee1.setDepartment("Engineering");
        employee1.setEmail("john@doe.com");
        employee1.setPhotoLink("http://example.com/johndoe.jpg");
        employee1.setMobileNumber(1234567890L);
        employee1.setAddress("123 Blank Street");
        employee1.setContractType(Employee.ContractType.PERMANENT);
        employee1.setWorkType(Employee.WorkType.FULL_TIME);
        employee1.setStartDate(LocalDate.now());
        employee1.setHoursPerWeek(20);
        employeeRepository.save(employee1);

        Employee employee2 = new Employee();
        employee2.setFirstName("Jane");
        employee2.setLastName("Smith");
        employee2.setJobTitle("Developer");
        employee2.setDepartment("Software");
        employee2.setEmail("jane@smith.com");
        employee2.setPhotoLink("http://example.com/jane3.jpg");
        employee2.setMobileNumber(9876543210L);
        employee2.setAddress("987 Apple Street");
        employee2.setContractType(Employee.ContractType.CONTRACT);
        employee2.setWorkType(Employee.WorkType.PART_TIME);
        employee2.setStartDate(LocalDate.now());
        employee2.setHoursPerWeek(35);
        employeeRepository.save(employee2);
    }

    @Test
    public void getAllEmployees() {
        given()
                .when()
                .get("/employees")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("$", hasSize(2))
                .body("firstName", hasItems("John", "Jane"));
    }

    @Test
    public void createEmployee_success() {

        CreateEmployeeDTO data = new CreateEmployeeDTO();
        data.setFirstName("Peta");
        data.setLastName("Mellark");
        data.setJobTitle("Tribute");
        data.setDepartment("Desserts");
        data.setEmail("peta@mellark.com");
        data.setPhotoLink("http://example.com/photo3.jpg");
        data.setMobileNumber(443443434L);
        data.setAddress("12 Victors Drive");
        data.setContractType(Employee.ContractType.PERMANENT);
        data.setWorkType(Employee.WorkType.FULL_TIME);
        data.setStartDate(LocalDate.now());
        data.setHoursPerWeek(40);

        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/employees")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body("firstName", equalTo("Peta"))
                .body("lastName", equalTo("Mellark"))
                .body("id", notNullValue());

        given()
                .when()
                .get("/employees")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("$", hasSize(3))
                .body("firstName", hasItems("John", "Jane", "Peta"));
    }

    @Test
    public void createEmployee_emptyEmployee_failure() {
        CreateEmployeeDTO data = new CreateEmployeeDTO();
        data.setFirstName("");
        data.setLastName("");
        data.setJobTitle("");
        data.setDepartment("");
        data.setEmail("");
        data.setPhotoLink("");
        data.setMobileNumber(null);
        data.setAddress("");
        data.setContractType(null);
        data.setWorkType(null);
        data.setStartDate(null);
        data.setHoursPerWeek(null);

        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/employees")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createEmployee_nullEmployee_failure() {
        CreateEmployeeDTO data = new CreateEmployeeDTO();
        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/employees")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }
}
