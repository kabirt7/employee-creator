package io.nology.employee.creator.back_end.employee;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column
	private String firstName;
	
	@Column
	private String middleName;
	
	@Column
	private String lastName;
	
	@Column
	private String email;
	
	@Column
	private Long mobileNumber;
	
	@Column
	private String address;
	
	@Enumerated(EnumType.STRING)
    @Column
    private ContractType contractType;
	
	@Column
    private LocalDate startDate;
	
	@Enumerated(EnumType.STRING)
	@Column
    private WorkType workType;
	
	@Column
	private byte hoursPerWeek;
	
	public enum ContractType {
		PERMANENT,
		CONTRACT
	}
	
	public enum WorkType {
		FULL_TIME,
		PART_TIME
	}
    
}
