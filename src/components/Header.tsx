"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

const NAV_MENU = [
  {
    label: "Thời Trang Nam",
    href: "/collections/thoi-trang-nam",
    children: [
      { label: "Áo thun", href: "/collections/ao-thun" },
      { label: "Áo thun dài tay", href: "/collections/ao-thun-dai-tay" },
      { label: "Áo sweater", href: "/collections/ao-sweater" },
      { label: "Quần jogger", href: "/collections/quan-jogger" },
      { label: "Quần dài kaki", href: "/collections/quan-kaki" },
      { label: "Quần short", href: "/collections/quan-short" },
    ],
  },
  {
    label: "Thời Trang Nữ",
    href: "/collections/thoi-trang-nu",
    children: [
      { label: "Blazer & Áo khoác", href: "/collections/thoi-trang-nu" },
      { label: "Áo kiểu Quảng Châu", href: "/collections/thoi-trang-nu" },
      { label: "Set bộ thu đông", href: "/collections/thoi-trang-nu" },
      { label: "Đồ Unisex nam nữ", href: "/collections/bo-do" },
    ],
  },
  {
    label: "Đồ Bộ",
    href: "/collections/bo-do",
    children: [
      { label: "Đồ bộ Quảng Châu", href: "/collections/bo-do" },
      { label: "Combo tiết kiệm", href: "/collections/combo" },
    ],
  },
  {
    label: "Hàng Mới",
    href: "/collections/hang-moi",
    children: [],
  },
  {
    label: "Ưu Đãi",
    href: "/collections/gia-moi-moi-ngay",
    children: [],
  },
];

export default function Header() {
  const { cartCount, favorites, openCart, openSearch } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  useEffect(() => {
    document.body.classList.toggle("md-menu-open", mobileOpen);
    return () => {
      document.body.classList.remove("md-menu-open");
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="md-announcement" id="topbar">
        <span>SHOP MINH ẢNH — QUẦN ÁO QUẢNG CHÂU NAM NỮ</span>
        <Link className="md-announcement-categories" href="/collections/all">
          NAM · NỮ · ÁO THUN · BLAZER · JOGGER · ĐỒ BỘ
        </Link>
        <Link href="/collections/all">KHÁM PHÁ SẢN PHẨM</Link>
      </div>

      <header className="mainHeader" id="mainHeader">
        <div className="mainHeader-top">
          <div className="container-fluid">
            <div className="mainHeader-top--wrapper">
              <div className="mainHeader-top--space" />

              <div className="mainHeader-top--logo">
                <Link href="/" className="ma-brand-mark" aria-label="Shop Minh Ảnh">
                  <strong>MINH ẢNH</strong>
                  <small>QUẢNG CHÂU NAM NỮ</small>
                </Link>
              </div>

              <div className="mainHeader-top--actions">
                <div className="header-actions-list">
                  <ul>
                    <li className="action-search">
                      <a
                        aria-label="Tìm kiếm sản phẩm"
                        className="btn-search-show"
                        href="#search"
                        id="js-click-search"
                        onClick={(e) => {
                          e.preventDefault();
                          openSearch();
                        }}
                      >
                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
                          <path
                            d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                            stroke="#262626"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </a>
                    </li>

                    <li className="action-account">
                      <Link aria-label="Đơn hàng của bạn" href="/pages/trang-thai-don-hang">
                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
                          <path
                            d="M16.6667 17.5C16.6667 16.337 16.6667 15.7555 16.5232 15.2824C16.2 14.217 15.3663 13.3834 14.301 13.0602C13.8278 12.9167 13.2463 12.9167 12.0834 12.9167H7.91671C6.75374 12.9167 6.17225 12.9167 5.69909 13.0602C4.63375 13.3834 3.80007 14.217 3.47691 15.2824C3.33337 15.7555 3.33337 16.337 3.33337 17.5M13.75 6.25C13.75 8.32107 12.0711 10 10 10C7.92897 10 6.25004 8.32107 6.25004 6.25C6.25004 4.17893 7.92897 2.5 10 2.5C12.0711 2.5 13.75 4.17893 13.75 6.25Z"
                            stroke="#262626"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </Link>
                    </li>

                    <li className="action-wishlist">
                      <Link aria-label="Sản phẩm yêu thích" href="/pages/yeu-thich">
                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
                          <path
                            d="M10.0001 17.5C10.0001 17.5 2.50008 13.3333 2.50008 7.5C2.50008 5.20833 4.37508 3.33333 6.66675 3.33333C8.08341 3.33333 9.33341 4.04167 10.0001 5.125C10.6667 4.04167 11.9167 3.33333 13.3334 3.33333C15.6251 3.33333 17.5001 5.20833 17.5001 7.5C17.5001 13.3333 10.0001 17.5 10.0001 17.5Z"
                            stroke="#262626"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <div className="hasitem">
                          <span>{favorites.length}</span>
                        </div>
                      </Link>
                    </li>

                    <li className="action-cart">
                      <a
                        aria-label="Giỏ hàng"
                        href="#cart"
                        id="js-click-cartmini"
                        onClick={(e) => {
                          e.preventDefault();
                          openCart();
                        }}
                      >
                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
                          <path
                            d="M6.66667 5.83333V5C6.66667 3.15905 8.15905 1.66667 10 1.66667C11.841 1.66667 13.3333 3.15905 13.3333 5V5.83333M3.33333 5.83333H16.6667L17.5 17.5H2.5L3.33333 5.83333Z"
                            stroke="#262626"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <div className="hasitem">
                          <span>{cartCount}</span>
                        </div>
                      </a>
                    </li>

                    <li className="action-menu d-lg-none">
                      <a
                        aria-label="Mở danh mục"
                        href="#menu"
                        id="js-click-menu"
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileOpen(true);
                        }}
                      >
                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
                          <path
                            d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5"
                            stroke="#262626"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.6"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mainHeader-bottom">
          <div className="container-fluid">
            <div className="mainHeader-bottom--wrapper">
              <div className="mainHeader-bottom--mobile">
                <div className="header-menu--head">
                  <div className="header-menu--logo">
                    <Link
                      href="/"
                      className="ma-brand-mark"
                      onClick={() => setMobileOpen(false)}
                    >
                      <strong>MINH ẢNH</strong>
                      <small>QUẢNG CHÂU NAM NỮ</small>
                    </Link>
                  </div>
                  <div className="header-menu--btn">
                    <div className="close-button">
                      <button
                        aria-label="Close Menu"
                        type="button"
                        onClick={() => setMobileOpen(false)}
                      >
                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
                          <path
                            d="M15 5L5 15M5 5L15 15"
                            stroke="#3D3D3D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.66667"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mainHeader-bottom--left">
                <div className="header-menu">
                  {/* Desktop Nav */}
                  <div className="header-menu--nav desktop">
                    <ul className="header-menu--list">
                      {NAV_MENU.map((item) => (
                        <li
                          key={item.label}
                          className={`header-menu--list-item ${
                            item.children.length > 0 ? "has-child" : ""
                          }`}
                        >
                          <Link href={item.href}>
                            <span>{item.label}</span>
                          </Link>
                          {item.children.length > 0 && (
                            <div className="header-menu--mega">
                              <div className="header-menu--mega-wrapper">
                                <ul className="header-menu--mega-list">
                                  {item.children.map((ch) => (
                                    <li key={ch.label} className="header-menu--mega-item">
                                      <Link href={ch.href}>{ch.label}</Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mobile Nav */}
                  <div className="header-menu--nav mobile">
                    <ul className="header-menu--list">
                      {NAV_MENU.map((item, idx) => {
                        const isExpanded = expandedIdx === idx;
                        return (
                          <li
                            key={item.label}
                            className={`header-menu--list-item ${
                              item.children.length > 0 ? "has-child" : ""
                            } ${isExpanded ? "md-expanded" : ""}`}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                            >
                              <span>{item.label}</span>
                            </Link>
                            {item.children.length > 0 && (
                              <>
                                <button
                                  type="button"
                                  className="open_child"
                                  aria-label={`Mở danh mục ${item.label}`}
                                  aria-expanded={isExpanded}
                                  onClick={() =>
                                    setExpandedIdx(isExpanded ? null : idx)
                                  }
                                />
                                <div className="header-menu--mega">
                                  <div className="header-menu--mega-wrapper">
                                    <ul className="header-menu--mega-list">
                                      {item.children.map((ch) => (
                                        <li
                                          key={ch.label}
                                          className="header-menu--mega-item"
                                        >
                                          <Link
                                            href={ch.href}
                                            onClick={() => setMobileOpen(false)}
                                          >
                                            {ch.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
