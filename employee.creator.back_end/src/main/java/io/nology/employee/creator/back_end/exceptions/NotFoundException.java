package io.nology.employee.creator.back_end.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundException extends Exception {
	
	private static final long serialVersionUID = 1L;
	private static final HttpStatus statusCode = HttpStatus.NOT_FOUND;
	
	public static HttpStatus getStatusCode() {
		return statusCode;
	}
	
	public <T> NotFoundException(Long id) {
	    super(String.format("Could not find Employee with id %d", id));
	}
	
	public <T> NotFoundException() {
		super("Could not fetch employees");
	}

}
