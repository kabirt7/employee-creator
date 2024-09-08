package io.nology.employee.creator.back_end.employee;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


import java.util.Optional;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.modelmapper.ModelMapper;

public class EmployeeServiceUnitTest {

    @Mock
    private EmployeeRepository repo;

    @Mock
    private ModelMapper mapper;

    @InjectMocks
    @Spy
    private EmployeeService employeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getAllData() {
        employeeService.getAllData();
        verify(repo).findAll();
    }

    @Test
    public void getEmployeeData() {
        Long employeeId = 1L;
        employeeService.getEmployeeData(employeeId);
        verify(repo).findById(employeeId);
    }

    @Test
    public void createData_success() {
        // given
        CreateEmployeeDTO mockDTO = new CreateEmployeeDTO();
        mockDTO.setFirstName("John");
        mockDTO.setLastName("Doe");
        mockDTO.setContractType(Employee.ContractType.PERMANENT);
        mockDTO.setWorkType(Employee.WorkType.FULL_TIME);
        Employee mockEmployee = new Employee();

        // when
        when(mapper.map(mockDTO, Employee.class)).thenReturn(mockEmployee);
        when(repo.save(any(Employee.class))).thenReturn(mockEmployee);

        // then
        Employee result = employeeService.createData(mockDTO);
        assertNotNull(result);
        assertEquals(mockEmployee, result);
        // verifies that save method is called
        verify(repo).save(mockEmployee);
    }

    @Test
    public void updateById_success() {
        // given
        Long employeeId = 1L;
        UpdateEmployeeDTO mockDTO = new UpdateEmployeeDTO();
        mockDTO.setFirstName("Updated Name");

        Employee existingEmployee = new Employee();
        existingEmployee.setFirstName("John");
        existingEmployee.setLastName("Doe");

        Employee updatedEmployee = new Employee();
        updatedEmployee.setFirstName("Updated Name");

        // when
        when(repo.findById(employeeId)).thenReturn(Optional.of(existingEmployee));
        when(repo.save(any(Employee.class))).thenReturn(updatedEmployee);

        //  then
        Optional<Employee> result = employeeService.updateById(mockDTO, employeeId);
        assertNotNull(result);
        assertEquals("Updated Name", result.get().getFirstName());
        verify(repo).save(existingEmployee);
    }

    @Test
    public void updateById_notFound() {
        // given
        Long employeeId = 1L;
        UpdateEmployeeDTO mockDTO = new UpdateEmployeeDTO();

        // when
        when(repo.findById(employeeId)).thenReturn(Optional.empty());

        // then
        Optional<Employee> result = employeeService.updateById(mockDTO, employeeId);
        assertEquals(Optional.empty(), result);
        verify(repo, never()).save(any());
    }

    @Test
    public void deleteEmployeeById_success() {
        //given
        Long employeeId = 1L;
        Employee mockEmployee = new Employee();

        // when
        when(repo.findById(employeeId)).thenReturn(Optional.of(mockEmployee));

        boolean result = employeeService.deleteEmployeeById(employeeId);

        // then
        verify(repo).delete(mockEmployee);
        assertEquals(true, result);
    }

    @Test
    public void deleteEmployeeById_notFound() {
        // given
        Long employeeId = 1L;

        // when
        when(repo.findById(employeeId)).thenReturn(Optional.empty());

        boolean result = employeeService.deleteEmployeeById(employeeId);

        // then
        verify(repo, never()).delete(any());
        assertEquals(false, result);
    }
}
