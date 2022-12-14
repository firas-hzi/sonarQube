package com.example.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.models.Notification;
import com.example.models.Person;
import com.example.repository.NotificationRepository;
import com.example.repository.PersonRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor(onConstructor=@__(@Autowired))
public class NotificationService {

	private PersonRepository pRepo;
	private NotificationRepository nRepo;
	
	public List<Notification> getNotificationsForCustomer(int cutomer_id) {
		System.out.println("category "+cutomer_id);
		Person person = pRepo.findById(cutomer_id).get();
			return nRepo.findAllByPersonOrderByModifiedDateDesc(person);
	}
}
