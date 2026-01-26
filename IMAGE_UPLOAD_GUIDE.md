# Image Upload & Retrieval Guide

## Table of Contents
1. [Overview](#overview)
2. [Backend Implementation](#backend-implementation)
3. [Frontend Implementation](#frontend-implementation)
4. [Data Flow](#data-flow)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Overview

This application implements a complete image upload and retrieval system for product images. Images are stored directly in the MySQL database as binary data (BLOB), allowing for simple management without needing external file storage.

### Key Features
- ✅ Store images in database as binary data
- ✅ Support for multipart/form-data uploads
- ✅ Automatic image retrieval with proper content types
- ✅ Fallback for products without images
- ✅ Both JSON-only and multipart endpoints

---

## Backend Implementation

### 1. Database Schema

The `Product` entity includes three fields for image storage:

```java
@Entity
@Table(name = "product")
public class Product {
    // ... other fields ...
    
    @Column(name = "image_name")
    private String imageName;      // Original filename (e.g., "product.jpg")

    @Column(name = "image_type")
    private String imageType;      // MIME type (e.g., "image/jpeg")

    @Lob
    @Column(name = "image_data")
    private byte[] imageData;      // Binary image data
}
```

**SQL Schema:**
```sql
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    brand VARCHAR(255),
    price DECIMAL(10, 2),
    category VARCHAR(100),
    release_date DATE,
    available BOOLEAN,
    quality INT,
    image_name VARCHAR(255),
    image_type VARCHAR(100),
    image_data LONGBLOB        -- Stores binary image data
);
```

### 2. Service Layer

**ProductService.java** - Handles image processing:

```java
public Product addProduct(Product product, MultipartFile image) {
    try {
        if (image != null && !image.isEmpty()) {
            // Extract image metadata
            product.setImageName(image.getOriginalFilename());
            product.setImageType(image.getContentType());
            
            // Convert image to byte array
            product.setImageData(image.getBytes());
        }

        // Save to database
        return repo.save(product);

    } catch (IOException e) {
        throw new RuntimeException("Failed to store product image", e);
    }
}
```

**How it works:**
1. Check if image file exists
2. Extract original filename → `image_name`
3. Get MIME type → `image_type` (e.g., "image/jpeg", "image/png")
4. Convert file to byte array → `image_data`
5. Save entire product entity to database

### 3. Controller Layer

**ProductController.java** - Provides two endpoints:

#### Endpoint 1: Create Product WITHOUT Image
```java
@PostMapping("/product")
public ResponseEntity<ApiResponse<Product>> addProduct(@RequestBody Product product) {
    Product savedProduct = service.addProduct(product, null);
    return ResponseEntity.ok(
        ApiResponse.success(HttpStatus.CREATED, "product created successfully", savedProduct)
    );
}
```

**Request:**
```http
POST /api/product
Content-Type: application/json

{
  "name": "Laptop",
  "brand": "Dell",
  "desc": "Gaming laptop",
  "price": 1200.00,
  "category": "Electronics",
  "releaseDate": "2024-01-15",
  "available": true,
  "quality": 95
}
```

#### Endpoint 2: Create Product WITH Image
```java
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
```

**Request:**
```http
POST /api/product/with-image
Content-Type: multipart/form-data

--boundary
Content-Disposition: form-data; name="product"
Content-Type: application/json

{
  "name": "Laptop",
  "brand": "Dell",
  "desc": "Gaming laptop",
  "price": 1200.00,
  "category": "Electronics",
  "releaseDate": "2024-01-15",
  "available": true,
  "quality": 95
}

--boundary
Content-Disposition: form-data; name="image"; filename="laptop.jpg"
Content-Type: image/jpeg

[BINARY IMAGE DATA]
--boundary--
```

#### Endpoint 3: Retrieve Product Image
```java
@GetMapping("/products/{id}/image")
public ResponseEntity<byte[]> getProductImage(@PathVariable int id) {
    Product product = service.getProductById(id);
    
    if (product.getImageData() == null) {
        return ResponseEntity.notFound().build();  // 404 if no image
    }

    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_TYPE, product.getImageType())
        .body(product.getImageData());
}
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: image/jpeg
Content-Length: 45231

[BINARY IMAGE DATA]
```

---

## Frontend Implementation

### 1. Add Product Form

**AddProduct/index.tsx** - Form submission logic:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.image) {
        // === WITH IMAGE ===
        const formDataToSend = new FormData();
        
        // Create product JSON
        const productData = {
            name: formData.name,
            brand: formData.brand,
            desc: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            releaseDate: formData.releaseDate,
            available: formData.available,
            quality: 95
        };

        // Append as JSON blob
        formDataToSend.append('product', new Blob([JSON.stringify(productData)], {
            type: 'application/json'
        }));
        
        // Append image file
        formDataToSend.append('image', formData.image);
        
        // Send multipart request
        const response = await fetch('/api/product/with-image', {
            method: 'POST',
            body: formDataToSend,  // NO headers - browser sets automatically
        });
    } else {
        // === WITHOUT IMAGE ===
        const productData = { /* ... */ };
        
        const response = await fetch('/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
    }
};
```

**File input:**
```tsx
<input
    type="file"
    name="image"
    accept="image/*"
    onChange={(e) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, image: file }));
    }}
/>
```

### 2. Display Images

**ProductCard/index.tsx** - Display product images:

```tsx
const ProductCard = ({ product }: ProductCardProps) => {
    const [imageError, setImageError] = useState(false);
    const imageUrl = `/api/products/${product.id}/image`;

    return (
        <div className="product-card">
            <div className="product-card__image">
                {!imageError ? (
                    <img 
                        src={imageUrl} 
                        alt={product.name}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="product-card__placeholder">
                        📷 No Image
                    </div>
                )}
            </div>
            {/* ... product details ... */}
        </div>
    );
};
```

### 3. Vite Proxy Configuration

**vite.config.ts** - Proxy API requests to backend:

```typescript
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',  // Backend server
                changeOrigin: true,
                secure: false,
            }
        }
    }
})
```

**How it works:**
- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:8080`
- Request to `/api/products/5/image` → proxied to `http://localhost:8080/api/products/5/image`

---

## Data Flow

### Upload Flow

```mermaid
┌─────────────┐
│   Browser   │
│  (React)    │
└──────┬──────┘
       │ 1. User selects image file
       │ 2. Form submission
       ▼
┌─────────────────────┐
│  FormData Object    │
│  - product: JSON    │
│  - image: File      │
└──────┬──────────────┘
       │ 3. POST /api/product/with-image
       ▼
┌─────────────────────┐
│  Vite Dev Server    │
│  (Port 5173)        │
└──────┬──────────────┘
       │ 4. Proxy to backend
       ▼
┌─────────────────────┐
│  Spring Boot        │
│  (Port 8080)        │
└──────┬──────────────┘
       │ 5. @RequestPart extracts data
       ▼
┌─────────────────────┐
│  ProductController  │
│  - product: Product │
│  - image: File      │
└──────┬──────────────┘
       │ 6. Call service
       ▼
┌─────────────────────┐
│  ProductService     │
│  - Extract metadata │
│  - Convert to bytes │
└──────┬──────────────┘
       │ 7. Save to DB
       ▼
┌─────────────────────┐
│  MySQL Database     │
│  LONGBLOB storage   │
└─────────────────────┘
```

### Retrieval Flow

```mermaid
┌─────────────┐
│   Browser   │
│  <img src=  │
│  "/api/     │
│  products/  │
│  5/image">  │
└──────┬──────┘
       │ 1. GET /api/products/5/image
       ▼
┌─────────────────────┐
│  Vite Proxy         │
└──────┬──────────────┘
       │ 2. Forward to backend
       ▼
┌─────────────────────┐
│  ProductController  │
│  getProductImage()  │
└──────┬──────────────┘
       │ 3. Fetch from DB
       ▼
┌─────────────────────┐
│  ProductService     │
│  getProductById()   │
└──────┬──────────────┘
       │ 4. Query database
       ▼
┌─────────────────────┐
│  MySQL Database     │
│  SELECT image_data  │
└──────┬──────────────┘
       │ 5. Return binary data
       ▼
┌─────────────────────┐
│  ProductController  │
│  - Set Content-Type │
│  - Return bytes     │
└──────┬──────────────┘
       │ 6. HTTP Response
       │    Content-Type: image/jpeg
       │    Body: [binary data]
       ▼
┌─────────────────────┐
│   Browser           │
│   Renders image     │
└─────────────────────┘
```

---

## API Endpoints

### Summary Table

| Method | Endpoint | Purpose | Request Type | Response |
|--------|----------|---------|--------------|----------|
| POST | `/api/product` | Create product without image | JSON | Product object |
| POST | `/api/product/with-image` | Create product with image | Multipart | Product object |
| GET | `/api/products` | Get all products | - | Product array |
| GET | `/api/products/{id}` | Get single product | - | Product object |
| GET | `/api/products/{id}/image` | Get product image | - | Binary image |
| PUT | `/api/products/{id}` | Update product without image | JSON | Product object |
| PUT | `/api/products/{id}/with-image` | Update product with image | Multipart | Product object |
| DELETE | `/api/products/{id}` | Delete product | - | Success message |

### Update Product Operations

#### Update Product WITHOUT Image
```java
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
```

**Request:**
```http
PUT /api/products/6
Content-Type: application/json

{
  "name": "Updated Laptop",
  "brand": "Dell",
  "desc": "Updated gaming laptop",
  "price": 1300.00,
  "category": "Electronics",
  "releaseDate": "2024-01-15",
  "available": true,
  "quality": 98
}
```

#### Update Product WITH Image
```java
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
```

**Request:**
```http
PUT /api/products/6/with-image
Content-Type: multipart/form-data

--boundary
Content-Disposition: form-data; name="product"
Content-Type: application/json

{
  "name": "Updated Laptop",
  "brand": "Dell",
  "desc": "Updated gaming laptop",
  "price": 1300.00,
  "category": "Electronics",
  "releaseDate": "2024-01-15",
  "available": true,
  "quality": 98
}

--boundary
Content-Disposition: form-data; name="image"; filename="new-laptop.jpg"
Content-Type: image/jpeg

[BINARY IMAGE DATA]
--boundary--
```

#### Delete Product
```java
@DeleteMapping("/products/{id}")
public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable int id) {
    service.deleteProduct(id);
    return ResponseEntity.ok(
        ApiResponse.success(HttpStatus.OK, "Product deleted successfully", null)
    );
}
```

**Request:**
```http
DELETE /api/products/6
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Product deleted successfully",
  "data": null
}
```

### Frontend Update Implementation

**EditProduct Page - Update without image:**
```tsx
const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
});
```

**EditProduct Page - Update with image:**
```tsx
const formDataToSend = new FormData();
formDataToSend.append('product', new Blob([JSON.stringify(productData)], {
    type: 'application/json'
}));
formDataToSend.append('image', imageFile);

const response = await fetch(`/api/products/${id}/with-image`, {
    method: 'PUT',
    body: formDataToSend,
});
```

**Delete Product:**
```tsx
const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
});
```

---

## Testing

### Manual Testing Steps

#### 1. Test Upload with Image

1. Start backend: `cd cadence-be && mvn spring-boot:run`
2. Start frontend: `cd cadence-fe && npm run dev`
3. Navigate to `http://localhost:5173/add-product`
4. Fill form and select an image file
5. Submit form
6. Check database:
```sql
SELECT id, name, image_name, image_type, LENGTH(image_data) as size_bytes
FROM product;
```

#### 2. Test Image Retrieval

1. Navigate to `http://localhost:5173/`
2. Product cards should show images
3. Open browser DevTools → Network tab
4. Look for requests to `/api/products/{id}/image`
5. Response should be `200 OK` with `Content-Type: image/jpeg`

#### 3. Test Without Image

1. Go to add product form
2. Fill form WITHOUT selecting image
3. Submit form
4. Product should be created with `image_data = NULL`
5. Frontend should show placeholder icon

#### 4. Test Update Product

1. Navigate to edit product page
2. Update product details and submit
3. Check database for updated values
4. Test with and without image

#### 5. Test Delete Product

1. Navigate to product list
2. Delete a product
3. Check database - product should be removed
4. Verify frontend updates (e.g., product no longer listed)

---

## Troubleshooting

### Common Issues

#### 1. 404 Error on Image Request

**Problem:**
```
GET /api/products/5/image → 404 Not Found
```

**Solution:**
- Check backend endpoint path: Should be `/products/{id}/image` not `/product/{id}/image`
- Verify Vite proxy is running
- Check backend logs for routing errors

#### 2. 500 Error on Upload

**Problem:**
```
POST /api/product/with-image → 500 Internal Server Error
```

**Solutions:**
- Check backend logs for exception details
- Verify MySQL `image_data` column is `LONGBLOB`
- Ensure multipart configuration is correct
- Check file size limits

#### 3. Image Not Displaying

**Problem:**
Image placeholder shows instead of actual image

**Solutions:**
- Open browser DevTools → Console
- Check for CORS errors
- Verify image URL: `/api/products/5/image` (note: `products` plural)
- Check Network tab response headers
- Ensure `Content-Type` header is set correctly

#### 4. Broken Image Icon

**Problem:**
Browser shows broken image icon

**Solutions:**
```javascript
// Check if image exists in database
SELECT image_data FROM product WHERE id = 5;

// If NULL, upload failed
// If has data, check Content-Type header in response
```

#### 5. CORS Errors

**Problem:**
```
Access to fetch at 'http://localhost:8080/api/...' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
Verify `CorsConfig.java`:
```java
config.setAllowedOrigins(List.of("http://localhost:5173"));
config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
```

---

## Best Practices

### 1. File Size Limits

Add validation for file sizes:

```java
@PostMapping("/product/with-image")
public ResponseEntity<ApiResponse<Product>> addProductWithImage(
    @RequestPart Product product,
    @RequestPart MultipartFile image
) {
    // Limit to 5MB
    if (image.getSize() > 5 * 1024 * 1024) {
        throw new IllegalArgumentException("File size exceeds 5MB limit");
    }
    // ... rest of code
}
```

### 2. Allowed File Types

```java
private static final List<String> ALLOWED_TYPES = List.of(
    "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"
);

if (!ALLOWED_TYPES.contains(image.getContentType())) {
    throw new IllegalArgumentException("Invalid file type");
}
```

### 3. Image Optimization

Consider adding image compression before storing:

```java
// Use libraries like Thumbnailator
Thumbnails.of(image.getInputStream())
    .size(800, 800)
    .outputQuality(0.8)
    .toOutputStream(outputStream);
```

### 4. Error Handling in Frontend

```tsx
const [imageError, setImageError] = useState(false);

<img 
    src={imageUrl} 
    alt={product.name}
    onError={() => {
        console.error(`Failed to load image for product ${product.id}`);
        setImageError(true);
    }}
/>
```

---

## Database Queries

### Check Image Storage

```sql
-- See all products with images
SELECT 
    id, 
    name, 
    image_name, 
    image_type,
    LENGTH(image_data) as size_bytes,
    ROUND(LENGTH(image_data)/1024/1024, 2) as size_mb
FROM product
WHERE image_data IS NOT NULL;
```

### Clear Images

```sql
-- Remove image from product
UPDATE product 
SET image_name = NULL, 
    image_type = NULL, 
    image_data = NULL
WHERE id = 5;
```

---

## Performance Considerations

### 1. Database Storage
- **Pros:** Simple, no file system management
- **Cons:** Increases database size, slower for large files

### 2. Alternative: File System Storage
For production, consider storing images on disk or cloud storage (S3, Cloudinary):

```java
// Save to disk
String filename = UUID.randomUUID() + ".jpg";
Path path = Paths.get("uploads/" + filename);
Files.write(path, image.getBytes());
product.setImageUrl("/uploads/" + filename);
```

### 3. CDN Integration
For high traffic, use a CDN to serve images faster.

---

## Summary

✅ **Backend:** Spring Boot handles multipart uploads, stores binary data in MySQL  
✅ **Frontend:** React sends FormData, displays images via `<img>` tags  
✅ **Proxy:** Vite proxies `/api` requests to backend  
✅ **Storage:** Images stored as LONGBLOB in database  
✅ **Retrieval:** Direct binary response with proper Content-Type  

This architecture provides a simple, working solution for image management in a full-stack application.
