package com.example.ecommerce.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class OrderDTO {
    private UUID id;
    private String orderNumber;
    
    private ProductDTO product;
    private MemberDTO seller;
    private MemberDTO buyer;
    
    private String status;
    private Integer quantity;
    private BigDecimal unitPrice; // 추가
    private BigDecimal totalPrice;
    
    private String deliveryAddress;
    private String recipientName; // 추가
    private String recipientPhone; // 추가
    
    private String notes;
    private LocalDate requestedDeliveryDate; // 추가
    
    private LocalDateTime createdAt;
}