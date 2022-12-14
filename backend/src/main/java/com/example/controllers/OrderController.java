package com.example.controllers;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.comparators.OrderListComparator;
import com.example.exceptions.EmailAlreadyExistsException;
import com.example.exceptions.InvalidCredentialsException;
import com.example.models.Notification;
import com.example.models.Order;
import com.example.models.Person;
import com.example.service.OrderService;
import com.example.service.PersonService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
@AllArgsConstructor(onConstructor=@__(@Autowired))
public class OrderController {
	
	private OrderService oService;
	
	@PostMapping("/addTocart")
	public Order addToCart(@RequestBody LinkedHashMap<String,String>body) {
		System.out.println(body.toString());
		return oService.addToCart(Integer.parseInt(body.get("person_id")), Integer.parseInt(body.get("product_id")), Integer.parseInt(body.get("status_id")),
				Integer.parseInt(body.get("payment_id")),Double.parseDouble(body.get("total_price"))
				,Integer.parseInt(body.get("total_items")));
	} 
	
	@GetMapping("/{customer_id}")
	public List<Order> getAllOrders(@PathVariable int customer_id){
		    
		    List<Order> orders = oService.getOrdersByPerson(customer_id);
		    //System.out.println("reach getallorders method orders are "+orders);
		    OrderListComparator orderListComparator = new OrderListComparator();
		    orders.sort(orderListComparator);
			return orders;
		}
	
	@PostMapping("/update/quantity")
	public void updateQuantity(@RequestBody LinkedHashMap<String,Integer>body) {
		oService.updateQuantity(body.get("order_id"),body.get("quantity"));
		Class<? extends LinkedHashMap> order = body.getClass();
		System.out.println(order);
	}
	
	@PostMapping("/update/payment")
	public void updatePaymentType(@RequestBody LinkedHashMap<String, Integer>body) {
		oService.updatePaymentType(body.get("customer_id"), body.get("type"));
		System.out.println(body.get("type"));
	}
	
	@DeleteMapping("/{order_id}")
	public void removeOrderById(@PathVariable int order_id) {
		oService.removeOrderById(order_id);
	}
	
	@DeleteMapping("/remove-all/{customer_id}")
	public void removeAllOrders(@PathVariable int customer_id) {
		oService.removeAllOrders(customer_id);
	}

	
}

