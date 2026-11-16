"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="ma-footer">
      <div className="ma-footer-top">
        <div className="ma-footer-brand">
          <h3>SHOP MINH ẢNH — THỜI TRANG QUẢNG CHÂU NAM NỮ</h3>
          <p>
            Chuyên tuyển chọn quần áo Quảng Châu loại 1 cho nam và nữ: áo thun, sơ mi,
            blazer, sweater, quần tây, jogger và đồ bộ mặc nhà. Form dáng chuẩn đẹp,
            chất liệu chọn lọc, giao hàng toàn quốc.
          </p>
          <p style={{ marginTop: 12 }}>
            <Link
              href="/pages/lien-he"
              style={{ textDecoration: "underline", textUnderlineOffset: 4 }}
            >
              Liên hệ tư vấn sỉ &amp; lẻ ↗
            </Link>
          </p>
        </div>

        <div className="ma-newsletter">
          <h3>ĐĂNG KÝ NHẬN ƯU ĐÃI MỚI NHẤT</h3>
          <p>
            Nhận thông báo sớm khi về lô hàng Quảng Châu mới và mã giảm giá dành riêng
            cho khách hàng thân thiết.
          </p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              placeholder="Nhập email hoặc số Zalo của bạn..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">ĐĂNG KÝ</button>
          </form>
          {subscribed && (
            <p style={{ color: "#9ee0b8", marginTop: 10, fontSize: 12 }}>
              Đã ghi nhận thông tin nhận ưu đãi từ Shop Minh Ảnh.
            </p>
          )}
        </div>
      </div>

      <div className="ma-footer-links">
        <div className="ma-footer-col">
          <h3>VỀ SHOP MINH ẢNH</h3>
          <ul>
            <li>
              <Link href="/pages/gioi-thieu">Giới thiệu Shop Minh Ảnh</Link>
            </li>
            <li>
              <Link href="/collections/thoi-trang-nam">Thời trang Nam Quảng Châu</Link>
            </li>
            <li>
              <Link href="/collections/thoi-trang-nu">Thời trang Nữ Quảng Châu</Link>
            </li>
            <li>
              <Link href="/pages/lien-he">Hợp tác lấy sỉ &amp; CTV</Link>
            </li>
          </ul>
        </div>

        <div className="ma-footer-col">
          <h3>CHÍNH SÁCH &amp; ĐIỀU KHOẢN</h3>
          <ul>
            <li>
              <Link href="/pages/chinh-sach-giao-hang">Chính sách giao hàng</Link>
            </li>
            <li>
              <Link href="/pages/chinh-sach-doi-hang">Chính sách đổi trả 7 ngày</Link>
            </li>
            <li>
              <Link href="/pages/chinh-sach-bao-hanh">Cam kết chất lượng</Link>
            </li>
            <li>
              <Link href="/pages/chinh-sach-bao-mat">Chính sách bảo mật</Link>
            </li>
          </ul>
        </div>

        <div className="ma-footer-col">
          <h3>DỊCH VỤ KHÁCH HÀNG</h3>
          <ul>
            <li>
              <Link href="/collections/all">Tất cả sản phẩm</Link>
            </li>
            <li>
              <Link href="/pages/yeu-thich">Sản phẩm yêu thích</Link>
            </li>
            <li>
              <Link href="/pages/trang-thai-don-hang">Đơn hàng đã đặt</Link>
            </li>
            <li>
              <Link href="/pages/lien-he">Liên hệ hỗ trợ</Link>
            </li>
          </ul>
        </div>

        <div className="ma-footer-col">
          <h3>PHƯƠNG THỨC THANH TOÁN</h3>
          <div className="ma-payments">
            <span>COD</span>
            <span>VIETQR</span>
            <span>MOMO</span>
            <span>VNPAY</span>
          </div>
          <p className="ma-muted" style={{ color: "#999", fontSize: 12 }}>
            Kiểm tra hàng thoải mái trước khi thanh toán. Hỗ trợ đổi size nhanh chóng.
          </p>
        </div>
      </div>

      <div className="ma-copyright">
        <span>© {new Date().getFullYear()} SHOP MINH ẢNH — QUẦN ÁO QUẢNG CHÂU NAM NỮ</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          LÊN ĐẦU TRANG <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
