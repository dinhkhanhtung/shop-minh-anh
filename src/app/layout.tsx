import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";

export const metadata: Metadata = {
  title: "Shop Minh Ảnh | Thời Trang Quảng Châu Nam Nữ",
  description:
    "Shop Minh Ảnh chuyên quần áo Quảng Châu nam nữ loại 1: áo thun, blazer, sweater, quần tây, jogger, kaki, đồ bộ. Form chuẩn dáng Việt, kiểm tra hàng trước khi thanh toán.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="stylesheet" href="/styles/fonts.css" />
        <link rel="stylesheet" href="/styles/libs.css" />
        <link rel="stylesheet" href="/styles/general.css" />
        <link rel="stylesheet" href="/styles/app.css" />
        <link rel="stylesheet" href="/styles/banners.css" />
      </head>
      <body className="md-site">
        <StoreProvider>
          <Header />
          <main id="md-main" className="body-main body-main-2">
            {children}
          </main>
          <Footer />
          <Overlays />
        </StoreProvider>
      </body>
    </html>
  );
}
