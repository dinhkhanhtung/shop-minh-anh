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

  const flashSaleProducts = products
    .filter((p) => p.compare > p.price)
    .slice(0, 10);

  const newCollectionProducts = products.slice(0, 12);

  return (
    <>
      {/* 1. Hero Campaign */}
      <section className="ma-campaign-hero">
        <div className="ma-campaign-photo">
          <img
            src="/assets/banners/hero-desktop-v1.webp"
            alt="Shop Minh Ảnh - Thời trang Quảng Châu Nam Nữ"
          />
        </div>
        <div className="ma-campaign-copy">
          <h1>
            <span>THỜI TRANG</span>
            <span>QUẢNG CHÂU NAM NỮ.</span>
          </h1>
          <p>
            Tuyển chọn hàng Quảng Châu loại 1 — Form chuẩn dáng Việt, chất vải dày dặn,
            mặc đẹp mỗi ngày.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/collections/all" className="ma-campaign-cta">
              XEM TẤT CẢ SẢN PHẨM <ArrowRight size={18} />
            </Link>
            <Link
              href="/collections/thoi-trang-nu"
              className="ma-campaign-cta"
              style={{
                background: "#ffffff",
                color: "#18231f",
                borderColor: "#18231f",
              }}
            >
              ĐỒ NỮ MỚI VỀ <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Quick Category Bar */}
      <nav className="ma-category-bar" aria-label="Danh mục nhanh">
        <Link href="/collections/thoi-trang-nu">Thời Trang Nữ</Link>
        <Link href="/collections/thoi-trang-nam">Thời Trang Nam</Link>
        <Link href="/collections/ao-thun">Áo Thun &amp; Kiểu</Link>
        <Link href="/collections/quan-jogger">Quần Jogger &amp; Tây</Link>
        <Link href="/collections/bo-do">Đồ Bộ &amp; Set</Link>
        <Link href="/collections/gia-moi-moi-ngay">Ưu Đãi Online</Link>
      </nav>

      {/* 3. Flash Sale Slider */}
      <section className="ma-flashsale">
        <div className="ma-flashsale-box">
          <div className="ma-flashsale-head">
            <div className="ma-flashsale-title-wrap">
              <h2 className="ma-flashsale-title">ƯU ĐÃI ONLINE</h2>
              <span className="ma-offer-pill">GIÁ TỐT MỖI NGÀY</span>
            </div>
            <Link href="/collections/gia-moi-moi-ngay" className="ma-more-link">
              Xem tất cả ưu đãi ↗
            </Link>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              768: { slidesPerView: 3, spaceBetween: 16 },
              1100: { slidesPerView: 4, spaceBetween: 20 },
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

      {/* 4. Campaign Categories: Mặc gì hôm nay? */}
      <section className="ma-campaign-categories">
        <h2>MẶC GÌ HÔM NAY?</h2>
        <div className="ma-campaign-category-grid">
          <Link href="/collections/thoi-trang-nu" className="ma-campaign-category">
            <div className="ma-campaign-category-photo">
              <img
                src="/assets/nu/nu-blazer-kem.jpg"
                alt="Thời trang Nữ Quảng Châu"
              />
            </div>
            <div className="ma-campaign-category-label">
              <h3>Thời Trang Nữ Quảng Châu</h3>
              <ArrowRight size={20} />
            </div>
          </Link>

          <Link href="/collections/thoi-trang-nam" className="ma-campaign-category">
            <div className="ma-campaign-category-photo">
              <img
                src="/assets/tiktok/0cd99c43b81fa1196268d7ca.webp"
                alt="Thời trang Nam Quảng Châu"
              />
            </div>
            <div className="ma-campaign-category-label">
              <h3>Thời Trang Nam Quảng Châu</h3>
              <ArrowRight size={20} />
            </div>
          </Link>

          <Link href="/collections/bo-do" className="ma-campaign-category">
            <div className="ma-campaign-category-photo">
              <img
                src="/assets/nu/nu-set-len-nau.jpg"
                alt="Set Bộ Phối Sẵn"
              />
            </div>
            <div className="ma-campaign-category-label">
              <h3>Set Bộ &amp; Đồ Mặc Nhà</h3>
              <ArrowRight size={20} />
            </div>
          </Link>

          <Link href="/collections/ao-thun" className="ma-campaign-category">
            <div className="ma-campaign-category-photo">
              <img
                src="/assets/nu/nu-ao-kieu-den.jpg"
                alt="Áo Thun & Sơ Mi"
              />
            </div>
            <div className="ma-campaign-category-label">
              <h3>Áo Thun &amp; Áo Kiểu</h3>
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>
      </section>

      {/* 5. Campaign Set */}
      <section className="ma-campaign-set">
        <div className="ma-campaign-set-photo">
          <img
            src="/assets/nu/nu-set-len-nau.jpg"
            alt="Set đồ Quảng Châu phối sẵn"
          />
        </div>
        <div className="ma-campaign-set-copy">
          <h2>
            <span>MỘT SET ĐỒ.</span>
            <span>NHIỀU KHOẢNH KHẮC.</span>
          </h2>
          <p>
            Không cần đắn đo phối đồ mỗi sáng — các set đồ Quảng Châu nam &amp; nữ tại
            Shop Minh Ảnh đều chuẩn form, mặc đi làm, dạo phố hay du lịch đều nổi bật.
          </p>
          <Link href="/collections/bo-do" className="ma-campaign-cta-light">
            KHÁM PHÁ SET ĐỒ <ArrowRight size={18} />
          </Link>
          <Link href="/collections/all" className="ma-campaign-text-link">
            Xem toàn bộ danh mục sản phẩm
          </Link>
        </div>
      </section>

      {/* 6. New Collection Grid */}
      <section className="ma-new-collection">
        <div className="ma-section-heading">
          <h2>BỘ SƯU TẬP MỚI VỀ</h2>
          <Link href="/collections/all" className="ma-more-link">
            Xem tất cả ({products.length} mẫu) ↗
          </Link>
        </div>

        <div className="ma-grid-4">
          {newCollectionProducts.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>

      {/* 7. Policy Section */}
      <section className="ma-policy">
        <div className="ma-policy-grid">
          <div className="ma-policy-item">
            <CheckCircle2 size={34} strokeWidth={1.5} color="#283e32" />
            <div>
              <h3>Hàng Quảng Châu Loại 1</h3>
              <p>Tuyển chọn kỹ lưỡng từng đường kim mũi chỉ, chuẩn form dáng và chất liệu.</p>
            </div>
          </div>

          <div className="ma-policy-item">
            <Truck size={34} strokeWidth={1.5} color="#283e32" />
            <div>
              <h3>Giao Hàng Toàn Quốc</h3>
              <p>Đóng gói cẩn thận, nhận hàng kiểm tra thoải mái trước khi thanh toán.</p>
            </div>
          </div>

          <div className="ma-policy-item">
            <RefreshCw size={34} strokeWidth={1.5} color="#283e32" />
            <div>
              <h3>Đổi Size Linh Hoạt 7 Ngày</h3>
              <p>Hỗ trợ đổi size hoặc đổi mẫu nhanh chóng nếu chưa vừa ý.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
