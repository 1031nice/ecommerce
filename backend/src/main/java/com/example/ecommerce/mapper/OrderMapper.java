package com.example.ecommerce.mapper;

import com.example.ecommerce.dto.OrderDTO;
import com.example.ecommerce.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

// MapStruct를 사용하는 경우 (build.gradle 확인 필요하지만, 일단 수동 Mapper라면 아래처럼, MapStruct라면 인터페이스로)
// 기존 코드를 보니 MemberMapper는 수동이었는데 OrderMapper는 못 봤습니다.
// 일단 파일이 있는지 확인해보고, 없으면 제가 만듭니다.
// 아까 컴파일 경고에서 "mapper/OrderMapper.java" 파일이 있는 걸 확인했습니다.
// 내용을 읽어보고 수정하겠습니다.
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {
    // MemberMapper, ProductMapper 주입 필요할 수 있음. 지금은 단순 변환만 구현
    
    public OrderDTO toDTO(Order order) {
        if (order == null) return null;
        
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setStatus(order.getStatus());
        dto.setQuantity(order.getQuantity());
        dto.setUnitPrice(order.getUnitPrice());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setDeliveryAddress(order.getDeliveryAddress());
        dto.setRecipientName(order.getRecipientName());
        dto.setRecipientPhone(order.getRecipientPhone());
        dto.setNotes(order.getNotes());
        dto.setRequestedDeliveryDate(order.getRequestedDeliveryDate());
        dto.setCreatedAt(order.getCreatedAt());
        // Product, Member는 Service에서 채워넣는 구조로 추정됨
        return dto;
    }

    public Order toEntity(OrderDTO dto) {
        if (dto == null) return null;

        return Order.builder()
                .id(dto.getId())
                .orderNumber(dto.getOrderNumber())
                .status(dto.getStatus())
                .quantity(dto.getQuantity())
                .unitPrice(dto.getUnitPrice())
                .totalPrice(dto.getTotalPrice())
                .deliveryAddress(dto.getDeliveryAddress())
                .recipientName(dto.getRecipientName())
                .recipientPhone(dto.getRecipientPhone())
                .notes(dto.getNotes())
                .requestedDeliveryDate(dto.getRequestedDeliveryDate())
                .build();
    }
}