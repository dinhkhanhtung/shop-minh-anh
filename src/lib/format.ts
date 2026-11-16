export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
}

export function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

export function getDiscountPercent(price: number, compare: number): number {
  if (!compare || compare <= price) return 0;
  return Math.round((1 - price / compare) * 100);
}
