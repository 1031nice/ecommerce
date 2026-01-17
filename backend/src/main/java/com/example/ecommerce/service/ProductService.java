package com.example.ecommerce.service;

import com.example.ecommerce.dto.ProductDTO;
import com.example.ecommerce.entity.Category;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.mapper.ProductMapper;
import com.example.ecommerce.repository.CategoryRepository;
import com.example.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        
        List<Category> categories = categoryRepository.findAll();
        Map<UUID, String> categoryMap = categories.stream()
                .collect(Collectors.toMap(Category::getId, Category::getName));

        return products.stream()
                .map(product -> productMapper.map(product, categoryMap.get(product.getCategoryId()))) // toDTO -> map
                .collect(Collectors.toList());
    }
    
    public List<ProductDTO> searchProducts(UUID categoryId, String grade, String itemName) {
        List<Product> products = productRepository.searchProducts(categoryId, grade, itemName);
        
        List<Category> categories = categoryRepository.findAll();
        Map<UUID, String> categoryMap = categories.stream()
                .collect(Collectors.toMap(Category::getId, Category::getName));
                
        return products.stream()
                .map(product -> productMapper.map(product, categoryMap.get(product.getCategoryId()))) // toDTO -> map
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        String categoryName = categoryRepository.findById(product.getCategoryId())
                .map(Category::getName)
                .orElse("Unknown");
                
        return productMapper.map(product, categoryName); // toDTO -> map
    }
}
