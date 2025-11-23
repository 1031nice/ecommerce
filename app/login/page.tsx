"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="content" style={{ maxWidth: 480, margin: "0 auto" }}>
      <h1>로그인</h1>
      <form
        className="panel form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          alert("더미 로그인 처리");
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
        <div className="form-actions">
          <button className="btn primary" type="submit">로그인</button>
        </div>
      </form>
      <div style={{ marginTop: 12, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/login/find-id" className="btn">
          아이디 찾기
        </Link>
        <Link href="/login/reset-password" className="btn">
          비밀번호 재설정
        </Link>
      </div>
      <div style={{ marginTop: 12, textAlign: "center" }}>
        계정이 없으신가요? <Link className="btn" href="/register">회원가입</Link>
      </div>
    </div>
  );
}

