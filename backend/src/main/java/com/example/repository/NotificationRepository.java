package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.Notification;
import com.example.models.Person;
import com.example.models.Product;
import com.example.models.ProductCategory;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
	
	List<Notification> findAllByPersonOrderByModifiedDateDesc(Person p);
	//List<Notification> findByPersonOrderByModifiedDateDesc(Person p);
}
