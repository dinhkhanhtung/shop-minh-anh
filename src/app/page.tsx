"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, RefreshCw, Truck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const { products } = useStore();

  const womensAndFeatured = products.slice(0, 8);
  const flashSaleProducts = products
    .filter((p) => p.compare > p.price)
    .slice(0, 10);

  return (
    <>
      {/* 1. Editorial Hero */}
      <section className="ma-hero">
        <div className="ma-hero-inner">
          <div className="ma-hero-copy">
            <p className="ma-hero-eyebrow">Shop Minh Anh • Bộ Sưu Tập Mới</p>
            <h1>
              Thanh lịch mỗi ngày.
              <br />
              Chuẩn gu Quảng Châu.
            </h1>
            <p>
              Tuyển chọn trang phục Nam &amp; Nữ hàng Quảng Châu loại 1 — phom dáng tinh tế,
              chất liệu mềm mịn và bền đẹp theo thời gian.
            </p>
            <div className="ma-hero-actions">
              <Link href="/collections/thoi-trang-nu" className="ma-button">
                Đồ Nữ Mới Về <ArrowRight size={15} />
              </Link>
              <Link href="/collections/thoi-trang-nam" className="ma-button ma-outline">
                Thời Trang Nam <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="ma-hero-media">
            <picture style={{ display: "block", width: "100%", height: "100%" }}>
              <source media="(max-width:767px)" srcSet="/assets/banners/hero-mobile-v1.webp" />
              <img
                src="/assets/banners/hero-desktop-v1.webp"
                alt="Shop Minh Anh - Thời trang Quảng Châu Nam Nữ"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* 2. Minimal Category Bar */}
      <nav className="ma-category-bar" aria-label="Danh mục nổi bật">
        <div className="ma-category-bar-inner">
          <Link href="/collections/thoi-trang-nu">Thời Trang Nữ</Link>
          <Link href="/collections/thoi-trang-nam">Thời Trang Nam</Link>
          <Link href="/collections/ao-thun">Áo Thun &amp; Kiểu</Link>
          <Link href="/collections/ao-sweater">Sweater Thu Đông</Link>
          <Link href="/collections/quan-jogger">Quần Jogger &amp; Kaki</Link>
          <Link href="/collections/bo-do">Đồ Bộ Phối Sẵn</Link>
          <Link href="/collections/gia-moi-moi-ngay">Ưu Đãi Online</Link>
        </div>
      </nav>

      {/* 3. Featured & New Arrivals */}
      <section className="ma-section">
        <div className="ma-container">
          <div className="ma-section-head">
            <div>
              <p className="ma-section-kicker">New Arrivals</p>
              <h2 className="ma-section-title">Bộ Sưu Tập Quảng Châu Mới Về</h2>
            </div>
            <Link href="/collections/all" className="ma-section-link">
              Xem tất cả ({products.length})
            </Link>
          </div>

          <div className="ma-grid-4">
            {womensAndFeatured.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Curated Categories */}
      <section className="ma-section ma-section-alt">
        <div className="ma-container">
          <div className="ma-section-head">
            <div>
              <p className="ma-section-kicker">Curated Edit</p>
              <h2 className="ma-section-title">Chọn Phong Cách Của Bạn</h2>
            </div>
            <Link href="/collections/all" className="ma-section-link">
              Khám phá danh mục
            </Link>
          </div>

          <div className="ma-cat-grid">
            <Link href="/collections/thoi-trang-nu" className="ma-cat-card">
              <div className="ma-cat-photo">
                <img src="/assets/nu/nu-blazer-kem.jpg" alt="Thời trang Nữ Quảng Châu" />
              </div>
              <div className="ma-cat-label">
                <h3>Thời Trang Nữ</h3>
                <ArrowRight size={16} />
              </div>
            </Link>

            <Link href="/collections/thoi-trang-nam" className="ma-cat-card">
              <div className="ma-cat-photo">
                <img src="/assets/banners/category-tops-v1.webp" alt="Thời trang Nam Quảng Châu" />
              </div>
              <div className="ma-cat-label">
                <h3>Thời Trang Nam</h3>
                <ArrowRight size={16} />
              </div>
            </Link>

            <Link href="/collections/bo-do" className="ma-cat-card">
              <div className="ma-cat-photo">
                <img src="/assets/nu/nu-set-len-nau.jpg" alt="Set Bộ Phối Sẵn" />
              </div>
              <div className="ma-cat-label">
                <h3>Set Bộ &amp; Đồ Mặc Nhà</h3>
                <ArrowRight size={16} />
              </div>
            </Link>

            <Link href="/collections/quan-jogger" className="ma-cat-card">
              <div className="ma-cat-photo">
                <img src="/assets/banners/category-jogger-v1.webp" alt="Quần Jogger & Kaki" />
              </div>
              <div className="ma-cat-label">
                <h3>Quần Jogger &amp; Kaki</h3>
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Lookbook Feature */}
      <section className="ma-lookbook">
        <div className="ma-lookbook-photo">
          <img
            src="/assets/banners/set-feature-v1.webp"
            alt="Set đồ Quảng Châu Shop Minh Anh"
          />
        </div>
        <div className="ma-lookbook-copy">
          <p className="ma-section-kicker" style={{ color: "#9eb5a6" }}>
            Minh Anh Lookbook
          </p>
          <h2>
            Một Set Đồ.
            <br />
            Nhiều Khoảnh Khắc.
          </h2>
          <p>
            Không cần đắn đo phối đồ mỗi sáng — các thiết kế đồng bộ cho cả Nam và Nữ tại
            Shop Minh Anh luôn giữ trọn sự thoải mái và chỉn chu từ công sở đến dạo phố.
          </p>
          <Link
            href="/collections/bo-do"
            className="ma-button"
            style={{ background: "#ffffff", color: "#141414", borderColor: "#ffffff" }}
          >
            Khám Phá Đồ Bộ <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* 6. Online Offers Carousel */}
      <section className="ma-section">
        <div className="ma-container">
          <div className="ma-section-head">
            <div>
              <p className="ma-section-kicker">Online Exclusive</p>
              <h2 className="ma-section-title">Ưu Đãi Chọn Lọc</h2>
            </div>
            <Link href="/collections/gia-moi-moi-ngay" className="ma-section-link">
              Xem tất cả ưu đãi
            </Link>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              768: { slidesPerView: 3, spaceBetween: 20 },
              1100: { slidesPerView: 4, spaceBetween: 22 },
            }}
          >
            {flashSaleProducts.map((p) => (
              <SwiperSlide key={p.handle}>
                <ProductCard product={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 7. Policy */}
      <section className="ma-container" style={{ paddingBottom: 72 }}>
        <div className="ma-policy-grid">
          <div className="ma-policy-item">
            <CheckCircle2 size={26} strokeWidth={1.35} />
            <div>
              <h3>Hàng Quảng Châu Loại 1</h3>
              <p>Tuyển chọn kỹ lưỡng từng đường may, phom dáng chuẩn đẹp cho nam và nữ.</p>
            </div>
          </div>

          <div className="ma-policy-item">
            <Truck size={26} strokeWidth={1.35} />
            <div>
              <h3>Kiểm Tra Trước Thanh Toán</h3>
              <p>Giao hàng toàn quốc, miễn phí vận chuyển với đơn hàng từ 499.000đ.</p>
            </div>
          </div>

          <div className="ma-policy-item">
            <RefreshCw size={26} strokeWidth={1.35} />
            <div>
              <h3>Đổi Size Trong 7 Ngày</h3>
              <p>Hỗ trợ đổi size hoặc đổi mẫu linh hoạt nếu bạn mặc chưa vừa ý.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
