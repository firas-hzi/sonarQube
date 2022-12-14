package com.example.repository;

import java.util.List;
import java.util.Locale.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.models.Product;
import com.example.models.ProductCategory;
import com.example.models.OrderStatus;
import com.example.models.PaymentType;
import com.example.models.Person;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
	
	List<Product> findAllByCategory(ProductCategory s);
/*	List<Product> getProductsBySubmitterAndType(Person e, PaymentType t);
	List<Product> getProductsBySubmitterAndStatus(Person e, OrderStatus s);*/

}
