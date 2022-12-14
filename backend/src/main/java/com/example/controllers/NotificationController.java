package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Notification;
import com.example.service.NotificationService;

import lombok.AllArgsConstructor;

@RestController()
@RequestMapping("/notifications")
@CrossOrigin("*")
@AllArgsConstructor(onConstructor=@__(@Autowired))
public class NotificationController {
	
	NotificationService nService;
	
	
	@GetMapping("/{customer_id}")
	public List<Notification> getAllNotifications(@PathVariable int customer_id){
		    
			return nService.getNotificationsForCustomer(customer_id);
		}

}
