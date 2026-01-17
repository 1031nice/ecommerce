package com.example.ecommerce.mapper;

import com.example.ecommerce.dto.MemberDTO;
import com.example.ecommerce.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    MemberDTO map(Member member);
    Member map(MemberDTO dto);
}
