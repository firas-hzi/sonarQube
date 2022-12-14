package com.example.aspects;

import java.time.LocalDateTime;
import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.exceptions.InvalidCredentialsException;
import com.example.models.Notification;
import com.example.models.Person;
import com.example.models.Product;
import com.example.repository.NotificationRepository;
import com.example.repository.PersonRepository;
import com.example.repository.ProductRepository;

@Component
@Aspect
@Transactional
public class NotificationAspect {
	 NotificationRepository nr;
	 PersonRepository pr;
	 ProductRepository productRepo;
	 Notification notification = new Notification();
	 
	 @Autowired
	 public NotificationAspect(PersonRepository pr, NotificationRepository nr, ProductRepository productRepo)
	 {
		 this.productRepo= productRepo;
		 this.pr=pr;
		 this.nr=nr;
	 }
	
	@AfterReturning("execution(* com.example.service.PersonService.login(..))")
	public void NotifyWhenUserLogsIn(JoinPoint jp) {
		 notification = new Notification();
		 notification.setMessage("you logged in");
		 notification.setModifiedDate(LocalDateTime.now());
		 Person person = pr.findByEmail(jp.getArgs()[0].toString());
		 notification.setPerson(person);
		 nr.save(notification);
	}
	
	@AfterReturning("execution(* com.example.service.PersonService.register(..))")
	public void NotifyWhenUserRegister(JoinPoint jp) {
		 notification = new Notification();
		 notification.setMessage("you resitered");
		 notification.setModifiedDate(LocalDateTime.now());
		 Person person = pr.findByEmail(jp.getArgs()[0].toString());
		 notification.setPerson(person);
		 nr.save(notification);
		
	}
	
	@AfterReturning("execution(* com.example.service.OrderService.addToCart(..))")
	public void NotifyWhenUserAddToCart(JoinPoint jp) {
		System.out.println("inside aspect add to card");
		 notification = new Notification();
		Product product = productRepo.findById(Integer.parseInt( jp.getArgs()[1].toString())).get();
		 notification.setMessage("you added product "+ product.getTitle() + " to the cart");
		 notification.setModifiedDate(LocalDateTime.now());
		 Person person = pr.findById(Integer.parseInt(jp.getArgs()[0].toString())).get();
		 notification.setPerson(person);
		 nr.save(notification);
		
	}
	
	

}
