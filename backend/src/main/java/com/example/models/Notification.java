package com.example.models;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

	@Entity
	@Table(name="Notification")
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public class Notification  {
		
		@Id
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		@Column(name="id")
		private Integer id;
		
        private String message;
		
		@ManyToOne(fetch=FetchType.LAZY)
		@JoinColumn(name="person_id")
		private Person person;
		
		@Column(name="modified_date")
		private LocalDateTime modifiedDate;
		
	}

