package io.nology.employee.creator.back_end.employee;

import java.util.List;
import java.util.Optional;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.employee.creator.back_end.exceptions.NotFoundException;
import io.nology.employee.creator.back_end.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
	
//	private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

@Autowired
EmployeeService service;


	@PostMapping
	public ResponseEntity<Employee> createEmployee(@Valid @RequestBody CreateEmployeeDTO data) throws ServiceValidationException {
		
		Employee employee = this.service.createData(data);
		
		return new ResponseEntity<>(employee, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Employee>> getAllEmployees() throws NotFoundException {
		List<Employee> allEmployeeData = this.service.getAllData();
		
		return new ResponseEntity<>(allEmployeeData, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Employee> getEmployee(@PathVariable Long id) throws NotFoundException {
		Optional<Employee> maybeEmployee = service.getEmployeeData(id);
		Employee employee = maybeEmployee.orElseThrow(() -> {
			return new NotFoundException(id);
		});
       return new ResponseEntity<>(employee, HttpStatus.OK);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Employee> updateEmployeeById(@Valid @RequestBody UpdateEmployeeDTO data, @PathVariable Long id) 
	throws NotFoundException {
		Optional<Employee> maybeEmployee = this.service.updateById(data, id);
		Employee updatedEmployee = maybeEmployee.orElseThrow(() -> new NotFoundException(id));
		return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Employee> deleteEmployee(@PathVariable Long id) throws NotFoundException {
		boolean deleted = this.service.deleteEmployeeById(id);
		if (!deleted) {
			throw new NotFoundException(id);
		}
		return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
	}
}
