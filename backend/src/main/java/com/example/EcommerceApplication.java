package com.example;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.example.models.Role;
import com.example.models.Theme;
import com.example.models.OrderStatus;
import com.example.models.PaymentType;
import com.example.models.Person;
import com.example.models.ProductCategory;
import com.example.repository.PersonRepository;
import com.example.repository.ProductCategoryRepository;
import com.example.repository.RoleRepository;
import com.example.repository.ThemeRepository;
import com.example.repository.OrderStatusRepository;
import com.example.repository.PaymentTypeRepository;

@SpringBootApplication
public class EcommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner CommandLineRunnerBean(ProductCategoryRepository pcr, RoleRepository err, OrderStatusRepository tsr, PaymentTypeRepository ttr, PersonRepository er, ThemeRepository hr) {
		return (args) -> {
			
			if(pcr.count() < 1) {
				ProductCategory pc1 = new ProductCategory(1, "All");
				ProductCategory pc2 = new ProductCategory(2, "Deals");
				ProductCategory pc3 = new ProductCategory(3, "Sales");
				ProductCategory pc4 = new ProductCategory(4, "Featured");
				
				pcr.save(pc1);
				pcr.save(pc2);
				pcr.save(pc3);
				pcr.save(pc4);
			}
			
			if(err.count() < 1) {
				Role r1 = new Role(2, "CUSTOMER");
				Role r2 = new Role(1, "ADMIN");
				err.save(r1);
				err.save(r2);
			}
			
			if(tsr.count() < 1) {
				OrderStatus ts1 = new OrderStatus(1, "PENDING");
				OrderStatus ts2 = new OrderStatus(2, "ORDERDED");
				OrderStatus ts3 = new OrderStatus(3, "SHIPPED");
				OrderStatus ts4 = new OrderStatus(4, "DELIVERED");
				OrderStatus ts5 = new OrderStatus(5, "CANCELLED");
				
				tsr.save(ts1);
				tsr.save(ts2);
				tsr.save(ts3);
				tsr.save(ts4);
			}
			
			if(hr.count() < 1) {
				Theme hr1 = new Theme(1, "LIGHT");
				Theme hr2 = new Theme(2, "DARK");
				
				hr.save(hr1);
				hr.save(hr2);
				
			}
			
			if(ttr.count() < 1) {
				PaymentType tt1 = new PaymentType(1, "PAYPAL");
				PaymentType tt2 = new PaymentType(2, "DEBIT CARD");
				PaymentType tt3 = new PaymentType(3, "CREDIT CARD");
				PaymentType tt4 = new PaymentType(4, "CHECK");
				
				ttr.save(tt1);
				ttr.save(tt2);
				ttr.save(tt3);
				ttr.save(tt4);
			}
		
		};
	}

}
