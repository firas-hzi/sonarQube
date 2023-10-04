package com.example.validation;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.validation.ValidationUtils;
import com.example.models.Person;

public class PersonValidation implements Validator{

	@Override
	public boolean supports(Class<?> clazz) {
		
		return Person.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {

		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "name.empty", "peron object must contain a name field");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "email.empty", "peron object must contain an email field");
				
		Person person = (Person) target;
		
		if(person.getCustomerId() < 0) {
			errors.rejectValue("customer_id", "invalid.customerId", "users cannot have a negative id");
		}
		
		if(person.getPassword().length() < 8) {
			errors.rejectValue("password", "invalid.password", "users passwords must be at least 8 characters");
		}
		
	}

}

//Hello 
