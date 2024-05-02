package io.nology.employee.creator.back_end.exceptions;

import java.util.ArrayList;
import java.util.HashMap;

public class ValidationErrors {
	
	private HashMap<String, ArrayList<String>>errors;
	
	public ValidationErrors() {
		this.errors = new HashMap<>();
	}
	
	public void addError(String field, String reason) {
		if(this.errors.containsKey(field)) {
			errors.get(field).add(reason);
		} else {
			ArrayList<String> newList = new ArrayList<>();
			newList.add(reason);
			errors.put(field, newList);
		}
	}
	
	public boolean isEmpty() {
		return this.errors.isEmpty();
	}
	
	public boolean hasErrors() {
		return !this.isEmpty();
	}
	
	public HashMap<String, ArrayList<String>> getErrors() {
		return errors;
	}

}
