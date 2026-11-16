"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const { products } = useStore();

  const flashSaleProducts = products
    .filter((p) => p.compare > p.price)
    .slice(0, 10);

  const newCollectionProducts = products.slice(0, 20);

  return (
    <>
      {/* 1. Hero Campaign */}
      <section aria-labelledby="md-campaign-title" className="md-campaign-hero">
        <picture className="md-campaign-photo">
          <source media="(max-width:767px)" srcSet="/assets/banners/hero-mobile-v1.webp" />
          <img
            alt="Shop Minh Ảnh - Thời trang Quảng Châu Nam Nữ"
            fetchPriority="high"
            height={793}
            src="/assets/banners/hero-desktop-v1.webp"
            width={1983}
          />
        </picture>
        <div className="md-campaign-copy">
          <h1 id="md-campaign-title">
            <span>THOẢI MÁI</span>
            <span>THEO CÁCH</span>
            <span>CỦA BẠN.</span>
          </h1>
          <p>Quần áo Quảng Châu Nam Nữ tuyển chọn cho nhịp sống mỗi ngày.</p>
          <Link className="md-campaign-cta" href="/collections/all">
            <span>KHÁM PHÁ NGAY</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 32 20">
              <path d="M1 10h28M20 2l9 8-9 8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </section>

      {/* 2. Category Bar */}
      <nav aria-label="Khám phá trang phục" className="md-category-bar">
        <Link href="/collections/thoi-trang-nu">Đồ Nữ</Link>
        <Link href="/collections/thoi-trang-nam">Đồ Nam</Link>
        <Link href="/collections/ao-thun">Áo thun</Link>
        <Link href="/collections/ao-sweater">Sweater</Link>
        <Link href="/collections/quan-jogger">Jogger</Link>
        <Link href="/collections/bo-do">Đồ bộ</Link>
      </nav>

      {/* 3. Flash Sale */}
      <section className="section section-flashsale-home">
        <div className="container-fluid pd-0">
          <div className="wrap--flashsale">
            <div className="wrapper-content">
              <div className="section-heading">
                <div className="box-left">
                  <div className="box-countdown">
                    <div id="flashsale-countdown">
                      <span className="md-offer-label">ƯU ĐÃI BỘ SƯU TẬP</span>
                    </div>
                  </div>
                  <div className="box-header">
                    <h2 className="hTitle">
                      <Link href="/collections/gia-moi-moi-ngay">ƯU ĐÃI ONLINE</Link>
                    </h2>
                  </div>
                </div>
                <div className="box-right">
                  <div className="box-link">
                    <Link className="button-more" href="/collections/gia-moi-moi-ngay">
                      Xem chi tiết{" "}
                      <svg fill="none" viewBox="0 0 8 10">
                        <path
                          d="M0.768 9.94307C0.848883 9.98514 0.939696 10.0044 1.03069 9.99876C1.12169 9.99312 1.20943 9.96281 1.2845 9.91107L7.7845 5.41107C7.85092 5.36506 7.9052 5.30363 7.94269 5.23205C7.98017 5.16047 7.99976 5.08088 7.99976 5.00007C7.99976 4.91926 7.98017 4.83967 7.94269 4.76809C7.9052 4.6965 7.85092 4.63508 7.7845 4.58907L1.2845 0.0890696C1.20943 0.0373332 1.12169 0.00702096 1.03069 0.0013811C0.939696 -0.00425877 0.848883 0.015 0.768 0.0570696C0.688995 0.0987729 0.622854 0.161072 0.576711 0.237245C0.530567 0.313418 0.506165 0.400592 0.506104 0.48932L0.506104 9.51082C0.506165 9.59955 0.530567 9.68672 0.576711 9.76289C0.622854 9.83907 0.688995 9.90137 0.768 9.94307Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="list-product">
                <Swiper
                  modules={[Navigation]}
                  navigation
                  slidesPerView={2}
                  spaceBetween={12}
                  breakpoints={{
                    768: { slidesPerView: 3, spaceBetween: 16 },
                    1100: { slidesPerView: 4, spaceBetween: 16 },
                  }}
                >
                  {flashSaleProducts.map((p) => (
                    <SwiperSlide key={p.handle}>
                      <ProductCard product={p} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Campaign Categories */}
      <section aria-labelledby="md-categories-title" className="md-campaign-categories">
        <h2 id="md-categories-title">MẶC GÌ HÔM NAY?</h2>
        <div className="md-campaign-category-grid">
          <Link className="md-campaign-category" href="/collections/ao-thun">
            <div className="md-campaign-category-photo">
              <img
                alt="Áo thun và sweater"
                height={1402}
                loading="lazy"
                src="/assets/banners/category-tops-v1.webp"
                width={1122}
              />
            </div>
            <div className="md-campaign-category-label">
              <h3>ÁO THUN &amp; SWEATER</h3>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path d="M4 20 20 4M5 4h15v15" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>
          </Link>

          <Link className="md-campaign-category" href="/collections/quan-jogger">
            <div className="md-campaign-category-photo">
              <img
                alt="Quần jogger"
                height={1402}
                loading="lazy"
                src="/assets/banners/category-jogger-v1.webp"
                width={1122}
              />
            </div>
            <div className="md-campaign-category-label">
              <h3>QUẦN JOGGER</h3>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path d="M4 20 20 4M5 4h15v15" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>
          </Link>

          <Link className="md-campaign-category" href="/collections/thoi-trang-nu">
            <div className="md-campaign-category-photo">
              <img
                alt="Thời trang nữ Quảng Châu"
                height={1402}
                loading="lazy"
                src="/assets/banners/category-kaki-v1.webp"
                width={1122}
              />
            </div>
            <div className="md-campaign-category-label">
              <h3>THỜI TRANG NỮ</h3>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path d="M4 20 20 4M5 4h15v15" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>
          </Link>

          <Link className="md-campaign-category" href="/collections/bo-do">
            <div className="md-campaign-category-photo">
              <img
                alt="Đồ bộ nam nữ"
                height={1402}
                loading="lazy"
                src="/assets/banners/category-set-v1.webp"
                width={1122}
              />
            </div>
            <div className="md-campaign-category-label">
              <h3>ĐỒ BỘ NAM NỮ</h3>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path d="M4 20 20 4M5 4h15v15" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>
          </Link>
        </div>
      </section>

      {/* 5. Campaign Set */}
      <section aria-labelledby="md-set-title" className="md-campaign-set">
        <div className="md-campaign-set-photo">
          <img
            alt="Bộ đồ Quảng Châu Shop Minh Ảnh"
            height={960}
            loading="lazy"
            src="/assets/banners/set-feature-v1.webp"
            width={1200}
          />
        </div>
        <div className="md-campaign-set-copy">
          <h2 id="md-set-title">
            <span>MỘT SET ĐỒ.</span>
            <span>NHIỀU KHOẢNH KHẮC.</span>
          </h2>
          <p>
            Đồ bộ Quảng Châu nam nữ đồng điệu, thoải mái từ những phút nghỉ ngơi đến khi
            xuống phố.
          </p>
          <Link className="md-campaign-cta md-campaign-cta-light" href="/collections/bo-do">
            <span>KHÁM PHÁ ĐỒ BỘ</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 32 20">
              <path d="M1 10h28M20 2l9 8-9 8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
          <Link className="md-campaign-text-link" href="/collections/thoi-trang-nu">
            XEM THỜI TRANG NỮ MỚI
          </Link>
        </div>
      </section>

      {/* 6. New Collection */}
      <section
        className="section section-collection section-collection-2 md-new-collection-section"
        id="collection-slider-1"
      >
        <div className="container-fluid">
          <div className="s-heading justify-content-center">
            <div className="custom-title s-title">
              <img
                alt="BỘ SƯU TẬP MỚI"
                src="/assets/8683f0257ade-isolation_mode_ab277d5f3bda477c8ea36037876365f6.svg"
              />
              <h2>
                <Link href="/collections/all">BỘ SƯU TẬP MỚI</Link>
              </h2>
            </div>
          </div>

          <div className="s-content">
            <div className="md-new-collection">
              <div className="md-new-collection-grid">
                {newCollectionProducts.map((p) => (
                  <ProductCard key={p.handle} product={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Policy Section */}
      <section className="section section-policy section-policy-2">
        <div className="container-fluid">
          <div className="list-policy">
            <div className="item">
              <div className="box">
                <div className="thumb">
                  <svg fill="none" height="53" viewBox="0 0 53 53" width="53">
                    <path
                      d="M26.5 4.5L32.8 11.2L41.8 10.6L43.2 19.5L50.5 25L45.5 32.5L47.5 41.2L38.8 43.8L34.5 51.5L26.5 47.5L18.5 51.5L14.2 43.8L5.5 41.2L7.5 32.5L2.5 25L9.8 19.5L11.2 10.6L20.2 11.2L26.5 4.5Z"
                      stroke="#151315"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 26.5L24 31.5L34.5 21"
                      stroke="#151315"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="detail">
                  <h3>Hàng Quảng Châu Loại 1</h3>
                  <p>Tuyển chọn form dáng chuẩn đẹp, chất liệu dày dặn cho nam và nữ.</p>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="box">
                <div className="thumb">
                  <svg fill="none" height="53" viewBox="0 0 53 53" width="53">
                    <rect
                      x="4"
                      y="13"
                      width="30"
                      height="24"
                      rx="2"
                      stroke="#151315"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M34 19H43L49 26V37H34V19Z"
                      stroke="#151315"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <circle cx="15" cy="40" r="4" stroke="#151315" strokeWidth="1.8" />
                    <circle cx="41" cy="40" r="4" stroke="#151315" strokeWidth="1.8" />
                  </svg>
                </div>
                <div className="detail">
                  <h3>Giao Hàng Toàn Quốc</h3>
                  <p>Nhận hàng kiểm tra thoải mái trước khi thanh toán COD.</p>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="box">
                <div className="thumb">
                  <svg fill="none" height="53" viewBox="0 0 53 53" width="53">
                    <path
                      d="M44 21C41.5 13.5 34.5 8 26 8C16 8 8 16 8 26C8 36 16 44 26 44C33.5 44 40 39.5 42.8 33"
                      stroke="#151315"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M45 12V22H35"
                      stroke="#151315"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="detail">
                  <h3>Đổi Trả Linh Hoạt</h3>
                  <p>Hỗ trợ đổi size nhanh chóng trong 7 ngày nếu mặc chưa vừa.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
