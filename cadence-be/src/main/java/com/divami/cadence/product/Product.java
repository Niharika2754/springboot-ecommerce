package com.divami.cadence.product;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
@Table(name = "product")
public class Product {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    

    @Column(name = "description", columnDefinition = "TEXT")
    private String desc;
    
    private String brand;
    
    private BigDecimal price;
    
    private String category;
    
    @Column(name = "release_date")
    @Temporal(TemporalType.DATE)
    private Date releaseDate;
    
    private boolean available;
    
    
    @Column(name = "quality")
    private int quality;
    
    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image_type")
    private String imageType;

    @Lob
    @Column(name = "image_data")
    private byte[] imageData;

    //REQUIRED: No-args constructor
    public Product() {
    }

    //Proper all-args constructor (matches fields)
    public Product(
            int id,
            String name,
            String desc,
            String brand,
            BigDecimal price,
            String category,
            Date releaseDate,
            boolean available,
            int quality
    ) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.brand = brand;
        this.price = price;
        this.category = category;
        this.releaseDate = releaseDate;
        this.available = available;
        this.quality = quality;
    }

    // getters
    public int getId() { return id; }
    public String getName() { return name; }
    public String getDesc() { return desc; }
    public String getBrand() { return brand; }
    public BigDecimal getPrice() { return price; }
    public String getCategory() { return category; }
    public Date getReleaseDate() { return releaseDate; }
    public boolean isAvailable() { return available; }
    public int getQuality() { return quality; }

    // setters
    public void setId(int id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDesc(String desc) { this.desc = desc; }
    public void setBrand(String brand) { this.brand = brand; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setCategory(String category) { this.category = category; }
    public void setReleaseDate(Date releaseDate) { this.releaseDate = releaseDate; }
    public void setAvailable(boolean available) { this.available = available; }
    public void setQuality(int quality) { this.quality = quality; }
    
    
    public String getImageName() { return imageName; }
    public void setImageName(String imageName) { this.imageName = imageName; }

    public String getImageType() { return imageType; }
    public void setImageType(String imageType) { this.imageType = imageType; }

    public byte[] getImageData() { return imageData; }
    public void setImageData(byte[] imageData) { this.imageData = imageData; }

}
