package com.example.ecommerce.service;

import com.example.ecommerce.dto.MemberDTO;
import com.example.ecommerce.entity.Member;
import com.example.ecommerce.mapper.MemberMapper;
import com.example.ecommerce.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ecommerce.controller.AuthController;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberMapper memberMapper;

    public MemberDTO register(AuthController.RegisterRequest request) {
        if (memberRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }

        Member member = Member.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role("USER")
                .companyName(request.getCompanyName())
                .email(request.getEmail())
                .businessNumber(request.getBusinessNumber())
                .businessAddress(request.getBusinessAddress())
                .yardAddress(request.getYardAddress())
                .build();

        Member savedMember = memberRepository.save(member);
        return memberMapper.map(savedMember); // toDTO -> map
    }

    public String findId(String phone) {
        return memberRepository.findByPhone(phone)
                .map(Member::getUsername)
                .orElseThrow(() -> new RuntimeException("해당 번호로 가입된 아이디가 없습니다."));
    }

    public String resetPassword(String username, String phone) {
        Member member = memberRepository.findByUsernameAndPhone(username, phone)
                .orElseThrow(() -> new RuntimeException("일치하는 회원 정보가 없습니다."));

        String tempPassword = generateRandomPassword();
        member.setPassword(passwordEncoder.encode(tempPassword));
        // Dirty Checking - transaction will save

        return tempPassword;
    }

    private String generateRandomPassword() {
        // 간단한 8자리 랜덤 비밀번호 생성 (영문+숫자)
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            int index = (int) (Math.random() * chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }
}