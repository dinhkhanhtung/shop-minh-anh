import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";

export const metadata: Metadata = {
  title: "Shop Minh Anh | Thời Trang Quảng Châu Nam Nữ",
  description:
    "Shop Minh Anh — Chuyên quần áo Quảng Châu nam nữ tuyển chọn loại 1: blazer, áo kiểu, áo thun, sweater, quần tây, jogger và đồ bộ mặc nhà. Form chuẩn dáng Việt.",
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap"
        />
      </head>
      <body>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Overlays />
        </StoreProvider>
      </body>
    </html>
  );
}
