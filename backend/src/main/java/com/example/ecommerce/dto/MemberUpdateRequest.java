package com.example.ecommerce.dto;

import lombok.Data;

@Data
public class MemberUpdateRequest {
    private String password;
    private String phone;
    private String companyName;
    private String email;
    private String businessNumber;
    private String businessAddress;
    private String yardAddress;
}
