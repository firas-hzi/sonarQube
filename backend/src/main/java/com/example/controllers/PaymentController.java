package com.example.controllers;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Order;
import com.example.models.PaymentType;
import com.example.service.OrderService;
import com.example.service.PaymentService;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/payments")
@CrossOrigin("*")
@AllArgsConstructor(onConstructor=@__(@Autowired))
public class PaymentController {
	
	private PaymentService pService;
	
	@GetMapping("/")
	public List<PaymentType> getAllPaymentTypes(){
		    
		List<PaymentType> payments = pService.getAllPaymentTypes();
		//System.out.println("reach getallorders method orders are "+orders);
		return payments;
	}
	
	@PostMapping("update/{payment_id}")
	public void updatePaymentType(@PathVariable int payment_id) {
		pService.updatePaymentType(payment_id);
	}
}
