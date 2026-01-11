package com.example.ecommerce.service;

import com.example.ecommerce.dto.ProductDTO;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.mapper.ProductMapper;
import com.example.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public List<ProductDTO> getAllProducts() {
        // 실제 쇼핑몰처럼 보이기 위한 가짜 상품 10개 생성
        List<ProductDTO> dummyProducts = new ArrayList<>();
        
        String[] titles = {
            "프리미엄 면 티셔츠", "세라믹 커피 머그", "무선 게이밍 마우스", 
            "기계식 키보드", "노이즈 캔슬링 헤드폰", "가죽 노트북 가방", 
            "미니멀리스트 손목시계", "스마트 텀블러", "휴대용 캠핑 의자", "데스크탑 스탠드"
        };
        
        String[] images = {
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
            "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500",
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
            "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
            "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=500",
            "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500",
            "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500"
        };

        long[] prices = {29000, 15000, 89000, 129000, 349000, 95000, 189000, 32000, 45000, 58000};

        for (int i = 0; i < titles.length; i++) {
            ProductDTO p = new ProductDTO();
            p.setId(UUID.randomUUID());
            p.setSlug("product-" + (i + 1));
            p.setTitle(titles[i]);
            p.setPrice(new BigDecimal(prices[i]));
            p.setThumbnailUrl(images[i]);
            dummyProducts.add(p);
        }
        
        return dummyProducts;
    }

    public ProductDTO getProductBySlug(String slug) {
        // Return a dummy product for any slug for now
        ProductDTO p = new ProductDTO();
        p.setId(UUID.randomUUID());
        p.setSlug(slug);
        p.setTitle("Dummy Product: " + slug);
        p.setPrice(new BigDecimal("9900"));
        return p;
    }
}
