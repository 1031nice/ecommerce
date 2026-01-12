package com.example.ecommerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationRequestDTO {
    @NotBlank(message = "아이디는 필수입니다.")
    @Pattern(regexp = "^[a-z0-9_-]{4,20}$", message = "아이디는 4~20자의 영문 소문자, 숫자, 특수문자(_, -)만 가능합니다.")
    private String username;

    @NotBlank(message = "비밀번호는 필수입니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,20}$", message = "비밀번호는 8~20자의 영문과 숫자를 조합해야 합니다.")
    private String password;

    private String email;
    private String phone;
    private String businessNumber;
    private String businessLicenseImage;
    private String bankStatementImage;
    private String bankName;
    private String bankAccountNumber;
    private String notes; // 주소 정보 등을 여기에 포함
}
