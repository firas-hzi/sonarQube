package com.example.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.exceptions.EmailAlreadyExistsException;
import com.example.exceptions.InvalidCredentialsException;
import com.example.models.Notification;
import com.example.models.Order;
import com.example.models.OrderStatus;
import com.example.models.Address;
import com.example.models.PaymentType;
import com.example.models.Person;
import com.example.models.Product;
import com.example.models.Role;
import com.example.models.Theme;
import com.example.repository.AddressRepository;
import com.example.repository.OrderRepository;
import com.example.repository.OrderStatusRepository;
import com.example.repository.PaymentTypeRepository;
import com.example.repository.PersonRepository;
import com.example.repository.ProductRepository;
import com.example.repository.RoleRepository;
import com.example.repository.ThemeRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor(onConstructor=@__(@Autowired))
public class OrderService {
	
	private PersonRepository personRepo; 
	private ProductRepository productRepo;
	private OrderStatusRepository orderStatusRepo;
	private PaymentTypeRepository paymentTypeRepo;
	private OrderRepository orderRepo;
	private AddressRepository addressRepo;
	
	public Order addToCart(int person_id , int product_id , int status_id, int payment_id, double total_price
			, int total_items ) {
		
		Person person = personRepo.findById(person_id).get();
		Product product = productRepo.findById(product_id).get();
		//PAddress address = addressRepo.findById(0).get();
	    OrderStatus orderStatus = orderStatusRepo.findById(status_id).get();
		PaymentType paymentType = paymentTypeRepo.findById(payment_id).get();
		
		Order order = new Order(0, person, product, orderStatus, paymentType, total_price, total_items, LocalDateTime.now());
		return orderRepo.save(order);
		//Role role = roleRepo.findById(1).get();
		//Theme theme = themeRepo.findById(1).get();
	 //	Person person = new Person(0, name, email, password, "","", theme,role);
	}

	public List<Order> getOrdersByPerson(int customer_id) {
		Person person = personRepo.findById(customer_id).get();
		return orderRepo.findAllByPerson(person);
	}

	public void updateQuantity(Integer id, Integer quantity) {
		Order order = orderRepo.findById(id).get();
		order.setTotalItem(quantity);
		orderRepo.save(order);
	}
	
	public void updatePaymentType(int customer_id, int type) {
		Person person = personRepo.findById(customer_id).get();
		List<Order> orders = orderRepo.findAllByPerson(person);
		PaymentType payment = paymentTypeRepo.findById(type).get();
		for (int i=0; i< orders.size(); i++){
			orders.get(i).setPaymentType(payment);
			orderRepo.save(orders.get(i));
		}
	}
	
	public void removeOrderById(int id) {
		orderRepo.deleteById(id);
	}

	public void removeAllOrders(int customer_id) {
		Person person = personRepo.findById(customer_id).get();
		List<Order> orders = orderRepo.findAllByPerson(person);
		orderRepo.deleteAll(orders);
	}
}
