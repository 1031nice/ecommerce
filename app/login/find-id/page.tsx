"use client";

import Link from "next/link";
import { useState } from "react";

export default function FindIdPage() {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneDisplay, setPhoneDisplay] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [foundId, setFoundId] = useState("");

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    if (numbers.length <= 11) return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneDisplay(formatPhoneNumber(value));
    setPhone(value.replace(/[^\d]/g, ""));
  };

  const handleSendCode = () => {
    if (method === "email" && !email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (method === "phone" && phone.length < 10) {
      alert("전화번호를 올바르게 입력해주세요.");
      return;
    }
    // TODO: 인증 코드 발송 API 호출
    setCodeSent(true);
    alert(method === "email" ? "인증 코드가 이메일로 발송되었습니다." : "인증 코드가 SMS로 발송되었습니다.");
  };

  const handleVerify = () => {
    if (!code) {
      alert("인증 코드를 입력해주세요.");
      return;
    }
    // TODO: 인증 코드 확인 API 호출
    setVerified(true);
    // TODO: 실제 API에서 아이디 조회
    setFoundId("user@example.com");
    alert("인증이 완료되었습니다.");
  };

  return (
    <div className="content" style={{ maxWidth: 480, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>아이디 찾기</h1>

      {!verified ? (
        <div className="panel form-grid">
          <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="radio"
                name="method"
                checked={method === "email"}
                onChange={() => setMethod("email")}
                style={{ width: "18px", height: "18px", margin: 0, cursor: "pointer" }}
              />
              <span>이메일로 찾기</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="radio"
                name="method"
                checked={method === "phone"}
                onChange={() => setMethod("phone")}
                style={{ width: "18px", height: "18px", margin: 0, cursor: "pointer" }}
              />
              <span>전화번호로 찾기</span>
            </label>
          </div>

          {method === "email" ? (
            <label>
              이메일
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>
          ) : (
            <label>
              전화번호
              <input
                type="tel"
                value={phoneDisplay}
                onChange={handlePhoneChange}
                placeholder="010-1234-5678"
              />
            </label>
          )}

          {codeSent ? (
            <label>
              인증 코드
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="인증 코드 입력"
                  style={{ flex: 1 }}
                />
                <button type="button" className="btn primary" onClick={handleVerify}>
                  확인
                </button>
              </div>
            </label>
          ) : (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <button type="button" className="btn primary" onClick={handleSendCode}>
                인증 코드 발송
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="panel">
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ marginBottom: 16, fontSize: "1.125rem" }}>찾으신 아이디</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--brand)", marginBottom: 24 }}>
              {foundId}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Link href="/login" className="btn primary">
                로그인
              </Link>
              <Link href="/login/reset-password" className="btn">
                비밀번호 재설정
              </Link>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 12, textAlign: "center" }}>
        <Link href="/login" className="btn">
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

