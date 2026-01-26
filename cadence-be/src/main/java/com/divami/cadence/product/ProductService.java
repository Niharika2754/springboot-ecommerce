package com.divami.cadence.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.divami.cadence.common.exception.ResourceNotFoundException;
import com.divami.cadence.common.response.ApiResponse;
import com.divami.cadence.user.User;
import com.divami.cadence.user.dto.UserResponseDTO;

import java.io.IOException;
import java.util.*;

@Service
public class ProductService {

	
	@Autowired
	private ProductRepository repo;
	
	public List<Product> getAllProducts(){
		return repo.findAll();
		
	}
	

	public Product addProduct(Product product, MultipartFile image) {
	    try {
	        if (image != null && !image.isEmpty()) {
	            product.setImageName(image.getOriginalFilename());
	            product.setImageType(image.getContentType());
	            product.setImageData(image.getBytes());
	        }

	        return repo.save(product);

	    } catch (IOException e) {
	        throw new RuntimeException("Failed to store product image", e);
	    }
	}


 
    public Product getProductById(int id) {
        return repo.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Product not found with id: " + id)
                );
    }
  
	

}
