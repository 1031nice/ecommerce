// PWA용 추가 meta 태그들
// Next.js App Router에서는 metadata API로 처리되지 않는 일부 태그들을 위해 사용

export default function PWAHead() {
  return (
    <>
      {/* iOS PWA 설정 - 명시적으로 추가 */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Clothery" />
      <link rel="apple-touch-icon" href="/apple-icon-180.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180.png" />
      
      {/* Android PWA 설정 */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="Clothery" />
      <meta name="msapplication-TileColor" content="#333333" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
    </>
  );
}

