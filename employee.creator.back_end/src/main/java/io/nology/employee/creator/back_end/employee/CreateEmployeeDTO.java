package io.nology.employee.creator.back_end.employee;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.nology.employee.creator.back_end.employee.Employee.ContractType;
import io.nology.employee.creator.back_end.employee.Employee.WorkType;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateEmployeeDTO {
	
	@NotBlank
	private String firstName;
	
	@NotBlank
	private String lastName;
	
	@NotBlank
	private String jobTitle;
	
	@NotBlank
	private String department;
	
	@NotBlank
	private String email;

	@NotBlank
	private String photoLink;
	
	@NotNull
	private Long mobileNumber;
	
	@NotBlank
	private String address;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	@NotNull
	private ContractType contractType;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	@NotNull
	private WorkType workType;
	
	@NotNull
	private LocalDate startDate;
	
	@NotNull
	private Integer hoursPerWeek;

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getEmail() {
		return email;
	}

	public String getPhotoLink() {
		return photoLink;
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

	public WorkType getWorkType() {
		return workType;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public Integer getHoursPerWeek() {
		return hoursPerWeek;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPhotoLink(String photoLink) {
		this.photoLink = photoLink;
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

	public void setWorkType(WorkType workType) {
		this.workType = workType;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
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

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}
	
}
