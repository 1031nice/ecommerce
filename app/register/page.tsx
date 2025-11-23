"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    emailVerified: false,
    emailCode: "",
    password: "",
    confirmPassword: "",
    phone: "",
    phoneDisplay: "", // 표시용 (하이픈 포함)
    phoneVerified: false,
    phoneCode: "",
    bankStatement: null as File | null,
    businessLicense: null as File | null,
  });

  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, "");
    
    // 길이에 따라 포맷팅 (표시용)
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    if (numbers.length <= 11) return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    // 11자리 초과 시 11자리까지만
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === "phone") {
      // 전화번호: 표시용은 하이픈 포함, 저장용은 숫자만
      const numbers = value.replace(/[^\d]/g, "");
      setFormData((prev) => ({
        ...prev,
        phone: numbers, // 숫자만 저장
        phoneDisplay: formatPhoneNumber(value), // 하이픈 포함 표시
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSendEmailCode = () => {
    if (!formData.email) {
      alert("이메일을 먼저 입력해주세요.");
      return;
    }
    // TODO: 이메일 인증 코드 발송 API 호출
    setEmailCodeSent(true);
    alert("인증 코드가 이메일로 발송되었습니다.");
  };

  const handleVerifyEmail = () => {
    if (!formData.emailCode) {
      alert("인증 코드를 입력해주세요.");
      return;
    }
    // TODO: 이메일 인증 코드 확인 API 호출
    setFormData((prev) => ({ ...prev, emailVerified: true }));
    alert("이메일 인증이 완료되었습니다.");
  };

  const handleSendPhoneCode = () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert("전화번호를 올바르게 입력해주세요.");
      return;
    }
    // TODO: SMS 인증 코드 발송 API 호출
    setPhoneCodeSent(true);
    alert("인증 코드가 SMS로 발송되었습니다.");
  };

  const handleVerifyPhone = () => {
    if (!formData.phoneCode) {
      alert("인증 코드를 입력해주세요.");
      return;
    }
    // TODO: 휴대폰 인증 코드 확인 API 호출
    setFormData((prev) => ({ ...prev, phoneVerified: true }));
    alert("휴대폰 인증이 완료되었습니다.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.emailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    if (!formData.phoneVerified) {
      alert("휴대폰 인증을 완료해주세요.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (formData.phone.length < 10) {
      alert("전화번호를 올바르게 입력해주세요.");
      return;
    }
    // TODO: API 호출로 회원가입 처리 (운영자 승인 대기 상태)
    // formData.phone은 숫자만 포함된 값 (예: "01012345678")
    console.log("제출할 데이터:", {
      ...formData,
      phone: formData.phone, // 숫자만 저장된 값
    });
    alert("회원가입이 완료되었습니다. 운영자 승인 후 이용 가능합니다.");
  };

  return (
    <div className="content" style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>회원가입</h1>
      <form className="panel form-grid" onSubmit={handleSubmit}>
        <label>
          이메일(아이디) *
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              disabled={formData.emailVerified}
              style={{ flex: 1 }}
            />
            {!formData.emailVerified && (
              <button
                type="button"
                className="btn"
                onClick={handleSendEmailCode}
                style={{ flexShrink: 0 }}
              >
                {emailCodeSent ? "재발송" : "인증코드 발송"}
              </button>
            )}
          </div>
          {emailCodeSent && !formData.emailVerified && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <input
                  type="text"
                  name="emailCode"
                  value={formData.emailCode}
                  onChange={handleChange}
                  placeholder="인증 코드 입력"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className="btn primary"
                  onClick={handleVerifyEmail}
                  style={{ flexShrink: 0 }}
                >
                  인증하기
                </button>
              </div>
            </div>
          )}
          {formData.emailVerified && (
            <div style={{ marginTop: 8, color: "var(--accent)", fontSize: "0.9375rem" }}>
              ✓ 이메일 인증 완료
            </div>
          )}
        </label>

        <label>
          비밀번호 *
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </label>

        <label>
          비밀번호 확인 *
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </label>

        <label>
          전화번호 *
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <input
              type="tel"
              name="phone"
              value={formData.phoneDisplay}
              onChange={handleChange}
              required
              placeholder="010-1234-5678"
              disabled={formData.phoneVerified}
              style={{ flex: 1 }}
            />
            {!formData.phoneVerified && (
              <button
                type="button"
                className="btn"
                onClick={handleSendPhoneCode}
                style={{ flexShrink: 0 }}
              >
                {phoneCodeSent ? "재발송" : "인증코드 발송"}
              </button>
            )}
          </div>
          {phoneCodeSent && !formData.phoneVerified && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <input
                  type="text"
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleChange}
                  placeholder="인증 코드 입력"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className="btn primary"
                  onClick={handleVerifyPhone}
                  style={{ flexShrink: 0 }}
                >
                  인증하기
                </button>
              </div>
            </div>
          )}
          {formData.phoneVerified && (
            <div style={{ marginTop: 8, color: "var(--accent)", fontSize: "0.9375rem" }}>
              ✓ 휴대폰 인증 완료
            </div>
          )}
        </label>

        <label>
          통장사본 *
          <input
            type="file"
            name="bankStatement"
            accept="image/*"
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "#ffffff",
              fontSize: "1rem",
            }}
          />
          {formData.bankStatement && (
            <div style={{ marginTop: 8, color: "var(--muted)", fontSize: "0.9375rem" }}>
              선택된 파일: {formData.bankStatement.name}
            </div>
          )}
        </label>

        <label>
          사업자등록증 *
          <input
            type="file"
            name="businessLicense"
            accept="image/*"
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "#ffffff",
              fontSize: "1rem",
            }}
          />
          {formData.businessLicense && (
            <div style={{ marginTop: 8, color: "var(--muted)", fontSize: "0.9375rem" }}>
              선택된 파일: {formData.businessLicense.name}
            </div>
          )}
        </label>

        <div className="form-actions">
          <button type="button" className="btn" onClick={() => window.history.back()}>
            취소
          </button>
          <button className="btn primary" type="submit">
            가입하기
          </button>
        </div>
      </form>
      <div style={{ marginTop: 12, textAlign: "center" }}>
        이미 계정이 있으신가요? <Link className="btn" href="/login">로그인</Link>
      </div>
    </div>
  );
}

