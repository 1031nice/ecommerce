"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<"email" | "verify" | "reset">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendCode = () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    // TODO: 비밀번호 재설정 인증 코드 발송 API 호출
    setCodeSent(true);
    setStep("verify");
    alert("인증 코드가 이메일로 발송되었습니다.");
  };

  const handleVerify = () => {
    if (!code) {
      alert("인증 코드를 입력해주세요.");
      return;
    }
    // TODO: 인증 코드 확인 API 호출
    setStep("reset");
    alert("인증이 완료되었습니다. 새 비밀번호를 설정해주세요.");
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (newPassword.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    // TODO: 비밀번호 재설정 API 호출
    alert("비밀번호가 재설정되었습니다.");
    window.location.href = "/login";
  };

  return (
    <div className="content" style={{ maxWidth: 480, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>비밀번호 재설정</h1>

      {step === "email" && (
        <div className="panel form-grid">
          <label>
            이메일(아이디)
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <button type="button" className="btn primary" onClick={handleSendCode}>
            인증 코드 발송
          </button>
        </div>
      )}

      {step === "verify" && (
        <div className="panel form-grid">
          <div style={{ marginBottom: 8, color: "var(--muted)", fontSize: "0.9375rem" }}>
            {email}로 인증 코드를 발송했습니다.
          </div>
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
          <button
            type="button"
            className="btn"
            onClick={() => {
              setStep("email");
              setCodeSent(false);
              setCode("");
            }}
          >
            이메일 다시 입력
          </button>
        </div>
      )}

      {step === "reset" && (
        <form className="panel form-grid" onSubmit={handleReset}>
          <label>
            새 비밀번호
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="8자 이상 입력"
              required
            />
          </label>
          <label>
            새 비밀번호 확인
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 다시 입력"
              required
            />
          </label>
          <div className="form-actions">
            <button type="button" className="btn" onClick={() => setStep("verify")}>
              이전
            </button>
            <button type="submit" className="btn primary">
              비밀번호 재설정
            </button>
          </div>
        </form>
      )}

      <div style={{ marginTop: 12, textAlign: "center" }}>
        <Link href="/login" className="btn">
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

