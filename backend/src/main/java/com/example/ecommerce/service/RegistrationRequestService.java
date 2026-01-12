package com.example.ecommerce.service;

import com.example.ecommerce.dto.RegistrationRequestDTO;
import com.example.ecommerce.entity.RegistrationRequest;
import com.example.ecommerce.repository.RegistrationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RegistrationRequestService {

    private final RegistrationRequestRepository repository;

    @Transactional
    public void createRegistrationRequest(RegistrationRequestDTO dto) {
        RegistrationRequest request = RegistrationRequest.builder()
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .businessNumber(dto.getBusinessNumber())
                .businessLicenseImage(dto.getBusinessLicenseImage())
                .bankStatementImage(dto.getBankStatementImage())
                .bankName(dto.getBankName())
                .bankAccountNumber(dto.getBankAccountNumber())
                .notes(dto.getNotes())
                .status("PENDING") // 초기 상태
                .build();

        repository.save(request);
    }
}
