export interface ProductImage {
  src: string;
  color: string;
}

export interface ProductVariant {
  id: string;
  color: string;
  size: string;
  price: number;
  compare: number;
  available: boolean;
  stock: number;
  image?: string;
}

export interface Product {
  handle: string;
  sourceId?: string;
  title: string;
  type: string;
  gender: "nam" | "nu" | "unisex";
  brand?: string;
  price: number;
  compare: number;
  available: boolean;
  images: ProductImage[];
  colors: string[];
  sizes: string[];
  variants: ProductVariant[];
  sizeGuide?: string;
  videos?: string[];
  sku: string;
  description?: string;
}

export interface Collection {
  handle: string;
  title: string;
  description?: string;
  products: string[];
}

export interface CatalogData {
  products: Product[];
  collections: Collection[];
}

export interface CartItem {
  handle: string;
  variantId: string;
  quantity: number;
}

export interface SavedOrder {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    note?: string;
    paymentMethod?: string;
  };
  items: Array<{
    handle: string;
    variantId: string;
    title: string;
    color: string;
    size: string;
    quantity: number;
    unitPrice: number;
    image: string;
  }>;
  subtotal: number;
  status: string;
}
