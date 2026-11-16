"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Heart, CheckCircle2, RefreshCw, Truck } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatMoney, getDiscountPercent } from "@/lib/format";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams<{ handle: string }>();
  const router = useRouter();
  const {
    products,
    getProduct,
    addToCart,
    openCart,
    openSizeGuide,
    favorites,
    toggleFavorite,
  } = useStore();

  const product = getProduct(params?.handle || "");

  const initialVariant = useMemo(
    () => product?.variants.find((v) => v.available) || product?.variants[0],
    [product]
  );

  const [color, setColor] = useState(
    initialVariant?.color || product?.colors[0] || ""
  );
  const [size, setSize] = useState(
    initialVariant?.size || product?.sizes[0] || ""
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="ma-container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h1>Không tìm thấy sản phẩm</h1>
        <p style={{ color: "#777", marginBottom: 24 }}>
          Sản phẩm này có thể đã hết hàng hoặc được chuyển sang bộ sưu tập mới.
        </p>
        <Link href="/collections/all" className="ma-button">
          QUAY LẠI CỬA HÀNG
        </Link>
      </div>
    );
  }

  const selectedVariant =
    product.variants.find((v) => v.color === color && v.size === size) ||
    product.variants.find((v) => v.color === color) ||
    product.variants[0];

  const mainImage =
    product.images[activeImageIndex]?.src ||
    product.images[0]?.src ||
    "/assets/banners/hero-desktop-v1.webp";

  const price = selectedVariant?.price ?? product.price;
  const compare = selectedVariant?.compare ?? product.compare;
  const discount = getDiscountPercent(price, compare);
  const available = Boolean(selectedVariant?.available);
  const isLiked = favorites.includes(product.handle);

  const related = products
    .filter((p) => p.handle !== product.handle && (p.gender === product.gender || p.type === product.type))
    .slice(0, 4);

  const handleAdd = (buyNow = false) => {
    if (!selectedVariant) return;
    const ok = addToCart(product.handle, selectedVariant.id, qty);
    if (ok) {
      if (buyNow) {
        router.push("/checkout");
      } else {
        openCart();
      }
    }
  };

  return (
    <div className="ma-container">
      <div className="ma-crumbs">
        <Link href="/">Trang chủ</Link>
        <span>/</span>
        <Link
          href={
            product.gender === "nu"
              ? "/collections/thoi-trang-nu"
              : "/collections/thoi-trang-nam"
          }
        >
          {product.gender === "nu" ? "Thời trang Nữ" : "Thời trang Nam"}
        </Link>
        <span>/</span>
        <span>{product.title}</span>
      </div>

      <div className="ma-product-detail">
        <div className="ma-product-gallery">
          {product.images.length > 1 && (
            <div className="ma-product-thumbs">
              {product.images.map((im, idx) => (
                <button
                  key={`${im.src}-${idx}`}
                  type="button"
                  className={idx === activeImageIndex ? "active" : ""}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={im.src} alt={`${product.title} ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}

          <div className="ma-main-photo">
            <img src={mainImage} alt={product.title} />
          </div>
        </div>

        <div className="ma-product-info">
          <p className="ma-eyebrow">
            SHOP MINH ẢNH • HÀNG QUẢNG CHÂU LOẠI 1
          </p>
          <h1>{product.title}</h1>
          <div style={{ fontSize: 12, color: "#777" }}>Mã SKU: {product.sku}</div>

          <div className="ma-product-prices">
            <strong>{formatMoney(price)}</strong>
            {discount > 0 && (
              <>
                <del>{formatMoney(compare)}</del>
                <span
                  style={{
                    background: "#b42b2b",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 8px",
                  }}
                >
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p
            style={{
              fontSize: 12,
              color: available ? "#2e6b48" : "#a04444",
              marginBottom: 22,
            }}
          >
            {available ? "Còn hàng — Sẵn sàng giao toàn quốc" : "Tạm hết hàng"}
          </p>

          {product.colors.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <p style={{ fontSize: 13, margin: "0 0 10px" }}>
                Màu sắc: <strong>{color}</strong>
              </p>
              <div className="ma-colors">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`ma-color-btn ${c === color ? "active" : ""}`}
                    onClick={() => {
                      setColor(c);
                      const imgIdx = product.images.findIndex((i) => i.color === c);
                      if (imgIdx >= 0) setActiveImageIndex(imgIdx);
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
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
                  Hướng dẫn chọn size
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

          <div>
            <p style={{ fontSize: 13, margin: "0 0 8px" }}>Số lượng</p>
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
          </div>

          <div className="ma-product-actions">
            <button
              type="button"
              className="ma-button ma-outline"
              disabled={!available}
              onClick={() => handleAdd(false)}
            >
              THÊM VÀO GIỎ
            </button>
            <button
              type="button"
              className="ma-button"
              disabled={!available}
              onClick={() => handleAdd(true)}
            >
              MUA NGAY
            </button>
            <button
              type="button"
              aria-label="Yêu thích"
              onClick={() => toggleFavorite(product.handle)}
              style={{
                border: "1px solid #111",
                background: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Heart
                size={18}
                color={isLiked ? "#9e3636" : "#111"}
                fill={isLiked ? "#9e3636" : "none"}
              />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              fontSize: 12,
              margin: "28px 0",
              padding: "16px 0",
              borderTop: "1px solid var(--ma-line)",
              borderBottom: "1px solid var(--ma-line)",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <CheckCircle2 size={15} color="#283e32" /> Hàng Quảng Châu loại 1
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Truck size={15} color="#283e32" /> Kiểm tra hàng trước khi trả tiền
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <RefreshCw size={15} color="#283e32" /> Đổi size trong 7 ngày
            </span>
          </div>

          <details open style={{ borderBottom: "1px solid var(--ma-line)", padding: "14px 0" }}>
            <summary style={{ fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Mô tả chi tiết sản phẩm
            </summary>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#444", marginTop: 12 }}>
              {product.description ||
                `${product.title} — Tuyển chọn trực tiếp từ xưởng Quảng Châu cao cấp, đường may chắc chắn, chất vải thoáng mát giữ form tốt sau nhiều lần giặt. Phù hợp mặc đi làm, dạo phố hoặc làm quà tặng.`}
            </p>
          </details>
        </div>
      </div>

      {related.length > 0 && (
        <section style={{ paddingBottom: 60 }}>
          <div className="ma-section-heading">
            <h2>SẢN PHẨM TƯƠNG TỰ</h2>
            <Link href="/collections/all" className="ma-more-link">
              Xem thêm ↗
            </Link>
          </div>
          <div className="ma-grid-4">
            {related.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
