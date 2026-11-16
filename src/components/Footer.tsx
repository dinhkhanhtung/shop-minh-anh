"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("Đã ghi nhận email nhận ưu đãi từ Shop Minh Ảnh.");
    setEmail("");
  };

  return (
    <footer className="md-footer">
      <div className="md-footer-top">
        <div className="md-footer-brand">
          <div style={{ marginBottom: 16 }}>
            <strong style={{ fontSize: 22, letterSpacing: "0.14em", color: "#fff" }}>
              SHOP MINH ẢNH
            </strong>
          </div>
          <h3>SHOP MINH ẢNH — QUẦN ÁO QUẢNG CHÂU NAM NỮ</h3>
          <p>
            Chuyên sỉ &amp; lẻ thời trang Quảng Châu loại 1 cho nam và nữ: áo thun, blazer,
            sweater, quần tây, jogger và đồ bộ mặc nhà.
          </p>
          <Link href="/pages/lien-he">Liên hệ hỗ trợ ↗</Link>
        </div>

        <div className="md-newsletter">
          <h3>ĐĂNG KÝ NHẬN TIN ƯU ĐÃI</h3>
          <p>Cập nhật mẫu Quảng Châu mới về mỗi tuần và ưu đãi dành riêng cho khách hàng.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="Nhập địa chỉ email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">ĐĂNG KÝ</button>
          </form>
          {status && <div className="md-form-status">{status}</div>}
        </div>
      </div>

      <div className="md-footer-links">
        <div className="md-footer-col">
          <h3>Về chúng tôi</h3>
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

        <div className="md-footer-col">
          <h3>Chính sách &amp; Điều khoản</h3>
          <ul>
            <li>
              <Link href="/pages/chinh-sach-giao-hang">Chính sách giao hàng</Link>
            </li>
            <li>
              <Link href="/pages/chinh-sach-doi-hang">Chính sách đổi hàng</Link>
            </li>
            <li>
              <Link href="/pages/chinh-sach-bao-hanh">Chính sách bảo hành</Link>
            </li>
            <li>
              <Link href="/pages/chinh-sach-bao-mat">Chính sách bảo mật</Link>
            </li>
          </ul>
        </div>

        <div className="md-footer-col">
          <h3>Dịch vụ khách hàng</h3>
          <ul>
            <li>
              <Link href="/collections/all">Tất cả sản phẩm</Link>
            </li>
            <li>
              <Link href="/pages/trang-thai-don-hang">Đơn hàng đã lưu</Link>
            </li>
            <li>
              <Link href="/pages/yeu-thich">Sản phẩm yêu thích</Link>
            </li>
            <li>
              <Link href="/pages/lien-he">Liên hệ hỗ trợ</Link>
            </li>
          </ul>
        </div>

        <div className="md-footer-col">
          <h3>Thanh toán</h3>
          <div className="md-payments">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>VIETQR</span>
            <span>COD</span>
          </div>
          <p className="md-muted">
            Kiểm tra hàng thoải mái trước khi thanh toán. Hỗ trợ đổi size trong 7 ngày.
          </p>
        </div>
      </div>

      <div className="md-copyright">
        <span>© {new Date().getFullYear()} SHOP MINH ẢNH — THỜI TRANG QUẢNG CHÂU NAM NỮ</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
}
