"use client";

import { useMemo, useState } from "react";
import { ORDERS } from "@lib/data";
import { OrderStatus } from "@lib/types";

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "전체">("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return ORDERS.filter((order) => {
      const matchesStatus = statusFilter === "전체" || order.status === statusFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.buyer.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  const statusColors: Record<OrderStatus, string> = {
    거래가능: "#6b7280",
    예약: "#f59e0b",
    처리중: "#3b82f6",
    거래완료: "#22c55e",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price) + "원";
  };

  return (
    <div className="content">
      <h1 style={{ marginTop: 0, marginBottom: 24 }}>주문 목록</h1>

      <div className="panel" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: "1 1 300px", minWidth: 200 }}>
            <input
              type="text"
              placeholder="주문번호, 상품명, 판매자, 구매자로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "#ffffff",
                fontSize: "1rem",
              }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "전체")}
            className="sort-select"
            style={{ minWidth: 160 }}
          >
            <option value="전체">전체 상태</option>
            <option value="거래가능">거래가능</option>
            <option value="예약">예약</option>
            <option value="처리중">처리중</option>
            <option value="거래완료">거래완료</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="panel">조건에 맞는 주문이 없습니다.</div>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {filtered.map((order) => (
            <div key={order.id} className="panel">
              <div style={{ display: "grid", gap: 16 }}>
                {/* 헤더 */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: 4 }}>
                      {order.orderNumber}
                    </div>
                    <div style={{ color: "var(--muted)", fontSize: "0.9375rem" }}>
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      background: statusColors[order.status] + "15",
                      color: statusColors[order.status],
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                    }}
                  >
                    {order.status}
                  </div>
                </div>

                {/* 상품 정보 */}
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <img
                    src={order.product.thumbnailUrl}
                    alt={order.product.title}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "1px solid var(--border)",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>{order.product.title}</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.9375rem", marginBottom: 4 }}>
                      단가: {formatPrice(order.product.price)} × {order.quantity}개
                    </div>
                    <div style={{ fontWeight: 600, color: "var(--brand)" }}>
                      총액: {formatPrice(order.totalPrice)}
                    </div>
                  </div>
                </div>

                {/* 판매자/구매자 정보 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 8, color: "var(--muted)", fontSize: "0.9375rem" }}>
                      판매자
                    </div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{order.seller.name}</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.9375rem" }}>{order.seller.email}</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.9375rem" }}>{order.seller.phone}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 8, color: "var(--muted)", fontSize: "0.9375rem" }}>
                      구매자
                    </div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{order.buyer.name}</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.9375rem" }}>{order.buyer.email}</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.9375rem" }}>{order.buyer.phone}</div>
                  </div>
                </div>

                {/* 배송지 및 메모 */}
                {(order.deliveryAddress || order.notes) && (
                  <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    {order.deliveryAddress && (
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ fontWeight: 600, marginBottom: 4, color: "var(--muted)", fontSize: "0.9375rem" }}>
                          배송지
                        </div>
                        <div>{order.deliveryAddress}</div>
                      </div>
                    )}
                    {order.notes && (
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: 4, color: "var(--muted)", fontSize: "0.9375rem" }}>
                          요청사항
                        </div>
                        <div>{order.notes}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

