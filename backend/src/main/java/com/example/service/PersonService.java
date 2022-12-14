package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.exceptions.EmailAlreadyExistsException;
import com.example.exceptions.InvalidCredentialsException;
import com.example.models.Order;
import com.example.models.Address;
import com.example.models.Person;
import com.example.models.Role;
import com.example.models.Theme;
import com.example.repository.AddressRepository;
import com.example.repository.OrderRepository;
import com.example.repository.PersonRepository;
import com.example.repository.RoleRepository;
import com.example.repository.ThemeRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor(onConstructor=@__(@Autowired))
public class PersonService {
	
	private PersonRepository personRepo; 
	private RoleRepository roleRepo;
	private ThemeRepository themeRepo;
	private OrderRepository orderRepo;
	private AddressRepository addressRepo;
	
	public Person register(String name, String email, String password) {
		Role role = roleRepo.findById(2).get();
		Theme theme = themeRepo.findById(1).get();
		Address address = null;
		Person person = new Person(0, name, email, password, "","", theme,role,address);
		
		try {
			Person result = personRepo.save(person);
			return result;
		} catch(Exception ex) {
			throw new EmailAlreadyExistsException();
		}
	}
	
	public Person login(String email, String password) {
		Person person = personRepo.findByEmail(email);
		
		if(!person.getPassword().equals(password)) {
			throw new InvalidCredentialsException();
		}
		return person;
	}
	
	public Person forgotPassword(String email, String oldPassword, String newPassword) {
		Person person = personRepo.findByEmail(email);
		if(person.getCustomerId()>0)
		{
			System.out.println("person service "+person.getCustomerId());
			if(person.getPassword().equals(oldPassword))
			{
				person.setPassword(newPassword);
				personRepo.save(person);
			}
		else {
			throw new InvalidCredentialsException();
		}	
		}else throw new InvalidCredentialsException();
		return person;
	}
	
	public void updateAddress(int customer_id, String street, String city, String state, int zip) {
		Person person = personRepo.findById(customer_id).get();
		Address address = new Address(1, street, city, state, zip);
		System.out.println("address id: " + address.getStreet());
		address.setAddressId(address.getAddressId());
		System.out.println("address id: " + address.getStreet());
		person.setAddress(address);
		addressRepo.save(address);
	}

	public Person updatePerson(Person person) {
		System.out.println("address id update"+person.getAddress().getAddressId());
		//addressRepo.save(person.getAddress());
	return	personRepo.save(person);
		
	}
}
