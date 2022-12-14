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
@Table(name="OrderStatus")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderStatus {
	
	@Id
	@Column(name="status_id")
	private Integer orderStatusId;
	
	@Column(unique = true, name="status")
	private String status;
	
	 
	 
	 
}
