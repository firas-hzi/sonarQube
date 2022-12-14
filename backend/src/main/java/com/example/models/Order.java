package com.example.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name="Orders")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Order {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="order_id")
	private Integer orderId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Person person;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    
    @ManyToOne
    @JoinColumn(name = "order_status_id")
    private OrderStatus orderStatus;
    
    @ManyToOne
    @JoinColumn(name = "payment_type_id")
    private PaymentType paymentType;
    
    private Double totalPrice;
    
    private Integer totalItem;
    
    private LocalDateTime registeredAt;
    
    public Order(Person person, Product product, OrderStatus orderStatus, PaymentType paymentType, Double totalPrice, Integer totalItem, LocalDateTime registeredAt) {
    	super();
    	this.orderId = orderId;
    	this.person = person;
    	this.product = product;
    	this.orderStatus = orderStatus;
    	this.paymentType = paymentType;
    	this.totalPrice = totalPrice;
    	this.totalItem = totalItem;
    	this.registeredAt = registeredAt;
    }
}