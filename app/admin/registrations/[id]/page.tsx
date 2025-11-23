"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getRegistrationRequestById } from "@lib/data";
import { RegistrationStatus } from "@lib/types";

interface PageProps {
  params: { id: string };
}

export default function RegistrationDetailPage({ params }: PageProps) {
  const router = useRouter();
  const request = useMemo(() => getRegistrationRequestById(params.id), [params.id]);

  const formatPhoneNumber = (phone: string) => {
    const numbers = phone.replace(/[^\d]/g, "");
    if (numbers.length === 11) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    }
    return phone;
  };

  const formatBusinessNumber = (businessNumber: string) => {
    const numbers = businessNumber.replace(/[^\d]/g, "");
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 5) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 10)}`;
    }
  };

  const [formData, setFormData] = useState({
    businessNumber: request?.businessNumber || "",
    bankName: request?.bankName || "",
    bankAccountNumber: request?.bankAccountNumber || "",
    notes: request?.notes || "",
  });

  if (!request) {
    return (
      <div className="content">
        <div className="panel">신청 내역을 찾을 수 없습니다.</div>
        <Link href="/admin/registrations" className="btn">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "businessNumber") {
      // 숫자만 추출하여 저장 (하이픈 제외)
      const numbers = value.replace(/[^\d]/g, "");
      // 최대 10자리까지만 허용
      const limitedNumbers = numbers.slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: limitedNumbers }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleApprove = () => {
    if (!formData.businessNumber || !formData.bankName || !formData.bankAccountNumber) {
      alert("사업자번호, 은행명, 통장번호를 모두 입력해주세요.");
      return;
    }
    // TODO: 승인 API 호출
    alert("회원가입이 승인되었습니다.");
    router.push("/admin/registrations");
  };

  const handleReject = () => {
    if (!formData.notes) {
      alert("반려 사유를 입력해주세요.");
      return;
    }
    // TODO: 반려 API 호출
    alert("회원가입이 반려되었습니다.");
    router.push("/admin/registrations");
  };

  const getStatusBadgeColor = (status: RegistrationStatus) => {
    switch (status) {
      case "대기중":
        return { bg: "#fef3c7", color: "#92400e" };
      case "승인":
        return { bg: "#d1fae5", color: "#065f46" };
      case "반려":
        return { bg: "#fee2e2", color: "#991b1b" };
    }
  };

  const statusColor = getStatusBadgeColor(request.status);

  return (
    <div className="content">
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <Link href="/admin/registrations" className="btn" style={{ display: "inline-flex", alignItems: "center" }}>
          ← 목록으로
        </Link>
        <h1 style={{ margin: 0, flex: 1 }}>회원가입 신청 상세</h1>
        <div
          style={{
            padding: "6px 12px",
            borderRadius: "8px",
            backgroundColor: statusColor.bg,
            color: statusColor.color,
            fontWeight: 600,
            fontSize: "0.9375rem",
            flexShrink: 0,
          }}
        >
          {request.status}
        </div>
      </div>

      <div style={{ display: "grid", gap: 24 }}>
        {/* 신청자 정보 */}
        <div className="panel">
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>신청자 정보</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4, color: "var(--muted)", fontSize: "0.9375rem" }}>
                이메일(아이디)
              </div>
              <div style={{ fontWeight: 600, fontSize: "1.0625rem" }}>{request.email}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4, color: "var(--muted)", fontSize: "0.9375rem" }}>
                전화번호
              </div>
              <div style={{ fontWeight: 600, fontSize: "1.0625rem" }}>{formatPhoneNumber(request.phone)}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4, color: "var(--muted)", fontSize: "0.9375rem" }}>
                신청일
              </div>
              <div style={{ fontSize: "1rem" }}>
                {new Date(request.createdAt).toLocaleString("ko-KR")}
              </div>
            </div>
          </div>
        </div>

        {/* 이미지 확인 */}
        <div className="panel">
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>이미지 확인</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 8, color: "var(--muted)", fontSize: "0.9375rem" }}>
                사업자등록증
              </div>
              <img
                src={request.businessLicenseImage}
                alt="사업자등록증"
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 8, color: "var(--muted)", fontSize: "0.9375rem" }}>
                통장사본
              </div>
              <img
                src={request.bankStatementImage}
                alt="통장사본"
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>

        {/* 정보 입력 */}
        <div className="panel form-grid">
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>정보 입력</h2>
          <label>
            사업자번호 *
            <input
              type="text"
              name="businessNumber"
              value={formatBusinessNumber(formData.businessNumber)}
              onChange={handleChange}
              placeholder="123-45-67890"
              disabled={request.status !== "대기중"}
            />
          </label>
          <label>
            은행명 *
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="예: KB국민은행"
              disabled={request.status !== "대기중"}
            />
          </label>
          <label>
            통장번호 *
            <input
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              placeholder="110123456789"
              disabled={request.status !== "대기중"}
            />
          </label>
          <label>
            메모
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="운영자 메모"
              rows={4}
              disabled={request.status !== "대기중"}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: request.status !== "대기중" ? "#f9fafb" : "#ffffff",
                color: "var(--text)",
                fontSize: "1.0625rem",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
          </label>
        </div>
      </div>

      {request.status === "대기중" && (
        <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
          <button type="button" className="btn" onClick={handleReject}>
            반려
          </button>
          <button type="button" className="btn primary" onClick={handleApprove}>
            승인
          </button>
        </div>
      )}

      {request.status === "반려" && request.notes && (
        <div className="panel" style={{ marginTop: 24, backgroundColor: "#fee2e2" }}>
          <div style={{ fontWeight: 600, marginBottom: 8, color: "var(--muted)", fontSize: "0.9375rem" }}>
            반려 사유
          </div>
          <div>{request.notes}</div>
        </div>
      )}
    </div>
  );
}

