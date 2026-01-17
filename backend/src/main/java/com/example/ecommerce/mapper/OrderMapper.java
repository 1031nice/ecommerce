package com.example.ecommerce.mapper;

import com.example.ecommerce.dto.OrderDTO;
import com.example.ecommerce.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    OrderDTO map(Order order);
    Order map(OrderDTO dto);
    
    // List 변환도 map으로 통일 (단방향만 존재하므로 오버로딩 충돌 없음)
    List<OrderDTO> map(List<Order> orders);
}
