"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const NAV_MENU = [
  {
    label: "Hàng Mới",
    href: "/collections/hang-moi",
    groups: [],
  },
  {
    label: "Thời Trang Nữ",
    href: "/collections/thoi-trang-nu",
    groups: [
      {
        title: "Áo & Khoác Nữ",
        links: [
          { label: "Blazer Quảng Châu", href: "/collections/thoi-trang-nu" },
          { label: "Áo Kiểu Voan Lụa", href: "/collections/thoi-trang-nu" },
          { label: "Set Len Thu Đông", href: "/collections/thoi-trang-nu" },
        ],
      },
      {
        title: "Unisex & Đồ Bộ",
        links: [
          { label: "Áo Thun & Sweater", href: "/collections/ao-thun" },
          { label: "Đồ Bộ Mặc Nhà", href: "/collections/bo-do" },
        ],
      },
    ],
  },
  {
    label: "Thời Trang Nam",
    href: "/collections/thoi-trang-nam",
    groups: [
      {
        title: "Áo Nam",
        links: [
          { label: "Áo Thun Cổ Tròn", href: "/collections/ao-thun" },
          { label: "Áo Thun Dài Tay", href: "/collections/ao-thun-dai-tay" },
          { label: "Áo Sweater Nỉ", href: "/collections/ao-sweater" },
        ],
      },
      {
        title: "Quần Nam",
        links: [
          { label: "Quần Dài Kaki", href: "/collections/quan-kaki" },
          { label: "Quần Jogger Nỉ", href: "/collections/quan-jogger" },
          { label: "Quần Short", href: "/collections/quan-short" },
        ],
      },
    ],
  },
  {
    label: "Đồ Bộ",
    href: "/collections/bo-do",
    groups: [],
  },
  {
    label: "Ưu Đãi",
    href: "/collections/gia-moi-moi-ngay",
    groups: [],
  },
];

export default function Header() {
  const { cartCount, favorites, openCart, openSearch } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="ma-announcement">
        <div className="ma-announcement-links">
          <Link href="/collections/thoi-trang-nu">Nữ Quảng Châu</Link>
          <Link href="/collections/thoi-trang-nam">Nam Quảng Châu</Link>
        </div>
        <span>Miễn phí giao hàng đơn từ 499.000đ — Kiểm tra hàng trước khi thanh toán</span>
        <Link href="/pages/lien-he" className="ma-announcement-right">
          Tư vấn sỉ &amp; lẻ
        </Link>
      </div>

      <header className="ma-header">
        <div className="ma-header-inner">
          <button
            type="button"
            className="ma-mobile-menu-btn"
            aria-label="Mở menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} strokeWidth={1.6} />
          </button>

          <Link href="/" className="ma-logo-wrap" aria-label="Shop Minh Anh - Trang chủ">
            <span className="ma-logo-title">MINH ANH</span>
            <span className="ma-logo-sub">Quảng Châu Nam Nữ</span>
          </Link>

          <nav className="ma-nav-desktop" aria-label="Menu chính">
            {NAV_MENU.map((item) => (
              <div key={item.label} className="ma-nav-item">
                <Link href={item.href} className="ma-nav-link">
                  {item.label}
                </Link>
                {item.groups.length > 0 && (
                  <div className="ma-mega">
                    {item.groups.map((grp) => (
                      <div key={grp.title} className="ma-mega-col">
                        <h4>{grp.title}</h4>
                        <ul>
                          {grp.links.map((lk) => (
                            <li key={lk.label}>
                              <Link href={lk.href}>{lk.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="ma-header-actions">
            <button
              type="button"
              className="ma-icon-btn"
              aria-label="Tìm kiếm"
              onClick={openSearch}
            >
              <Search size={19} strokeWidth={1.6} />
            </button>

            <Link
              href="/pages/trang-thai-don-hang"
              className="ma-icon-btn"
              aria-label="Đơn hàng của bạn"
            >
              <User size={19} strokeWidth={1.6} />
            </Link>

            <Link
              href="/pages/yeu-thich"
              className="ma-icon-btn"
              aria-label="Sản phẩm yêu thích"
            >
              <Heart size={19} strokeWidth={1.6} />
              {favorites.length > 0 && <span className="ma-badge">{favorites.length}</span>}
            </Link>

            <button
              type="button"
              className="ma-icon-btn"
              aria-label="Giỏ hàng"
              onClick={openCart}
            >
              <ShoppingBag size={19} strokeWidth={1.6} />
              <span className="ma-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="ma-mobile-drawer" role="dialog" aria-modal="true">
          <div className="ma-mobile-drawer-head">
            <span className="ma-logo-title" style={{ fontSize: 22 }}>
              MINH ANH
            </span>
            <button
              type="button"
              className="ma-icon-btn"
              aria-label="Đóng menu"
              onClick={() => setMobileOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          <ul className="ma-mobile-nav-list">
            {NAV_MENU.map((item) => (
              <li key={item.label} className="ma-mobile-nav-item">
                <Link href={item.href} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ma-mobile-nav-item">
              <Link href="/pages/yeu-thich" onClick={() => setMobileOpen(false)}>
                Sản phẩm yêu thích ({favorites.length})
              </Link>
            </li>
            <li className="ma-mobile-nav-item">
              <Link href="/pages/trang-thai-don-hang" onClick={() => setMobileOpen(false)}>
                Đơn hàng đã đặt
              </Link>
            </li>
            <li className="ma-mobile-nav-item">
              <Link href="/pages/lien-he" onClick={() => setMobileOpen(false)}>
                Liên hệ &amp; Đặt sỉ
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
