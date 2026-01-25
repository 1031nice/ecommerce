package com.example.ecommerce.controller;

import com.example.ecommerce.dto.MemberDTO;
import com.example.ecommerce.dto.MemberUpdateRequest;
import com.example.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<MemberDTO> getMyInfo(Principal principal) {
        return ResponseEntity.ok(userService.getMyInfo(principal.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<MemberDTO> updateMyInfo(Principal principal, @RequestBody MemberUpdateRequest request) {
        return ResponseEntity.ok(userService.updateMyInfo(principal.getName(), request));
    }
}
