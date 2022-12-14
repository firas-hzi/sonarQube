package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.models.Order;
import com.example.models.PaymentType;
import com.example.models.Person;
import com.example.repository.OrderRepository;
import com.example.repository.OrderStatusRepository;
import com.example.repository.PaymentTypeRepository;
import com.example.repository.PersonRepository;
import com.example.repository.ProductRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor(onConstructor=@__(@Autowired))
public class PaymentService {
	
	private PaymentTypeRepository paymentTypeRepo;
	private OrderRepository orderRepo;
	private PersonRepository personRepo;

	public List<PaymentType> getAllPaymentTypes() {
		List<PaymentType> payments = paymentTypeRepo.findAll();
		return payments;
	}

	public void updatePaymentType(int payment_id) {
		PaymentType payment = paymentTypeRepo.findById(payment_id).get();
		payment.setType("DEBIT CARD");
		paymentTypeRepo.save(payment);
	}
}
