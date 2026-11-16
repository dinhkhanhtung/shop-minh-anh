"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { formatMoney } from "@/lib/format";
import ProductCard from "@/components/ProductCard";

export default function InfoPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug || "gioi-thieu";
  const { products, favorites, orders, showToast } = useStore();
  const [contactSent, setContactSent] = useState(false);

  if (slug === "yeu-thich") {
    const favProducts = products.filter((p) => favorites.includes(p.handle));
    return (
      <div className="ma-container" style={{ paddingBottom: 70, minHeight: "60vh" }}>
        <div className="ma-crumbs">
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <span>Sản phẩm yêu thích</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 28 }}>
          SẢN PHẨM YÊU THÍCH ({favProducts.length})
        </h1>
        {favProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <h2 style={{ fontSize: 20 }}>Chưa có sản phẩm yêu thích</h2>
            <p style={{ color: "#777", marginBottom: 22 }}>
              Nhấn biểu tượng trái tim trên sản phẩm để lưu lại mẫu bạn ưng ý.
            </p>
            <Link href="/collections/all" className="ma-button">
              KHÁM PHÁ NGAY
            </Link>
          </div>
        ) : (
          <div className="ma-grid-4">
            {favProducts.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (slug === "trang-thai-don-hang") {
    return (
      <div className="ma-container" style={{ paddingBottom: 70, minHeight: "60vh" }}>
        <div className="ma-crumbs">
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <span>Đơn hàng đã đặt</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 28 }}>
          ĐƠN HÀNG CỦA BẠN ({orders.length})
        </h1>
        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <h2 style={{ fontSize: 20 }}>Bạn chưa có đơn hàng nào</h2>
            <p style={{ color: "#777", marginBottom: 22 }}>
              Các đơn hàng bạn đặt trên thiết bị này sẽ hiển thị tại đây.
            </p>
            <Link href="/collections/all" className="ma-button">
              MUA SẮM NGAY
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 20 }}>
            {orders.map((o) => (
              <article
                key={o.id}
                style={{
                  padding: 24,
                  background: "var(--ma-paper)",
                  border: "1px solid var(--ma-line)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                  <h2 style={{ margin: 0, fontSize: 18 }}>Đơn hàng {o.id}</h2>
                  <span style={{ fontSize: 12, color: "#666" }}>
                    {new Date(o.createdAt).toLocaleString("vi-VN")}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "#283e32", margin: "8px 0 14px" }}>
                  {o.status}
                </p>
                <ul style={{ paddingLeft: 20, fontSize: 13, lineHeight: 1.8 }}>
                  {o.items.map((it, idx) => (
                    <li key={idx}>
                      {it.title} ({it.color}/{it.size}) × {it.quantity} —{" "}
                      <strong>{formatMoney(it.unitPrice * it.quantity)}</strong>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 12, fontSize: 15 }}>
                  Tổng tiền hàng: <strong>{formatMoney(o.subtotal)}</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (slug === "lien-he") {
    return (
      <div className="ma-container" style={{ paddingBottom: 70, maxWidth: 860 }}>
        <div className="ma-crumbs">
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <span>Liên hệ Shop Minh Anh</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 14 }}>
          LIÊN HỆ SHOP MINH ẢNH
        </h1>
        <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, marginBottom: 28 }}>
          Shop Minh Anh chuyên quần áo Quảng Châu Nam &amp; Nữ loại 1 (bán lẻ &amp; nhận
          đổ sỉ, CTV toàn quốc). Để lại thông tin dưới đây để được tư vấn chọn size, báo
          giá sỉ hoặc kiểm tra đơn hàng nhanh nhất.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setContactSent(true);
            showToast("Đã gửi yêu cầu liên hệ tới Shop Minh Anh.");
          }}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, fontWeight: 600 }}>
              Họ và tên *
              <input
                type="text"
                required
                placeholder="Nhập họ tên của bạn"
                style={{ padding: 13, border: "1px solid #d5d2cd", fontWeight: 400 }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, fontWeight: 600 }}>
              Số điện thoại / Zalo *
              <input
                type="tel"
                required
                placeholder="09xx xxx xxx"
                style={{ padding: 13, border: "1px solid #d5d2cd", fontWeight: 400 }}
              />
            </label>
          </div>
          <label style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, fontWeight: 600 }}>
            Nội dung cần hỗ trợ *
            <textarea
              rows={4}
              required
              placeholder="Bạn muốn tư vấn mẫu nào, lấy lẻ hay lấy sỉ..."
              style={{ padding: 13, border: "1px solid #d5d2cd", fontWeight: 400 }}
            />
          </label>
          <button type="submit" className="ma-button" style={{ width: "max-content" }}>
            GỬI YÊU CẦU TƯ VẤN
          </button>
          {contactSent && (
            <p style={{ fontSize: 13, color: "#283e32", background: "#f1f6f2", padding: 14 }}>
              Cảm ơn bạn! Shop Minh Anh đã tiếp nhận thông tin và sẽ phản hồi sớm nhất.
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="ma-container" style={{ paddingBottom: 70, maxWidth: 860 }}>
      <div className="ma-crumbs">
        <Link href="/">Trang chủ</Link>
        <span>/</span>
        <span>Thông tin Shop Minh Anh</span>
      </div>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>
        SHOP MINH ẢNH — THỜI TRANG QUẢNG CHÂU NAM NỮ
      </h1>
      <div style={{ fontSize: 15, lineHeight: 1.9, color: "#333" }}>
        <p>
          <strong>Shop Minh Anh</strong> chuyên cung cấp các dòng sản phẩm quần áo
          Quảng Châu tuyển chọn cho cả Nam và Nữ: áo blazer, áo kiểu, set bộ thu đông,
          áo thun, sweater, quần tây, quần jogger và đồ mặc nhà cao cấp.
        </p>
        <p>
          Tất cả sản phẩm đều được kiểm tra kỹ về chất vải, đường may và form dáng
          trước khi đóng gói gửi tới tay khách hàng. Hỗ trợ kiểm tra hàng khi nhận và
          đổi size linh hoạt trong vòng 7 ngày.
        </p>
      </div>
      <div style={{ marginTop: 28 }}>
        <Link href="/collections/all" className="ma-button">
          KHÁM PHÁ BỘ SƯU TẬP ↗
        </Link>
      </div>
    </div>
  );
}
