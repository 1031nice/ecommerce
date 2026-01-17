-- V1__init.sql
-- DB 제약(Constraint) 최소화 원칙: UNIQUE, FK, CHECK 등은 애플리케이션 레벨에서 관리
-- 인덱스(Index)는 성능을 위해 물리적으로 생성

-- 1. Members 테이블 (회원)
DROP TABLE IF EXISTS members CASCADE;
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL, -- 논리적 Unique
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'USER',
    
    -- 사용자 정보
    company_name TEXT,
    phone TEXT NOT NULL,
    email TEXT, -- 논리적 Unique
    
    -- 사업자 정보
    business_number TEXT, -- 논리적 Unique
    business_address TEXT,
    yard_address TEXT,
    
    -- 상태 관리
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 초기 관리자 계정
INSERT INTO members (username, password, role, phone, email) 
VALUES ('admin', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.TVuHOn2', 'ADMIN', '010-0000-0000', 'admin@example.com');


-- 2. Business Licenses 테이블 (사업자등록증)
DROP TABLE IF EXISTS business_licenses CASCADE;
CREATE TABLE business_licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL, -- FK 없음
    file_url TEXT NOT NULL,
    file_name TEXT, -- 원본 파일명
    
    status TEXT NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    
    -- 승인/반려 정보
    approved_by UUID, -- 관리자 ID
    rejection_reason TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- 3. Categories 테이블 (대분류)
DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO categories (name, code, display_order) VALUES ('가설재', 'scaffolding', 1);
INSERT INTO categories (name, code, display_order) VALUES ('유로폼', 'euroform', 2);


-- 4. Common Codes 테이블 (공통 코드 - 신규 추가)
DROP TABLE IF EXISTS common_codes CASCADE;
CREATE TABLE common_codes (
    code_type TEXT NOT NULL, -- GRADE, ITEM, etc.
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- PK는 물리적으로 안 걸지만 (code_type, code) 조합이 식별자임

-- 초기 데이터 (예시)
INSERT INTO common_codes (code_type, code, name, display_order) VALUES 
('GRADE', 'NEW', '신재', 1),
('GRADE', 'USED', '고재', 2),
('GRADE', 'SHORT_NEW', '쇼트신재', 3);


-- 5. Products 테이블 (상품)
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL,
    
    name TEXT NOT NULL,
    price DECIMAL(12, 2) NOT NULL, -- 음수 체크 로직 필요
    stock_quantity INTEGER NOT NULL DEFAULT 0, -- 음수 체크 로직 필요
    
    -- 상품 속성
    grade TEXT NOT NULL,
    item_name TEXT NOT NULL,
    spec TEXT NOT NULL,
    
    -- 이미지
    image_urls TEXT[],
    thumbnail_url TEXT,
    
    description TEXT,
    
    -- 관리
    is_active BOOLEAN DEFAULT TRUE,
    min_order_quantity INTEGER DEFAULT 1,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 검색 성능용 인덱스
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_grade ON products(grade);
CREATE INDEX idx_products_item_name ON products(item_name);
CREATE INDEX idx_products_spec ON products(spec);


-- 6. Orders 테이블 (주문)
DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL, -- 논리적 Unique
    
    product_id UUID NOT NULL,
    seller_id UUID NOT NULL,
    buyer_id UUID NOT NULL,
    
    status TEXT NOT NULL DEFAULT 'PENDING',
    quantity INTEGER NOT NULL,
    
    -- 가격 정보 (중요: 단가 저장)
    unit_price DECIMAL(12, 2) NOT NULL, 
    total_price DECIMAL(12, 2) NOT NULL,
    
    -- 배송 정보
    delivery_address TEXT NOT NULL,
    recipient_name TEXT,
    recipient_phone TEXT,
    
    notes TEXT,
    admin_notes TEXT, -- 운영자 메모
    
    -- 일정
    requested_delivery_date DATE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_buyer ON orders(buyer_id);
CREATE INDEX idx_orders_seller ON orders(seller_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);