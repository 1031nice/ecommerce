package com.example.ecommerce.mapper;

import com.example.ecommerce.dto.ProductDTO;
import com.example.ecommerce.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    // categoryName을 포함하는 매핑
    @Mapping(target = "categoryName", source = "categoryName")
    ProductDTO map(Product product, String categoryName);

    // 기본 매핑 (categoryName은 null 처리됨)
    ProductDTO map(Product product);

    // Entity로 변환 (categoryName은 Entity에 없으므로 무시됨)
    Product map(ProductDTO dto);
}
