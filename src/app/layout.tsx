import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";

export const metadata: Metadata = {
  title: "Shop Minh Ảnh | Thời Trang Quảng Châu Nam Nữ Cao Cấp",
  description:
    "Shop Minh Ảnh chuyên quần áo Quảng Châu nam nữ loại 1: áo thun, sơ mi, blazer, sweater, quần tây, jogger và đồ bộ mặc nhà. Form chuẩn đẹp, kiểm tra hàng trước khi thanh toán.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
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
