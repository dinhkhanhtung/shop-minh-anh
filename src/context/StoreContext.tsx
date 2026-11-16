"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import catalogRaw from "@/data/catalog.json";
import type { CatalogData, CartItem, Product, SavedOrder } from "@/types/catalog";

const catalog = catalogRaw as CatalogData;

interface StoreContextValue {
  products: Product[];
  collections: CatalogData["collections"];
  cart: CartItem[];
  favorites: string[];
  orders: SavedOrder[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isSizeGuideOpen: boolean;
  quickViewHandle: string | null;
  toastMessage: string | null;
  cartCount: number;
  cartSubtotal: number;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
  openQuickView: (handle: string) => void;
  closeQuickView: () => void;
  showToast: (msg: string) => void;
  addToCart: (handle: string, variantId: string, quantity: number) => boolean;
  updateCartQty: (index: number, delta: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  toggleFavorite: (handle: string) => void;
  saveOrder: (order: SavedOrder) => void;
  getProduct: (handle: string) => Product | undefined;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewHandle, setQuickViewHandle] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getProduct = useCallback(
    (handle: string) => catalog.products.find((p) => p.handle === handle),
    []
  );

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("ma-cart") || "[]");
      const savedFavs = JSON.parse(localStorage.getItem("ma-favorites") || "[]");
      const savedOrders = JSON.parse(localStorage.getItem("ma-orders") || "[]");
      if (Array.isArray(savedCart)) setCart(savedCart);
      if (Array.isArray(savedFavs)) setFavorites(savedFavs);
      if (Array.isArray(savedOrders)) setOrders(savedOrders);
    } catch {
      // ignore storage errors
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("ma-cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("ma-favorites", JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("ma-orders", JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders, hydrated]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(t);
  }, [toastMessage]);

  const addToCart = useCallback(
    (handle: string, variantId: string, quantity: number) => {
      const product = getProduct(handle);
      const variant = product?.variants.find((v) => v.id === variantId);
      if (!product || !variant || !variant.available) {
        showToast("Vui lòng chọn màu sắc và kích thước còn hàng.");
        return false;
      }
      const cap = Math.min(99, variant.stock || 99);
      let added = true;
      setCart((prev) => {
        const existing = prev.find(
          (x) => x.handle === handle && x.variantId === variantId
        );
        const currentQty = existing?.quantity || 0;
        if (currentQty + quantity > cap) {
          showToast(`Lựa chọn này còn tối đa ${cap} sản phẩm.`);
          added = false;
          return prev;
        }
        if (existing) {
          return prev.map((x) =>
            x.handle === handle && x.variantId === variantId
              ? { ...x, quantity: x.quantity + quantity }
              : x
          );
        }
        return [...prev, { handle, variantId, quantity }];
      });
      if (added) {
        showToast("Đã thêm vào giỏ hàng.");
      }
      return added;
    },
    [getProduct, showToast]
  );

  const updateCartQty = useCallback(
    (index: number, delta: number) => {
      setCart((prev) => {
        const row = prev[index];
        if (!row) return prev;
        const product = getProduct(row.handle);
        const variant = product?.variants.find((v) => v.id === row.variantId);
        const max = Math.min(99, variant?.stock || 99);
        const nextQty = row.quantity + delta;
        if (nextQty < 1) {
          return prev.filter((_, i) => i !== index);
        }
        if (nextQty > max) {
          showToast("Đã đạt số lượng tối đa cho lựa chọn này.");
          return prev;
        }
        return prev.map((item, i) =>
          i === index ? { ...item, quantity: nextQty } : item
        );
      });
    },
    [getProduct, showToast]
  );

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleFavorite = useCallback(
    (handle: string) => {
      setFavorites((prev) => {
        const exists = prev.includes(handle);
        showToast(
          exists
            ? "Đã bỏ khỏi sản phẩm yêu thích."
            : "Đã lưu vào sản phẩm yêu thích."
        );
        return exists ? prev.filter((h) => h !== handle) : [...prev, handle];
      });
    },
    [showToast]
  );

  const saveOrder = useCallback((order: SavedOrder) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => {
    const p = getProduct(item.handle);
    const v = p?.variants.find((vr) => vr.id === item.variantId);
    return sum + (v?.price ?? p?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <StoreContext.Provider
      value={{
        products: catalog.products,
        collections: catalog.collections,
        cart,
        favorites,
        orders,
        isCartOpen,
        isSearchOpen,
        isSizeGuideOpen,
        quickViewHandle,
        toastMessage,
        cartCount,
        cartSubtotal,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        openSizeGuide: () => setIsSizeGuideOpen(true),
        closeSizeGuide: () => setIsSizeGuideOpen(false),
        openQuickView: (h) => setQuickViewHandle(h),
        closeQuickView: () => setQuickViewHandle(null),
        showToast,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        toggleFavorite,
        saveOrder,
        getProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
