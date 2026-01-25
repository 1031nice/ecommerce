package com.example.ecommerce.service;

import com.example.ecommerce.dto.MemberDTO;
import com.example.ecommerce.dto.MemberUpdateRequest;
import com.example.ecommerce.entity.Member;
import com.example.ecommerce.mapper.MemberMapper;
import com.example.ecommerce.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberMapper memberMapper;

    @Transactional(readOnly = true)
    public MemberDTO getMyInfo(String username) {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        return memberMapper.map(member);
    }

    public MemberDTO updateMyInfo(String username, MemberUpdateRequest request) {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 비밀번호 변경 요청이 있을 경우에만 변경
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            member.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        // 정보 업데이트 (null이 아닌 경우에만 업데이트하거나, 전체 업데이트 정책에 따라 다름)
        // 여기서는 null이 아니거나 빈 문자열이 아닌 경우 업데이트하는 방식 등으로 유연하게 처리
        // 프론트엔드에서 값을 다 보내준다면 그냥 덮어씌워도 되지만, Patch 성격이 강하므로 null 체크

        if (request.getPhone() != null)
            member.setPhone(request.getPhone());
        if (request.getCompanyName() != null)
            member.setCompanyName(request.getCompanyName());
        // 이메일은 선택사항이라 null로 업데이트 하고 싶을 수도 있음.
        // 하지만 여기서는 입력된 값 위주로 업데이트.
        // 프론트엔드에서 빈 문자열을 보내면 빈 문자열로 저장됨.
        if (request.getEmail() != null)
            member.setEmail(request.getEmail());
        if (request.getBusinessNumber() != null)
            member.setBusinessNumber(request.getBusinessNumber());
        if (request.getBusinessAddress() != null)
            member.setBusinessAddress(request.getBusinessAddress());
        if (request.getYardAddress() != null)
            member.setYardAddress(request.getYardAddress());

        // Dirty Checking에 의해 트랜잭션 종료 시 update 쿼리 실행됨
        return memberMapper.map(member);
    }
}
