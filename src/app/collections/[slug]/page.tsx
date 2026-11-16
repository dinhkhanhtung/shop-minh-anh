"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

const COLLECTION_TITLES: Record<string, string> = {
  all: "Tất cả sản phẩm Quảng Châu",
  "thoi-trang-nam": "Thời trang Nam Quảng Châu",
  "thoi-trang-nu": "Thời trang Nữ Quảng Châu",
  "hang-moi": "Hàng mới về",
  "gia-moi-moi-ngay": "Ưu đãi Online",
  "ao-thun": "Áo thun & Áo kiểu",
  "ao-thun-dai-tay": "Áo thun dài tay",
  "ao-sweater": "Áo Sweater & Nỉ",
  "quan-jogger": "Quần Jogger",
  "quan-kaki": "Quần dài Kaki",
  "quan-short": "Quần Short",
  "bo-do": "Đồ bộ & Set phối sẵn",
  combo: "Combo tiết kiệm",
};

const PRICE_RANGES = [
  { label: "Dưới 250.000đ", min: 0, max: 250000 },
  { label: "250.000đ – 400.000đ", min: 250000, max: 400000 },
  { label: "Trên 400.000đ", min: 400000, max: 99999999 },
];

export default function CollectionPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug || "all";
  const { products } = useStore();

  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [onlySale, setOnlySale] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [limit, setLimit] = useState(24);

  const baseProducts = useMemo(() => {
    if (slug === "thoi-trang-nam") {
      return products.filter((p) => p.gender === "nam" || p.gender === "unisex");
    }
    if (slug === "thoi-trang-nu") {
      return products.filter((p) => p.gender === "nu" || p.gender === "unisex");
    }
    if (slug === "gia-moi-moi-ngay") {
      return products.filter((p) => p.compare > p.price);
    }
    if (slug === "ao-thun") {
      return products.filter(
        (p) => p.type.toLowerCase().includes("áo thun") || p.type.toLowerCase().includes("áo kiểu")
      );
    }
    if (slug === "ao-thun-dai-tay") {
      return products.filter((p) => p.type.toLowerCase().includes("dài tay"));
    }
    if (slug === "ao-sweater") {
      return products.filter((p) => p.type.toLowerCase().includes("sweater"));
    }
    if (slug === "quan-jogger") {
      return products.filter((p) => p.type.toLowerCase().includes("jogger"));
    }
    if (slug === "quan-kaki") {
      return products.filter((p) => p.type.toLowerCase().includes("dài kaki"));
    }
    if (slug === "quan-short") {
      return products.filter((p) => p.type.toLowerCase().includes("short"));
    }
    if (slug === "bo-do" || slug === "combo") {
      return products.filter((p) => p.type.toLowerCase().includes("đồ bộ"));
    }
    return products;
  }, [products, slug]);

  const allTypes = useMemo(
    () => Array.from(new Set(baseProducts.map((p) => p.type))).sort(),
    [baseProducts]
  );

  const allSizes = useMemo(
    () => Array.from(new Set(baseProducts.flatMap((p) => p.sizes))),
    [baseProducts]
  );

  const toggleItem = (
    val: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );
  };

  const filtered = useMemo(() => {
    let list = baseProducts.filter((p) => {
      if (selectedGenders.length > 0 && !selectedGenders.includes(p.gender)) {
        return false;
      }
      if (selectedTypes.length > 0 && !selectedTypes.includes(p.type)) {
        return false;
      }
      if (
        selectedSizes.length > 0 &&
        !selectedSizes.some((s) => p.sizes.includes(s))
      ) {
        return false;
      }
      if (selectedPrices.length > 0) {
        const matchPrice = selectedPrices.some((label) => {
          const r = PRICE_RANGES.find((pr) => pr.label === label);
          return r ? p.price >= r.min && p.price < r.max : false;
        });
        if (!matchPrice) return false;
      }
      if (onlySale && !(p.compare > p.price)) {
        return false;
      }
      return true;
    });

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === "title-asc") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title, "vi"));
    } else if (sortBy === "sale") {
      list = [...list].sort(
        (a, b) =>
          1 - b.price / (b.compare || b.price) - (1 - a.price / (a.compare || a.price))
      );
    }

    return list;
  }, [
    baseProducts,
    selectedGenders,
    selectedTypes,
    selectedSizes,
    selectedPrices,
    onlySale,
    sortBy,
  ]);

  const title = COLLECTION_TITLES[slug] || "Bộ sưu tập Shop Minh Anh";

  const resetFilters = () => {
    setSelectedGenders([]);
    setSelectedTypes([]);
    setSelectedPrices([]);
    setSelectedSizes([]);
    setOnlySale(false);
  };

  return (
    <div className="ma-container">
      <div className="ma-crumbs">
        <Link href="/">Trang chủ</Link>
        <span>/</span>
        <span>{title}</span>
      </div>

      <div className="ma-list-heading">
        <h1>{title}</h1>
        <div className="ma-list-controls">
          <button
            type="button"
            className="ma-filter-toggle"
            onClick={() => setFilterOpen((o) => !o)}
          >
            <SlidersHorizontal size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
            Bộ lọc
          </button>
          <span>{filtered.length} sản phẩm</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">Nổi bật</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="sale">Ưu đãi tốt nhất</option>
            <option value="title-asc">Tên: A - Z</option>
          </select>
        </div>
      </div>

      <div className="ma-list-layout">
        <aside className={`ma-filters ${filterOpen ? "open" : ""}`}>
          <h2>BỘ LỌC SẢN PHẨM</h2>

          <details open>
            <summary>Đối tượng</summary>
            {[
              { value: "nu", label: "Thời trang Nữ" },
              { value: "nam", label: "Thời trang Nam" },
              { value: "unisex", label: "Unisex (Nam & Nữ)" },
            ].map((g) => (
              <label key={g.value}>
                <input
                  type="checkbox"
                  checked={selectedGenders.includes(g.value)}
                  onChange={() => toggleItem(g.value, setSelectedGenders)}
                />
                {g.label}
              </label>
            ))}
          </details>

          <details open>
            <summary>Loại sản phẩm</summary>
            {allTypes.map((t) => (
              <label key={t}>
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(t)}
                  onChange={() => toggleItem(t, setSelectedTypes)}
                />
                {t}
              </label>
            ))}
          </details>

          <details open>
            <summary>Khoảng giá</summary>
            {PRICE_RANGES.map((pr) => (
              <label key={pr.label}>
                <input
                  type="checkbox"
                  checked={selectedPrices.includes(pr.label)}
                  onChange={() => toggleItem(pr.label, setSelectedPrices)}
                />
                {pr.label}
              </label>
            ))}
          </details>

          <details>
            <summary>Kích thước</summary>
            {allSizes.map((s) => (
              <label key={s}>
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(s)}
                  onChange={() => toggleItem(s, setSelectedSizes)}
                />
                {s}
              </label>
            ))}
          </details>

          <details open>
            <summary>Ưu đãi</summary>
            <label>
              <input
                type="checkbox"
                checked={onlySale}
                onChange={(e) => setOnlySale(e.target.checked)}
              />
              Đang giảm giá
            </label>
          </details>

          <button
            type="button"
            onClick={resetFilters}
            style={{
              background: "none",
              border: 0,
              textDecoration: "underline",
              padding: "16px 0",
              fontSize: 12,
            }}
          >
            Xóa tất cả bộ lọc
          </button>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <h2 style={{ fontSize: 20, marginBottom: 10 }}>
                Chưa có sản phẩm phù hợp
              </h2>
              <p style={{ fontSize: 13, color: "#777", marginBottom: 20 }}>
                Hãy thử bỏ bớt bộ lọc hoặc xem tất cả sản phẩm mới về.
              </p>
              <button
                type="button"
                className="ma-button ma-outline"
                onClick={resetFilters}
              >
                XEM TẤT CẢ SẢN PHẨM
              </button>
            </div>
          ) : (
            <>
              <div className="ma-listing-grid">
                {filtered.slice(0, limit).map((p) => (
                  <ProductCard key={p.handle} product={p} />
                ))}
              </div>

              {filtered.length > limit && (
                <div style={{ textAlign: "center", paddingTop: 40 }}>
                  <button
                    type="button"
                    className="ma-button ma-outline"
                    onClick={() => setLimit((l) => l + 24)}
                  >
                    XEM THÊM SẢN PHẨM ({filtered.length - limit} còn lại)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
