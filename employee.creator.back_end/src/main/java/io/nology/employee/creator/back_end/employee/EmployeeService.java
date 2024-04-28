package io.nology.employee.creator.back_end.employee;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class EmployeeService {
	
	private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);
	
	@Autowired
	private EmployeeRepository repo;
	
	@Autowired 
	private ModelMapper mapper;
	
	public Employee createData(CreateEmployeeDTO data) {
		
		Employee newEmployee = mapper.map(data, Employee.class);
		
		return this.repo.save(newEmployee);
	}
	
	public List<Employee> getAllData() {
		return this.repo.findAll();
	}
	
	public Optional<Employee> getEmployeeData (Long id) {
		return this.repo.findById(id);
	}
	
	public Optional<Employee> updateById(@Valid UpdateEmployeeDTO data, Long id) {
		Optional<Employee> maybeEmployee = this.getEmployeeData(id);
		
		if (maybeEmployee.isEmpty()) {
			return maybeEmployee;
		}
		
		Employee foundEmployee = maybeEmployee.get();
		
		mapper.map(data, foundEmployee);
		
		Employee updatedEmployee = this.repo.save(foundEmployee);
		
		return Optional.of(updatedEmployee);
	}
	
	public boolean deleteEmployeeById (Long id) {
		Optional <Employee> maybeEmployee = this.getEmployeeData(id);
		if(maybeEmployee.isEmpty()) {
			return false;
		}
		
		this.repo.delete(maybeEmployee.get());
		
		return true;
	}

}