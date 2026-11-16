"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { formatMoney } from "@/lib/format";
import type { SavedOrder } from "@/types/catalog";

export default function CheckoutPage() {
  const { cart, cartSubtotal, getProduct, saveOrder, clearCart, showToast } =
    useStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [completedOrder, setCompletedOrder] = useState<SavedOrder | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Giỏ hàng của bạn đang trống.");
      return;
    }

    const order: SavedOrder = {
      id: "MA-" + Date.now().toString(36).toUpperCase(),
      createdAt: new Date().toISOString(),
      customer: { name, phone, address, note, paymentMethod },
      items: cart.map((item) => {
        const p = getProduct(item.handle);
        const v = p?.variants.find((vr) => vr.id === item.variantId);
        return {
          handle: item.handle,
          variantId: item.variantId,
          title: p?.title || item.handle,
          color: v?.color || "",
          size: v?.size || "",
          quantity: item.quantity,
          unitPrice: v?.price ?? p?.price ?? 0,
          image: p?.images[0]?.src || "",
        };
      }),
      subtotal: cartSubtotal,
      status: "Đã ghi nhận đơn hàng — Shop Minh Ảnh sẽ liên hệ xác nhận",
    };

    saveOrder(order);
    clearCart();
    setCompletedOrder(order);
    showToast(`Đã tạo đơn hàng ${order.id} thành công!`);
  };

  if (completedOrder) {
    return (
      <div className="ma-container" style={{ padding: "60px 20px", maxWidth: 760 }}>
        <div
          style={{
            background: "#f1f6f2",
            border: "1px solid #c7dccb",
            padding: 32,
          }}
        >
          <p className="ma-eyebrow" style={{ color: "#283e32" }}>
            ĐẶT HÀNG THÀNH CÔNG
          </p>
          <h1 style={{ fontSize: 26, margin: "0 0 12px" }}>
            Cảm ơn bạn đã đặt hàng tại Shop Minh Ảnh!
          </h1>
          <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7 }}>
            Mã đơn hàng của bạn là <strong>{completedOrder.id}</strong>. Nhân viên
            Shop Minh Ảnh sẽ gọi/nhắn Zalo xác nhận đơn trong thời gian sớm nhất.
          </p>
          <div style={{ margin: "20px 0", fontSize: 14 }}>
            <div>Người nhận: <strong>{completedOrder.customer.name}</strong> — {completedOrder.customer.phone}</div>
            <div>Địa chỉ: {completedOrder.customer.address}</div>
            <div>Tổng tiền hàng: <strong>{formatMoney(completedOrder.subtotal)}</strong> ({completedOrder.customer.paymentMethod})</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
            <Link href="/pages/trang-thai-don-hang" className="ma-button">
              XEM ĐƠN HÀNG ĐÃ ĐẶT
            </Link>
            <Link href="/collections/all" className="ma-button ma-outline">
              TIẾP TỤC MUA SẮM
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ma-container" style={{ paddingBottom: 70 }}>
      <div className="ma-crumbs">
        <Link href="/">Trang chủ</Link>
        <span>/</span>
        <Link href="/cart">Giỏ hàng</Link>
        <span>/</span>
        <span>Đặt hàng</span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 600, margin: "10px 0 30px" }}>
        THÔNG TIN GIAO HÀNG
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(280px, 0.9fr)",
          gap: 48,
          alignItems: "start",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, fontWeight: 600 }}>
            Họ và tên người nhận *
            <input
              type="text"
              required
              placeholder="Ví dụ: Nguyễn Minh Ảnh"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: 13, border: "1px solid #d5d2cd", fontWeight: 400 }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, fontWeight: 600 }}>
            Số điện thoại / Zalo *
            <input
              type="tel"
              required
              placeholder="09xx xxx xxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ padding: 13, border: "1px solid #d5d2cd", fontWeight: 400 }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, fontWeight: 600 }}>
            Địa chỉ nhận hàng chi tiết *
            <input
              type="text"
              required
              placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ padding: 13, border: "1px solid #d5d2cd", fontWeight: 400 }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, fontWeight: 600 }}>
            Phương thức thanh toán
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ padding: 13, border: "1px solid #d5d2cd", background: "#fff", fontWeight: 400 }}
            >
              <option value="COD">Thanh toán khi nhận hàng (COD)</option>
              <option value="Chuyển khoản VietQR">Chuyển khoản ngân hàng / VietQR</option>
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, fontWeight: 600 }}>
            Ghi chú đơn hàng (tùy chọn)
            <textarea
              rows={3}
              placeholder="Chiều cao/cân nặng để shop kiểm tra lại size chuẩn trước khi gửi..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ padding: 13, border: "1px solid #d5d2cd", fontWeight: 400 }}
            />
          </label>

          <button
            type="submit"
            className="ma-button"
            disabled={cart.length === 0}
            style={{ marginTop: 8 }}
          >
            XÁC NHẬN ĐẶT HÀNG
          </button>
        </form>

        <aside
          style={{
            background: "var(--ma-paper)",
            padding: 26,
            border: "1px solid var(--ma-line)",
          }}
        >
          <h2 style={{ fontSize: 18, margin: "0 0 18px" }}>
            ĐƠN HÀNG ({cart.reduce((s, i) => s + i.quantity, 0)} sản phẩm)
          </h2>

          {cart.map((item) => {
            const p = getProduct(item.handle);
            if (!p) return null;
            const v = p.variants.find((vr) => vr.id === item.variantId);
            const price = v?.price ?? p.price;
            return (
              <div
                key={`${item.handle}-${item.variantId}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: "1px solid var(--ma-line)",
                  fontSize: 13,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: "#777", marginTop: 4 }}>
                    {v?.color} / {v?.size} × {item.quantity}
                  </div>
                </div>
                <strong style={{ whiteSpace: "nowrap" }}>
                  {formatMoney(price * item.quantity)}
                </strong>
              </div>
            );
          })}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 18,
              fontSize: 16,
            }}
          >
            <span>Tổng tiền sản phẩm</span>
            <strong>{formatMoney(cartSubtotal)}</strong>
          </div>
          <p style={{ fontSize: 12, color: "#777", marginTop: 8 }}>
            Miễn phí vận chuyển cho đơn từ 499.000đ.
          </p>
        </aside>
      </div>
    </div>
  );
}
