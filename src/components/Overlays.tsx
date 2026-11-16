"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MessageCircle, Search, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatMoney, getDiscountPercent, normalizeText } from "@/lib/format";
import type { Product } from "@/types/catalog";

function QuickViewContent({ product }: { product: Product }) {
  const { addToCart, closeQuickView, openCart, openSizeGuide } = useStore();
  const initialVariant =
    product.variants.find((v) => v.available) || product.variants[0];
  const [color, setColor] = useState(
    initialVariant?.color || product.colors[0] || ""
  );
  const [size, setSize] = useState(
    initialVariant?.size || product.sizes[0] || ""
  );
  const [qty, setQty] = useState(1);

  const selectedVariant = useMemo(() => {
    return (
      product.variants.find((v) => v.color === color && v.size === size) ||
      product.variants.find((v) => v.color === color) ||
      product.variants[0]
    );
  }, [product, color, size]);

  const activePhoto =
    product.images.find((im) => im.color === color)?.src ||
    selectedVariant?.image ||
    product.images[0]?.src ||
    "/assets/banners/hero-desktop-v1.webp";

  const price = selectedVariant?.price ?? product.price;
  const compare = selectedVariant?.compare ?? product.compare;
  const discount = getDiscountPercent(price, compare);
  const available = Boolean(selectedVariant?.available);

  const handleAdd = () => {
    if (!selectedVariant) return;
    const ok = addToCart(product.handle, selectedVariant.id, qty);
    if (ok) {
      closeQuickView();
      openCart();
    }
  };

  return (
    <div className="ma-product-detail" style={{ padding: 0, gap: 28 }}>
      <div>
        <Link href={`/products/${product.handle}`} onClick={closeQuickView}>
          <img
            src={activePhoto}
            alt={product.title}
            style={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "contain",
              background: "#fafafa",
            }}
          />
        </Link>
      </div>

      <div>
        <p className="ma-eyebrow">SHOP MINH ẢNH • QUẢNG CHÂU</p>
        <h2 style={{ fontSize: 20, margin: "0 0 12px", lineHeight: 1.4 }}>
          {product.title}
        </h2>

        <div className="ma-product-prices" style={{ margin: "12px 0" }}>
          <strong>{formatMoney(price)}</strong>
          {discount > 0 && <del>{formatMoney(compare)}</del>}
        </div>

        <p
          style={{
            fontSize: 12,
            color: available ? "#2e6b48" : "#a04444",
            marginBottom: 16,
          }}
        >
          {available ? "Còn hàng sẵn" : "Tạm hết lựa chọn này"}
        </p>

        {product.colors.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, margin: "0 0 8px" }}>
              Màu sắc: <strong>{color}</strong>
            </p>
            <div className="ma-colors">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`ma-color-btn ${c === color ? "active" : ""}`}
                  onClick={() => setColor(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.sizes.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 13 }}>
                Kích thước: <strong>{size}</strong>
              </span>
              <button
                type="button"
                onClick={openSizeGuide}
                style={{
                  background: "none",
                  border: 0,
                  textDecoration: "underline",
                  fontSize: 12,
                }}
              >
                Bảng quy đổi size
              </button>
            </div>
            <div className="ma-sizes">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`ma-size-btn ${s === size ? "active" : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 18 }}>
          <div className="ma-quantity">
            <button
              type="button"
              aria-label="Giảm số lượng"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span>{qty}</span>
            <button
              type="button"
              aria-label="Tăng số lượng"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="ma-button"
            style={{ flex: 1 }}
            disabled={!available}
            onClick={handleAdd}
          >
            THÊM VÀO GIỎ HÀNG
          </button>
        </div>

        <Link
          href={`/products/${product.handle}`}
          onClick={closeQuickView}
          style={{
            display: "inline-block",
            marginTop: 16,
            fontSize: 12,
            textDecoration: "underline",
          }}
        >
          Xem chi tiết sản phẩm ↗
        </Link>
      </div>
    </div>
  );
}

export default function Overlays() {
  const {
    products,
    cart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    closeCart,
    isSearchOpen,
    closeSearch,
    isSizeGuideOpen,
    closeSizeGuide,
    quickViewHandle,
    closeQuickView,
    toastMessage,
    updateCartQty,
    removeFromCart,
    getProduct,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
        closeSearch();
        closeSizeGuide();
        closeQuickView();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart, closeSearch, closeSizeGuide, closeQuickView]);

  const quickProduct = quickViewHandle ? getProduct(quickViewHandle) : undefined;

  const searchResults = useMemo(() => {
    const q = normalizeText(searchQuery.trim());
    if (!q) return [];
    return products
      .filter((p) =>
        normalizeText(`${p.title} ${p.type} ${p.sku}`).includes(q)
      )
      .slice(0, 8);
  }, [products, searchQuery]);

  return (
    <>
      {/* Quick View Modal */}
      {quickProduct && (
        <div className="ma-backdrop" onClick={closeQuickView}>
          <div
            className="ma-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ma-close-btn"
              aria-label="Đóng"
              onClick={closeQuickView}
            >
              <X size={20} />
            </button>
            <QuickViewContent product={quickProduct} />
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="ma-backdrop" onClick={closeSearch}>
          <div
            className="ma-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ma-close-btn"
              aria-label="Đóng tìm kiếm"
              onClick={closeSearch}
            >
              <X size={20} />
            </button>

            <p style={{ fontSize: 22, fontWeight: 600, margin: "0 0 18px" }}>
              Tìm kiếm sản phẩm Quảng Châu
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #222",
                paddingBottom: 10,
                gap: 10,
              }}
            >
              <Search size={20} />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập tên áo, quần, blazer, đồ bộ, mã SKU..."
                style={{
                  border: 0,
                  outline: "none",
                  width: "100%",
                  fontSize: 16,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 18,
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 11, color: "#888" }}>GỢI Ý:</span>
              {["Áo thun", "Blazer", "Jogger", "Đồ bộ", "Quần ống rộng"].map(
                (kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => setSearchQuery(kw)}
                    style={{
                      padding: "6px 12px",
                      border: "1px solid #ddd",
                      background: "#fff",
                      fontSize: 12,
                    }}
                  >
                    {kw}
                  </button>
                )
              )}
            </div>

            {searchQuery.trim() && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 14,
                  marginTop: 22,
                }}
              >
                {searchResults.length > 0 ? (
                  searchResults.map((p) => (
                    <Link
                      key={p.handle}
                      href={`/products/${p.handle}`}
                      onClick={closeSearch}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        padding: 8,
                        border: "1px solid #eee",
                      }}
                    >
                      <img
                        src={p.images[0]?.src}
                        alt={p.title}
                        style={{
                          width: 60,
                          height: 75,
                          objectFit: "cover",
                          background: "#fafafa",
                        }}
                      />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>
                          {p.title}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            marginTop: 4,
                            color: "#b42b2b",
                          }}
                        >
                          {formatMoney(p.price)}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p style={{ fontSize: 13, color: "#777" }}>
                    Không tìm thấy sản phẩm phù hợp với &ldquo;{searchQuery}&rdquo;.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="ma-backdrop" onClick={closeCart} style={{ padding: 0 }}>
          <aside
            className="ma-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Giỏ hàng"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ma-close-btn"
              aria-label="Đóng giỏ hàng"
              onClick={closeCart}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: 19, fontWeight: 600, margin: "4px 0 20px" }}>
              GIỎ HÀNG ({cartCount})
            </h2>

            <div style={{ flex: 1, overflowY: "auto" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 16px" }}>
                  <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
                    Giỏ hàng của bạn đang trống
                  </p>
                  <p style={{ fontSize: 13, color: "#777", marginBottom: 22 }}>
                    Khám phá ngay các mẫu quần áo Quảng Châu nam nữ mới về tại Shop Minh Anh.
                  </p>
                  <Link
                    href="/collections/hang-moi"
                    className="ma-button"
                    onClick={closeCart}
                  >
                    XEM HÀNG MỚI VỀ
                  </Link>
                </div>
              ) : (
                cart.map((item, idx) => {
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
                        gridTemplateColumns: "76px 1fr",
                        gap: 14,
                        padding: "16px 0",
                        borderBottom: "1px solid var(--ma-line)",
                      }}
                    >
                      <Link href={`/products/${p.handle}`} onClick={closeCart}>
                        <img
                          src={img}
                          alt={p.title}
                          style={{
                            width: 76,
                            height: 92,
                            objectFit: "cover",
                            background: "#fafafa",
                          }}
                        />
                      </Link>
                      <div>
                        <Link
                          href={`/products/${p.handle}`}
                          onClick={closeCart}
                          style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}
                        >
                          {p.title}
                        </Link>
                        <div style={{ fontSize: 11, color: "#777", margin: "6px 0" }}>
                          {v?.color || "Mặc định"} / {v?.size || "Freesize"}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>
                          {formatMoney(unitPrice)}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            marginTop: 10,
                          }}
                        >
                          <div className="ma-quantity" style={{ height: 32 }}>
                            <button
                              type="button"
                              onClick={() => updateCartQty(idx, -1)}
                              style={{ width: 28, fontSize: 14 }}
                            >
                              −
                            </button>
                            <span style={{ fontSize: 12 }}>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateCartQty(idx, 1)}
                              style={{ width: 28, fontSize: 14 }}
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
                              fontSize: 12,
                              color: "#777",
                              textDecoration: "underline",
                            }}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div
                style={{
                  borderTop: "1px solid var(--ma-line)",
                  paddingTop: 18,
                  marginTop: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 14,
                    fontSize: 15,
                  }}
                >
                  <span>Tạm tính</span>
                  <strong>{formatMoney(cartSubtotal)}</strong>
                </div>
                <div style={{ display: "grid", gap: 10 }}>
                  <Link
                    href="/checkout"
                    className="ma-button"
                    onClick={closeCart}
                  >
                    ĐẶT HÀNG NGAY ↗
                  </Link>
                  <Link
                    href="/cart"
                    className="ma-button ma-outline"
                    onClick={closeCart}
                  >
                    XEM GIỎ HÀNG CHI TIẾT
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="ma-backdrop" onClick={closeSizeGuide}>
          <div
            className="ma-modal"
            style={{ maxWidth: 680 }}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ma-close-btn"
              aria-label="Đóng bảng size"
              onClick={closeSizeGuide}
            >
              <X size={20} />
            </button>
            <h2 style={{ fontSize: 20, margin: "0 0 12px" }}>
              BẢNG QUY ĐỔI SIZE QUẢNG CHÂU (NAM &amp; NỮ)
            </h2>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
              Thông số mang tính tham khảo theo form chuẩn hàng Quảng Châu. Nếu thích mặc
              rộng thoải mái (oversize), bạn có thể tăng thêm 1 size.
            </p>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
                marginTop: 16,
              }}
            >
              <thead>
                <tr style={{ background: "#f5f3ef" }}>
                  <th style={{ border: "1px solid #ddd", padding: 10 }}>Size</th>
                  <th style={{ border: "1px solid #ddd", padding: 10 }}>Nữ (Chiều cao / Cân nặng)</th>
                  <th style={{ border: "1px solid #ddd", padding: 10 }}>Nam (Chiều cao / Cân nặng)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 10, fontWeight: 600 }}>S</td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>1m50 – 1m58 / 40 – 47kg</td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>1m60 – 1m67 / 48 – 56kg</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 10, fontWeight: 600 }}>M</td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>1m56 – 1m64 / 48 – 54kg</td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>1m65 – 1m72 / 57 – 64kg</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 10, fontWeight: 600 }}>L</td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>1m60 – 1m68 / 55 – 62kg</td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>1m70 – 1m77 / 65 – 73kg</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 10, fontWeight: 600 }}>XL</td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>1m65 – 1m72 / 63 – 70kg</td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>1m75 – 1m82 / 74 – 82kg</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 10, fontWeight: 600 }}>2XL</td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>Trên 70kg</td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>1m78 – 1m88 / 83 – 92kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Floating Contact Button */}
      <Link href="/pages/lien-he" className="ma-contact-float" aria-label="Liên hệ Shop Minh Anh">
        <MessageCircle size={18} />
        <span>LIÊN HỆ</span>
      </Link>

      {/* Toast */}
      {toastMessage && (
        <div className="ma-toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </>
  );
}
