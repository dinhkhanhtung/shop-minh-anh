"use client";

import React from "react";
import Link from "next/link";
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
    <article className="pro-loop" data-product={product.handle}>
      <div className="pro-loop--wrap">
        <div className="pro-loop--head">
          <div className="pro-loop--img">
            <Link href={`/products/${product.handle}`} className="md-card-photo">
              <img
                src={firstImg}
                alt={product.title}
                loading="lazy"
                width={600}
                height={800}
              />
              <img
                className="md-hover-photo"
                src={secondImg}
                alt=""
                loading="lazy"
                width={600}
                height={800}
              />
            </Link>
          </div>
          <div className="pro-loop--wishlist">
            <button
              type="button"
              className={`btn-wishlist md-wish ${isLiked ? "md-liked" : ""}`}
              aria-label={`Yêu thích ${product.title}`}
              aria-pressed={isLiked}
              onClick={() => toggleFavorite(product.handle)}
            >
              {isLiked ? "♥" : "♡"}
            </button>
          </div>
          <div className="pro-loop--buttons">
            <button
              type="button"
              className="pro-action md-quick"
              aria-label={`Xem nhanh ${product.title}`}
              onClick={() => openQuickView(product.handle)}
            >
              ＋
            </button>
          </div>
        </div>

        <div className="pro-loop--body">
          <div className="pro-loop--vendor">
            {product.gender === "nu"
              ? "SHOP MINH ẢNH • NỮ"
              : product.gender === "unisex"
              ? "SHOP MINH ẢNH • NAM NỮ"
              : "SHOP MINH ẢNH"}
          </div>
          <h3 className="pro-loop--title">
            <Link href={`/products/${product.handle}`}>{product.title}</Link>
          </h3>
          <div className="pro-loop--prices">
            <div className="price">
              <span className={discount > 0 ? "hightlight" : ""}>
                {formatMoney(product.price)}
              </span>
              {discount > 0 && <del>{formatMoney(product.compare)}</del>}
            </div>
            {discount > 0 && (
              <div className="percent">
                <span>{discount}% off</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
