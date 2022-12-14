package com.example.controllers;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exceptions.EmailAlreadyExistsException;
import com.example.exceptions.InvalidCredentialsException;
import com.example.models.Person;
import com.example.service.PersonService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/persons")
@CrossOrigin("*")
@AllArgsConstructor(onConstructor=@__(@Autowired))
public class PersonController {
	
	private PersonService eService;
	
	@PostMapping("/register")
	public Person register(@RequestBody LinkedHashMap<String, String> body) {
		System.out.println("fsfsfdsfsfffsffdfsdd   "+body.toString());
		return eService.register(body.get("name"), body.get("email"), body.get("password"));
	}
	@PostMapping("/forgotPassword")
	public Person forgotPassword(@RequestBody LinkedHashMap<String, String> body) {
		System.out.println("inside forgot password controller");
		return eService.forgotPassword(body.get("email"), body.get("old"), body.get("new"));
	}
	
	@PostMapping("/login")
	public Person login(@RequestBody LinkedHashMap<String, String> body) {
		
		String email = body.get("email");
		String password = body.get("password");
		
		return eService.login(email, password);
	}
	
	@ExceptionHandler({InvalidCredentialsException.class})
	public ResponseEntity<String> handleInvalid(){
		return new ResponseEntity<>("Invalid Credentials", HttpStatus.NOT_ACCEPTABLE);
	}
	
	@ExceptionHandler({EmailAlreadyExistsException.class})
	public ResponseEntity<String> handleExists(){
		return new ResponseEntity<>("Email already registered", HttpStatus.CONFLICT);
	}
	
	@PostMapping("/update/address")
	public void updateAddress(@RequestBody LinkedHashMap<String, String>body) {
		System.out.println(body);
		int zip = Integer.parseInt(body.get("zip"));
		int customer_id = Integer.parseInt(body.get("customer_id"));
		eService.updateAddress(customer_id, body.get("street"), body.get("city"), body.get("state"), zip);
	}
	
	@PutMapping("/update")
	public Person updatePerson(@RequestBody Person person) {
	System.out.println("inside contorller update profile "+person.getEmail());
		return eService.updatePerson(person);
		
		
	}
	
	
}

