# PWA 설정 가이드

## 🚀 가장 간단한 방법 (3분이면 끝!)

### 1단계: 아이콘 생성 (온라인 도구 사용)
1. https://realfavicongenerator.net/ 접속
2. 아무 이미지나 업로드 (로고, 단색 배경 등)
3. "Generate favicons and HTML code" 클릭
4. 다운로드한 파일 중 다음 3개만 `public` 폴더에 복사:
   - `android-chrome-192x192.png` → `icon-192.png`로 이름 변경
   - `android-chrome-512x512.png` → `icon-512.png`로 이름 변경
   - `apple-touch-icon.png` → `apple-icon-180.png`로 이름 변경

끝! 🎉

## 필요한 아이콘 파일 (최소 3개만!)

### 필수 아이콘 (3개만 있으면 됨)

1. **Android용 아이콘**:
   - `icon-192.png` (192x192) ⭐ 필수
   - `icon-512.png` (512x512) ⭐ 필수

2. **iOS용 아이콘**:
   - `apple-icon-180.png` (180x180) ⭐ 필수

**이 3개만 있으면 PWA가 완벽하게 작동합니다!**

## 아이콘 생성 방법

### 방법 1: 온라인 도구 사용
1. https://realfavicongenerator.net/ 또는 https://www.pwabuilder.com/imageGenerator 접속
2. 512x512 PNG 이미지 업로드
3. 모든 크기 아이콘 자동 생성 및 다운로드

### 방법 2: ImageMagick 사용 (CLI)
```bash
# ImageMagick 설치 후
convert logo.png -resize 192x192 icon-192.png
convert logo.png -resize 512x512 icon-512.png
# ... 등등
```

### 방법 3: Figma/Sketch 사용
- 512x512 디자인을 만들고
- 각 크기로 export

## 아이콘 디자인 가이드라인

### Android (Maskable Icons)
- **중요**: 아이콘의 중요한 내용이 중앙 80% 안에 있어야 함
- 모서리 20%는 시스템이 마스킹할 수 있음
- 배경색: 투명 또는 단색
- 권장: 512x512에서 시작하여 각 크기로 리사이즈

### iOS
- 180x180 (실제로는 60pt @3x)
- 투명 배경 없음 (iOS가 자동으로 둥근 모서리 추가)
- 중요한 내용이 중앙에 위치

## 테스트 방법

### Chrome DevTools
1. Chrome에서 사이트 열기
2. F12 > Application 탭
3. Manifest 확인
4. Service Workers 확인 (있는 경우)

### Android
1. Chrome에서 사이트 열기
2. 메뉴 > "홈 화면에 추가" 또는 "Add to Home Screen"
3. 앱처럼 실행되는지 확인

### iOS Safari
1. Safari에서 사이트 열기
2. 공유 버튼 > "홈 화면에 추가" 또는 "Add to Home Screen"
3. 홈 화면에서 앱처럼 실행되는지 확인
4. Splash screen이 표시되는지 확인

## 현재 설정된 기능

✅ Manifest.json (Android/Chrome)
✅ iOS Meta Tags
✅ Viewport 설정
✅ Theme Color
✅ Standalone Display Mode
✅ Shortcuts (빠른 액세스)
✅ Browserconfig.xml (Windows)

## 추가 개선 사항 (선택사항)

### Service Worker 추가
오프라인 지원과 캐싱을 위해 Service Worker를 추가할 수 있습니다:

```typescript
// app/sw.ts 또는 public/sw.js
// Next.js에서는 next-pwa 패키지 사용 권장
```

### Push Notifications
알림 기능을 추가하려면:
1. Service Worker 필요
2. Push API 구현
3. 사용자 권한 요청

## 참고 링크
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [PWA Builder](https://www.pwabuilder.com/)
- [iOS PWA 가이드](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

