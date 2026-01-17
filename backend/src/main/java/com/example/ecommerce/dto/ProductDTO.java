package com.example.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private UUID id;
    private UUID categoryId;
    private String categoryName;
    
    private String name;
    private BigDecimal price;
    private Integer stockQuantity;
    private Integer minOrderQuantity; // 추가
    
    private String grade;
    private String itemName;
    private String spec;
    
    private List<String> imageUrls;
    private String thumbnailUrl;
    private String description;
    
    private Boolean isActive; // 추가
}