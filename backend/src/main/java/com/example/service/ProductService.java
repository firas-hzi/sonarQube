package com.example.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.exceptions.NotAManagerException;
import com.example.models.Product;
import com.example.models.ProductCategory;
import com.example.models.Order;
import com.example.models.OrderStatus;
import com.example.models.PaymentType;
import com.example.models.Person;
import com.example.repository.PersonRepository;
import com.example.repository.ProductCategoryRepository;
import com.example.repository.ProductRepository;
import com.example.repository.OrderRepository;
import com.example.repository.OrderStatusRepository;
import com.example.repository.PaymentTypeRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor=@__(@Autowired))
public class ProductService {

	private ProductRepository tRepo;
	private OrderStatusRepository tsRepo;
	private PaymentTypeRepository ttRepo;
	private PersonRepository eRepo;
	private ProductCategoryRepository cRepo;
	private OrderRepository or;
	
	
	public List<Product> getProductsByCategory(int categoryId) {
		System.out.println("category "+categoryId);
		ProductCategory category = cRepo.findById(categoryId).get();
			return tRepo.findAllByCategory(category);
	}
	
	public List<Product> getAllProducts(){
		List<Product> e = tRepo.findAll();
		
		return e;
	}

	public Product addProduct(int id, String title, double price, int quantity, String description, int categoryId) {
		
		ProductCategory cat = cRepo.findById(categoryId).get();
		Product product = new Product(id, title, quantity, description, price, "", cat, LocalDateTime.now());
		System.out.println(product.toString());
		tRepo.save(product);
		return null;
	}
	
	public Product updateProduct(int id, String title, double price, String image, int quantity, String description, int categoryId) {
		Product p = tRepo.findById(id).get();
		System.out.println(p);
		p.setTitle(title);
		p.setPrice(price);
		p.setPrice(price);
		p.setImage(image);
		p.setQuantity(quantity);
		p.setDescription(description);
		ProductCategory category = cRepo.findById(categoryId).get();
		p.setCategory(category);
		//Add logic here to do the updating
		tRepo.save(p);
		return null;
	}
	
	
	public Product deleteProduct(int id) {
		Product p = tRepo.findById(id).get();
		tRepo.delete(p);
		return null;
	}
	
}
