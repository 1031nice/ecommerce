import { Product, Category, Order, RegistrationRequest } from "./types";

export const CATEGORIES: Category[] = ["상의", "하의", "아우터", "원피스", "신발", "액세서리"];

// Dummy products
export const PRODUCTS: Product[] = [
  {
    id: "p-1",
    slug: "basic-tee-black",
    title: "베이직 티셔츠 - 블랙",
    price: 19900,
    category: "상의",
    imageUrls: [
      "https://picsum.photos/seed/basic-tee-black-1/1200/900",
      "https://picsum.photos/seed/basic-tee-black-2/1200/900"
    ],
    thumbnailUrl: "https://picsum.photos/seed/basic-tee-black-thumb/600/450"
  },
  {
    id: "p-2",
    slug: "relaxed-jeans-blue",
    title: "릴랙스 핏 데님 - 블루",
    price: 49900,
    category: "하의",
    imageUrls: [
      "https://picsum.photos/seed/relaxed-jeans-blue-1/1200/900",
      "https://picsum.photos/seed/relaxed-jeans-blue-2/1200/900"
    ],
    thumbnailUrl: "https://picsum.photos/seed/relaxed-jeans-blue-thumb/600/450"
  },
  {
    id: "p-3",
    slug: "light-coach-jacket",
    title: "라이트 코치 자켓",
    price: 79900,
    category: "아우터",
    imageUrls: [
      "https://picsum.photos/seed/light-coach-jacket-1/1200/900",
      "https://picsum.photos/seed/light-coach-jacket-2/1200/900"
    ],
    thumbnailUrl: "https://picsum.photos/seed/light-coach-jacket-thumb/600/450"
  },
  {
    id: "p-4",
    slug: "summer-onepiece",
    title: "서머 원피스",
    price: 69900,
    category: "원피스",
    imageUrls: [
      "https://picsum.photos/seed/summer-onepiece-1/1200/900",
      "https://picsum.photos/seed/summer-onepiece-2/1200/900"
    ],
    thumbnailUrl: "https://picsum.photos/seed/summer-onepiece-thumb/600/450"
  }
];

// Dummy orders
export const ORDERS: Order[] = [
  {
    id: "o-1",
    orderNumber: "ORD-2025-001",
    product: {
      id: "p-1",
      title: "베이직 티셔츠 - 블랙",
      price: 19900,
      thumbnailUrl: "https://picsum.photos/seed/basic-tee-black-thumb/600/450"
    },
    seller: {
      id: "s-1",
      name: "ABC 의류",
      email: "abc@example.com",
      phone: "010-1234-5678"
    },
    buyer: {
      id: "b-1",
      name: "XYZ 쇼핑몰",
      email: "xyz@example.com",
      phone: "010-9876-5432"
    },
    status: "처리중",
    createdAt: "2025-11-20T10:30:00",
    quantity: 50,
    totalPrice: 995000,
    deliveryAddress: "서울특별시 강남구 테헤란로 123, 5층",
    notes: "빠른 배송 부탁드립니다."
  },
  {
    id: "o-2",
    orderNumber: "ORD-2025-002",
    product: {
      id: "p-2",
      title: "릴랙스 핏 데님 - 블루",
      price: 49900,
      thumbnailUrl: "https://picsum.photos/seed/relaxed-jeans-blue-thumb/600/450"
    },
    seller: {
      id: "s-2",
      name: "데님 전문점",
      email: "denim@example.com",
      phone: "010-1111-2222"
    },
    buyer: {
      id: "b-2",
      name: "패션몰",
      email: "fashion@example.com",
      phone: "010-3333-4444"
    },
    status: "예약",
    createdAt: "2025-11-21T14:20:00",
    quantity: 30,
    totalPrice: 1497000,
    deliveryAddress: "부산광역시 해운대구 해운대해변로 456",
    notes: "사이즈 확인 후 배송 부탁드립니다."
  },
  {
    id: "o-3",
    orderNumber: "ORD-2025-003",
    product: {
      id: "p-3",
      title: "라이트 코치 자켓",
      price: 79900,
      thumbnailUrl: "https://picsum.photos/seed/light-coach-jacket-thumb/600/450"
    },
    seller: {
      id: "s-3",
      name: "아우터 하우스",
      email: "outer@example.com",
      phone: "010-5555-6666"
    },
    buyer: {
      id: "b-3",
      name: "스타일샵",
      email: "style@example.com",
      phone: "010-7777-8888"
    },
    status: "거래완료",
    createdAt: "2025-11-15T09:15:00",
    quantity: 20,
    totalPrice: 1598000,
    deliveryAddress: "인천광역시 연수구 송도과학로 789",
    notes: ""
  },
  {
    id: "o-4",
    orderNumber: "ORD-2025-004",
    product: {
      id: "p-4",
      title: "서머 원피스",
      price: 69900,
      thumbnailUrl: "https://picsum.photos/seed/summer-onepiece-thumb/600/450"
    },
    seller: {
      id: "s-4",
      name: "원피스 브랜드",
      email: "onepiece@example.com",
      phone: "010-9999-0000"
    },
    buyer: {
      id: "b-4",
      name: "여성복 매장",
      email: "women@example.com",
      phone: "010-2222-3333"
    },
    status: "거래가능",
    createdAt: "2025-11-22T11:45:00",
    quantity: 15,
    totalPrice: 1048500,
    deliveryAddress: "대전광역시 유성구 대학로 321",
    notes: "색상 확인 후 주문 부탁드립니다."
  },
  {
    id: "o-5",
    orderNumber: "ORD-2025-005",
    product: {
      id: "p-1",
      title: "베이직 티셔츠 - 블랙",
      price: 19900,
      thumbnailUrl: "https://picsum.photos/seed/basic-tee-black-thumb/600/450"
    },
    seller: {
      id: "s-1",
      name: "ABC 의류",
      email: "abc@example.com",
      phone: "010-1234-5678"
    },
    buyer: {
      id: "b-5",
      name: "온라인 스토어",
      email: "online@example.com",
      phone: "010-4444-5555"
    },
    status: "처리중",
    createdAt: "2025-11-19T16:00:00",
    quantity: 100,
    totalPrice: 1990000,
    deliveryAddress: "경기도 성남시 분당구 정자동 123-45",
    notes: "대량 주문입니다. 할인 가능한지 문의 부탁드립니다."
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getOrderById(id: string): Order | undefined {
  return ORDERS.find((o) => o.id === id);
}

// 회원가입 신청 더미 데이터
export const REGISTRATION_REQUESTS: RegistrationRequest[] = [
  {
    id: "reg-1",
    email: "company1@example.com",
    phone: "01012345678",
    businessLicenseImage: "https://picsum.photos/seed/business-license-1/800/600",
    bankStatementImage: "https://picsum.photos/seed/bank-statement-1/800/600",
    createdAt: "2024-01-15T10:30:00Z",
    status: "대기중",
  },
  {
    id: "reg-2",
    email: "company2@example.com",
    phone: "01023456789",
    businessLicenseImage: "https://picsum.photos/seed/business-license-2/800/600",
    bankStatementImage: "https://picsum.photos/seed/bank-statement-2/800/600",
    createdAt: "2024-01-16T14:20:00Z",
    status: "대기중",
  },
  {
    id: "reg-3",
    email: "company3@example.com",
    phone: "01034567890",
    businessLicenseImage: "https://picsum.photos/seed/business-license-3/800/600",
    bankStatementImage: "https://picsum.photos/seed/bank-statement-3/800/600",
    createdAt: "2024-01-17T09:15:00Z",
    status: "대기중",
  },
  {
    id: "reg-4",
    email: "company4@example.com",
    phone: "01045678901",
    businessLicenseImage: "https://picsum.photos/seed/business-license-4/800/600",
    bankStatementImage: "https://picsum.photos/seed/bank-statement-5/800/600",
    createdAt: "2024-01-10T11:00:00Z",
    status: "승인",
    businessNumber: "1234567890",
    bankName: "KB국민은행",
    bankAccountNumber: "110123456789",
  },
  {
    id: "reg-5",
    email: "company5@example.com",
    phone: "01056789012",
    businessLicenseImage: "https://picsum.photos/seed/business-license-5/800/600",
    bankStatementImage: "https://picsum.photos/seed/bank-statement-5/800/600",
    createdAt: "2024-01-12T16:45:00Z",
    status: "반려",
    notes: "사업자등록증 이미지가 불명확함",
  },
];

export function getRegistrationRequestById(id: string): RegistrationRequest | undefined {
  return REGISTRATION_REQUESTS.find((req) => req.id === id);
}

