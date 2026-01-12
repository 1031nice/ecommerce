package com.example.ecommerce.controller;

import com.example.ecommerce.dto.RegistrationRequestDTO;
import com.example.ecommerce.service.RegistrationRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/register")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationRequestService service;

    @PostMapping
    public ResponseEntity<Void> register(@Valid @RequestBody RegistrationRequestDTO dto) {
        service.createRegistrationRequest(dto);
        return ResponseEntity.ok().build();
    }
}
