package com.example.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Theme")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Theme {

	@Id
	@Column(name="theme_id")
	private Integer themeId;
	
	@Column(name= "name", unique=true)
	private String theme;
	
}
