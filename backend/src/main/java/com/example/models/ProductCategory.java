package com.example.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="ProductCategory")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductCategory {
	
	@Id
	@Column(name="category_id")
	private Integer productCategoryId;
	
	@Column(unique = true, name="name")
	private String category;

}