"use client";

import React from "react";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
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
      <div className="ma-card-head">
        <Link href={`/products/${product.handle}`} className="ma-card-photo">
          <img
            src={firstImg}
            alt={product.title}
            loading="lazy"
            width={600}
            height={600}
          />
          {secondImg !== firstImg && (
            <img
              src={secondImg}
              alt=""
              className="ma-card-hover-photo"
              loading="lazy"
              width={600}
              height={600}
            />
          )}
        </Link>

        <button
          type="button"
          className={`ma-card-wish ${isLiked ? "liked" : ""}`}
          aria-label={`Yêu thích ${product.title}`}
          aria-pressed={isLiked}
          onClick={() => toggleFavorite(product.handle)}
        >
          <Heart size={16} fill={isLiked ? "#9e3636" : "none"} />
        </button>

        <button
          type="button"
          className="ma-card-quick"
          aria-label={`Xem nhanh ${product.title}`}
          onClick={() => openQuickView(product.handle)}
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="ma-card-body">
        <div className="ma-card-vendor">
          {product.gender === "nu"
            ? "MINH ẢNH NỮ • QUẢNG CHÂU"
            : product.gender === "unisex"
            ? "MINH ẢNH UNISEX • QUẢNG CHÂU"
            : "MINH ẢNH NAM • QUẢNG CHÂU"}
        </div>

        <h3 className="ma-card-title">
          <Link href={`/products/${product.handle}`}>{product.title}</Link>
        </h3>

        <div className="ma-card-prices">
          <span className={`ma-price-now ${discount > 0 ? "highlight" : ""}`}>
            {formatMoney(product.price)}
          </span>
          {discount > 0 && (
            <>
              <del className="ma-price-old">{formatMoney(product.compare)}</del>
              <span className="ma-price-off">-{discount}%</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
