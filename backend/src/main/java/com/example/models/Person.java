package com.example.models;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Person")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Person {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="customer_id")
	private Integer customerId;

	private String name;
	
	@Column(unique = true)
	private String email;
	
	private String password;

	private String phone;
	
	private String image;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="theme_id")
	private Theme theme;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="role_id")
	private Role role;
	
	@OneToMany(mappedBy = "person")
	@JsonIgnore
	Set<Order> orders;
	
	@ManyToOne(fetch= FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="address_id")
	private Address address;

	public Person(Integer customerId, String name, String email, String password, String phone, String image,
			Theme theme, Role role, Address address) {
		super();
		this.customerId = customerId;
		this.name = name;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.image = image;
		this.theme = theme;
		this.role = role;
		this.address = address;
	}

	
	
}
