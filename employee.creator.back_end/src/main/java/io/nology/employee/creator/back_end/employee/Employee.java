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
	private String lastName;
	
	@Column
	private String jobTitle;
	
	@Column 
	private String photoLink;
	
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
	private Integer hoursPerWeek;
	
	public enum ContractType {
		PERMANENT,
		CONTRACT
	}
	
	public enum WorkType {
		FULL_TIME,
		PART_TIME
	}

	public Long getId() {
		return id;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getPhotoLink() {
		return photoLink;
	}

	public String getEmail() {
		return email;
	}

	public Long getMobileNumber() {
		return mobileNumber;
	}

	public String getAddress() {
		return address;
	}

	public ContractType getContractType() {
		return contractType;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public WorkType getWorkType() {
		return workType;
	}

	public Integer getHoursPerWeek() {
		return hoursPerWeek;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setPhotoLink(String photoLink) {
		this.photoLink = photoLink;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setMobileNumber(Long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setContractType(ContractType contractType) {
		this.contractType = contractType;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public void setWorkType(WorkType workType) {
		this.workType = workType;
	}

	public void setHoursPerWeek(Integer hoursPerWeek) {
		this.hoursPerWeek = hoursPerWeek;
	}
	
	public String getJobTitle() {
		return jobTitle;
	}
	
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

    
}
