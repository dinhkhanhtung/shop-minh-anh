"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const NAV_ITEMS = [
  {
    label: "Thời Trang Nam",
    href: "/collections/thoi-trang-nam",
    groups: [
      {
        title: "Áo Nam Quảng Châu",
        links: [
          { label: "Áo Thun Nam", href: "/collections/ao-thun" },
          { label: "Áo Thun Dài Tay", href: "/collections/ao-thun-dai-tay" },
          { label: "Áo Sweater & Nỉ", href: "/collections/ao-sweater" },
        ],
      },
      {
        title: "Quần Nam Quảng Châu",
        links: [
          { label: "Quần Dài Kaki", href: "/collections/quan-kaki" },
          { label: "Quần Jogger Thể Thao", href: "/collections/quan-jogger" },
          { label: "Quần Short Nam", href: "/collections/quan-short" },
        ],
      },
    ],
  },
  {
    label: "Thời Trang Nữ",
    href: "/collections/thoi-trang-nu",
    groups: [
      {
        title: "Áo & Set Nữ",
        links: [
          { label: "Blazer & Áo Khoác Nữ", href: "/collections/thoi-trang-nu" },
          { label: "Áo Kiểu & Sơ Mi Nữ", href: "/collections/thoi-trang-nu" },
          { label: "Set Bộ Len & Công Sở", href: "/collections/thoi-trang-nu" },
        ],
      },
      {
        title: "Quần & Unisex",
        links: [
          { label: "Quần Ống Rộng Nữ", href: "/collections/thoi-trang-nu" },
          { label: "Đồ Bộ Unisex", href: "/collections/bo-do" },
          { label: "Tất Cả Đồ Nữ", href: "/collections/thoi-trang-nu" },
        ],
      },
    ],
  },
  {
    label: "Đồ Bộ & Set",
    href: "/collections/bo-do",
    groups: [
      {
        title: "Phối Sẵn Tiện Lợi",
        links: [
          { label: "Đồ Bộ Thể Thao", href: "/collections/bo-do" },
          { label: "Combo Tiết Kiệm", href: "/collections/combo" },
        ],
      },
    ],
  },
  {
    label: "Hàng Mới Về",
    href: "/collections/hang-moi",
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
          <Link href="/collections/thoi-trang-nam">QUẦN ÁO NAM</Link>
          <Link href="/collections/thoi-trang-nu">QUẦN ÁO NỮ</Link>
          <Link href="/collections/hang-moi">HÀNG QUẢNG CHÂU MỚI</Link>
        </div>
        <span>MIỄN PHÍ GIAO HÀNG ĐƠN TỪ 499.000Đ — KIỂM TRA HÀNG TRƯỚC KHI THANH TOÁN</span>
        <Link href="/pages/lien-he" className="ma-announcement-right">
          TƯ VẤN SỈ &amp; LẺ
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
            <Menu size={22} />
          </button>

          <nav className="ma-nav-desktop" aria-label="Menu chính">
            {NAV_ITEMS.map((item) => (
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

          <Link href="/" className="ma-logo-wrap" aria-label="Shop Minh Ảnh - Trang chủ">
            <span className="ma-logo-title">MINH ẢNH</span>
            <span className="ma-logo-sub">QUẢNG CHÂU NAM NỮ</span>
          </Link>

          <div className="ma-header-actions">
            <button
              type="button"
              className="ma-icon-btn"
              aria-label="Tìm kiếm sản phẩm"
              onClick={openSearch}
            >
              <Search size={20} strokeWidth={1.75} />
            </button>

            <Link
              href="/pages/yeu-thich"
              className="ma-icon-btn"
              aria-label="Sản phẩm yêu thích"
            >
              <Heart size={20} strokeWidth={1.75} />
              {favorites.length > 0 && (
                <span className="ma-badge">{favorites.length}</span>
              )}
            </Link>

            <button
              type="button"
              className="ma-icon-btn"
              aria-label="Giỏ hàng"
              onClick={openCart}
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="ma-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="ma-mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu di động">
          <div className="ma-mobile-drawer-head">
            <span className="ma-logo-title" style={{ fontSize: 18 }}>
              SHOP MINH ẢNH
            </span>
            <button
              type="button"
              className="ma-icon-btn"
              aria-label="Đóng menu"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <ul className="ma-mobile-nav-list">
            {NAV_ITEMS.map((item) => (
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
                Đơn hàng đã lưu
              </Link>
            </li>
            <li className="ma-mobile-nav-item">
              <Link href="/pages/lien-he" onClick={() => setMobileOpen(false)}>
                Liên hệ &amp; Đặt sỉ Quảng Châu
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
