"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { formatMoney } from "@/lib/format";

export default function CartPage() {
  const { cart, cartSubtotal, updateCartQty, removeFromCart, getProduct } =
    useStore();

  return (
    <div className="ma-container" style={{ paddingBottom: 70, minHeight: "60vh" }}>
      <div className="ma-crumbs">
        <Link href="/">Trang chủ</Link>
        <span>/</span>
        <span>Giỏ hàng</span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 600, margin: "10px 0 30px" }}>
        GIỎ HÀNG CỦA BẠN
      </h1>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2 style={{ fontSize: 22, marginBottom: 10 }}>
            Giỏ hàng của bạn đang trống
          </h2>
          <p style={{ color: "#777", marginBottom: 24 }}>
            Hãy chọn cho mình những bộ trang phục Quảng Châu ưng ý nhất nhé.
          </p>
          <Link href="/collections/all" className="ma-button">
            TIẾP TỤC MUA SẮM ↗
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.6fr) minmax(280px, 1fr)",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div>
            {cart.map((item, idx) => {
              const p = getProduct(item.handle);
              if (!p) return null;
              const v = p.variants.find((vr) => vr.id === item.variantId);
              const img =
                p.images.find((im) => im.color === v?.color)?.src ||
                p.images[0]?.src;
              const unitPrice = v?.price ?? p.price;

              return (
                <div
                  key={`${item.handle}-${item.variantId}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "90px 1fr auto",
                    gap: 18,
                    padding: "20px 0",
                    borderBottom: "1px solid var(--ma-line)",
                    alignItems: "center",
                  }}
                >
                  <Link href={`/products/${p.handle}`}>
                    <img
                      src={img}
                      alt={p.title}
                      style={{ width: 90, height: 110, objectFit: "cover", background: "#fafafa" }}
                    />
                  </Link>
                  <div>
                    <Link
                      href={`/products/${p.handle}`}
                      style={{ fontSize: 14, fontWeight: 600 }}
                    >
                      {p.title}
                    </Link>
                    <p style={{ fontSize: 12, color: "#777", margin: "6px 0" }}>
                      {v?.color || "Mặc định"} / {v?.size || "Freesize"}
                    </p>
                    <strong style={{ fontSize: 14 }}>
                      {formatMoney(unitPrice)}
                    </strong>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginTop: 12,
                      }}
                    >
                      <div className="ma-quantity" style={{ height: 34 }}>
                        <button
                          type="button"
                          onClick={() => updateCartQty(idx, -1)}
                          style={{ width: 30, fontSize: 15 }}
                        >
                          −
                        </button>
                        <span style={{ fontSize: 13 }}>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQty(idx, 1)}
                          style={{ width: 30, fontSize: 15 }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(idx)}
                        style={{
                          background: "none",
                          border: 0,
                          textDecoration: "underline",
                          fontSize: 12,
                          color: "#777",
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                  <strong style={{ fontSize: 15 }}>
                    {formatMoney(unitPrice * item.quantity)}
                  </strong>
                </div>
              );
            })}

            <Link
              href="/collections/all"
              style={{ display: "inline-block", marginTop: 24, fontSize: 13 }}
            >
              ← Tiếp tục mua sắm
            </Link>
          </div>

          <aside
            style={{
              background: "var(--ma-paper)",
              padding: 28,
              border: "1px solid var(--ma-line)",
            }}
          >
            <h2 style={{ fontSize: 17, margin: "0 0 20px" }}>
              THÔNG TIN ĐƠN HÀNG
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid var(--ma-line)",
              }}
            >
              <span>Tạm tính</span>
              <strong>{formatMoney(cartSubtotal)}</strong>
            </div>
            <p style={{ fontSize: 12, color: "#777", lineHeight: 1.6, margin: "14px 0" }}>
              Miễn phí giao hàng toàn quốc cho đơn từ 499.000đ. Kiểm tra hàng trước khi
              thanh toán.
            </p>
            <Link href="/checkout" className="ma-button" style={{ width: "100%" }}>
              TIẾP TỤC ĐẶT HÀNG ↗
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
