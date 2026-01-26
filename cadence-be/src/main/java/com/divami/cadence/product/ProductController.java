package com.divami.cadence.product;
import java.util.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;



import com.divami.cadence.common.response.ApiResponse;


@RestController
@RequestMapping("/api")
public class ProductController {
	
	
	private ProductService service;
	
	public ProductController(ProductService service) {
		this.service = service;
	}
	
	@RequestMapping("/")
	public String greet() {
		return "Hello World";
	}
	
	@GetMapping("/products")
	public ResponseEntity<ApiResponse<List<Product>>> getAllProducts(){
		List<Product> Products = service.getAllProducts();
		return ResponseEntity.ok(
				ApiResponse.success(HttpStatus.OK,"Products successfully fetch", Products)
				);
		
	}
	
	@PostMapping("/product")
	public ResponseEntity<ApiResponse<Product>> addProduct(@RequestBody Product product) {
	    Product savedProduct = service.addProduct(product, null);

	    return ResponseEntity.ok(
	            ApiResponse.success(HttpStatus.CREATED, "product created successfully", savedProduct)
	    );
	}

	@PostMapping("/product/with-image")
	public ResponseEntity<ApiResponse<Product>> addProductWithImage(
	        @RequestPart Product product,
	        @RequestPart MultipartFile image
	) {
	    Product savedProduct = service.addProduct(product, image);

	    return ResponseEntity.ok(
	            ApiResponse.success(HttpStatus.CREATED, "product created successfully", savedProduct)
	    );
	}

	 
	 @GetMapping("/products/{id}")
	public  ResponseEntity<ApiResponse<Product>> getProduct(@PathVariable int id) {
		 Product ProductById = service.getProductById(id);
		 return ResponseEntity.ok(
			     ApiResponse.success(HttpStatus.OK, "Product successfully fetched", ProductById)
			    );
		
	}
	 
	@PutMapping("/products/{id}")
	public ResponseEntity<ApiResponse<Product>> updateProduct(
	        @PathVariable int id,
	        @RequestBody Product product
	) {
	    Product updatedProduct = service.updateProduct(id, product, null);
	    return ResponseEntity.ok(
	            ApiResponse.success(HttpStatus.OK, "Product updated successfully", updatedProduct)
	    );
	}

	@PutMapping("/products/{id}/with-image")
	public ResponseEntity<ApiResponse<Product>> updateProductWithImage(
	        @PathVariable int id,
	        @RequestPart Product product,
	        @RequestPart MultipartFile image
	) {
	    Product updatedProduct = service.updateProduct(id, product, image);
	    return ResponseEntity.ok(
	            ApiResponse.success(HttpStatus.OK, "Product updated successfully", updatedProduct)
	    );
	}

	@DeleteMapping("/products/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable int id) {
	    service.deleteProduct(id);
	    return ResponseEntity.ok(
	            ApiResponse.success(HttpStatus.OK, "Product deleted successfully", null)
	    );
	}
	 
	@GetMapping("/products/{id}/image")
	public ResponseEntity<byte[]> getProductImage(@PathVariable int id) {
	    Product product = service.getProductById(id);
	    
	    if (product.getImageData() == null) {
	        return ResponseEntity.notFound().build();
	    }

	    return ResponseEntity.ok()
	            .header(HttpHeaders.CONTENT_TYPE, product.getImageType())
	            .body(product.getImageData());
	}
}
