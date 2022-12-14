package com.example.models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="PaymentType")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentType {
	
	@Id
	@Column(name="payment_id")
	private Integer paymentTypeId;
	
	@Column(unique = true, name= "name")
	private String type;

}
