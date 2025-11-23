export type Category = "상의" | "하의" | "아우터" | "원피스" | "신발" | "액세서리";

export type OrderStatus = "거래가능" | "예약" | "처리중" | "거래완료";

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  category: Category;
  imageUrls: string[];
  thumbnailUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  product: {
    id: string;
    title: string;
    price: number;
    thumbnailUrl: string;
  };
  seller: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  buyer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  status: OrderStatus;
  createdAt: string;
  quantity: number;
  totalPrice: number;
  deliveryAddress?: string;
  notes?: string;
}

export type RegistrationStatus = "대기중" | "승인" | "반려";

export interface RegistrationRequest {
  id: string;
  email: string;
  phone: string;
  businessLicenseImage: string; // 이미지 URL
  bankStatementImage: string; // 이미지 URL
  createdAt: string;
  status: RegistrationStatus;
  // 운영자가 입력하는 정보
  businessNumber?: string;
  bankName?: string;
  bankAccountNumber?: string;
  notes?: string; // 운영자 메모
}

