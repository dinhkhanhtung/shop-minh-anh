"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatMoney, getDiscountPercent } from "@/lib/format";
import type { Product } from "@/types/catalog";

export default function ProductCard({ product }: { product: Product }) {
  const { favorites, toggleFavorite, openQuickView } = useStore();
  const isLiked = favorites.includes(product.handle);
  const discount = getDiscountPercent(product.price, product.compare);
  const firstImg = product.images[0]?.src || "/assets/banners/hero-desktop-v1.webp";
  const secondImg = product.images[1]?.src || firstImg;

  return (
    <article className="ma-product-card">
      <div className="ma-card-media">
        <Link href={`/products/${product.handle}`} style={{ display: "block", width: "100%", height: "100%" }}>
          <img
            src={firstImg}
            alt={product.title}
            className="ma-card-img-main"
            loading="lazy"
          />
          {secondImg !== firstImg && (
            <img
              src={secondImg}
              alt=""
              className="ma-card-img-hover"
              loading="lazy"
            />
          )}
        </Link>

        {discount > 0 && <span className="ma-card-sale-tag">-{discount}%</span>}

        <div className="ma-card-actions">
          <button
            type="button"
            className={`ma-card-circle-btn ${isLiked ? "liked" : ""}`}
            aria-label={`Yêu thích ${product.title}`}
            onClick={() => toggleFavorite(product.handle)}
          >
            <Heart size={15} strokeWidth={1.6} fill={isLiked ? "#9e3636" : "none"} />
          </button>
        </div>

        <button
          type="button"
          className="ma-card-quickbar"
          onClick={() => openQuickView(product.handle)}
        >
          Xem nhanh
        </button>
      </div>

      <div className="ma-card-body">
        <div className="ma-card-meta">
          {product.gender === "nu"
            ? "Minh Anh Nữ"
            : product.gender === "unisex"
            ? "Minh Anh Unisex"
            : "Minh Anh Nam"}
        </div>
        <h3 className="ma-card-title">
          <Link href={`/products/${product.handle}`}>{product.title}</Link>
        </h3>
        <div className="ma-card-prices">
          <span className={`ma-price-now ${discount > 0 ? "sale" : ""}`}>
            {formatMoney(product.price)}
          </span>
          {discount > 0 && (
            <del className="ma-price-old">{formatMoney(product.compare)}</del>
          )}
        </div>
      </div>
    </article>
  );
}
