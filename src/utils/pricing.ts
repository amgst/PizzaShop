import { MenuItem } from '../data/menu';

type PricedItem = Pick<MenuItem, 'id' | 'name' | 'category' | 'price'> & { quantity: number };

export const DELIVERY_FEE = 150;
export const FREE_DELIVERY_THRESHOLD = 4500;
export const FREE_DESSERT_THRESHOLD = 6500;
export const BUNDLE_DISCOUNT = 350;
export const WINGS_SECOND_DISCOUNT_RATE = 0.2;

const PIZZA_CATEGORIES = new Set<MenuItem['category']>([
  'Signature Pizzas',
  'Gourmet White Pies',
  'Spicy & Bold',
  'Plant-Based'
]);

export interface DiscountLine {
  id: string;
  label: string;
  amount: number;
}

export interface PricingBreakdown {
  subtotal: number;
  discountsTotal: number;
  deliveryFee: number;
  total: number;
  discounts: DiscountLine[];
  bundleCount: number;
  freeDeliveryUnlocked: boolean;
  freeDessertUnlocked: boolean;
  freeDessertApplied: boolean;
  missingForFreeDelivery: number;
  missingForFreeDessert: number;
}

export const computeCartPricing = (items: PricedItem[]): PricingBreakdown => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discounts: DiscountLine[] = [];

  let pizzaQty = 0;
  let sideQty = 0;
  let dipQty = 0;
  let wingsDiscount = 0;
  let cheapestDessertPrice = Number.POSITIVE_INFINITY;

  items.forEach((item) => {
    if (PIZZA_CATEGORIES.has(item.category)) pizzaQty += item.quantity;
    if (item.category === 'Sides') sideQty += item.quantity;
    if (item.category === 'Dips') dipQty += item.quantity;
    if (item.category === 'Wings') {
      wingsDiscount += Math.floor(item.quantity / 2) * item.price * WINGS_SECOND_DISCOUNT_RATE;
    }
    if (item.category === 'Desserts') cheapestDessertPrice = Math.min(cheapestDessertPrice, item.price);
  });

  const bundleCount = Math.min(Math.floor(pizzaQty / 2), sideQty, dipQty);
  if (bundleCount > 0) {
    discounts.push({
      id: 'bundle',
      label: `Pizza Party Bundle x${bundleCount}`,
      amount: bundleCount * BUNDLE_DISCOUNT
    });
  }

  if (wingsDiscount > 0) {
    discounts.push({
      id: 'wings',
      label: 'Wings Pair Offer',
      amount: Math.round(wingsDiscount)
    });
  }

  const freeDessertUnlocked = subtotal >= FREE_DESSERT_THRESHOLD;
  const freeDessertApplied = freeDessertUnlocked && Number.isFinite(cheapestDessertPrice);
  if (freeDessertApplied) {
    discounts.push({
      id: 'dessert',
      label: 'Free Dessert Reward',
      amount: cheapestDessertPrice
    });
  }

  const discountsTotal = discounts.reduce((sum, d) => sum + d.amount, 0);
  const freeDeliveryUnlocked = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = items.length === 0 || freeDeliveryUnlocked ? 0 : DELIVERY_FEE;
  const total = Math.max(0, subtotal - discountsTotal + deliveryFee);

  return {
    subtotal,
    discountsTotal,
    deliveryFee,
    total,
    discounts,
    bundleCount,
    freeDeliveryUnlocked,
    freeDessertUnlocked,
    freeDessertApplied,
    missingForFreeDelivery: Math.max(FREE_DELIVERY_THRESHOLD - subtotal, 0),
    missingForFreeDessert: Math.max(FREE_DESSERT_THRESHOLD - subtotal, 0)
  };
};
