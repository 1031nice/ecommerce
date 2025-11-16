"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  return (
    <div className="content" style={{ maxWidth: 480, margin: "0 auto" }}>
      <h1>회원가입</h1>
      <form
        className="panel form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          if (password !== confirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
          }
          alert("더미 회원가입 처리");
        }}
      >
        <label>
          이메일
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>
        <label>
          비밀번호 확인
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
          />
        </label>
        <div className="form-actions">
          <button className="btn primary" type="submit">가입하기</button>
        </div>
      </form>
      <div style={{ marginTop: 12 }}>
        이미 계정이 있으신가요? <Link className="btn" href="/login">로그인</Link>
      </div>
    </div>
  );
}

