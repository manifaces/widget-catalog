import { makeAutoObservable } from "mobx";
import { Product } from "./product"

const STORAGE_KEY = "widget_cart";
const STORAGE_TTL = 10 * 60_000;

export interface StoredCartItem {
  product: Product;
  quantity: number;
  timestamp: number;
}

export class Cart {
  items: { 
    product: Product;
    quantity: number;
  }[] = [];

  constructor() {
    makeAutoObservable(this);
    this.items = this.loadFromStorage();
  }

  addProduct(product: Product, count = 1) {
    const existing = this.items.find(i => i.product.id === product.id);

    this.items = existing
      ? this.items.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + count } : i
        )
      : [...this.items, { product, quantity: count }];

    this.saveToStorage();
  }

  decreaseProduct = (productId: string, count = 1) => {
    const existing = this.items.find(i => i.product.id === productId);
    if (!existing) return;

    if (existing.quantity > count) {
      existing.quantity -= count;
    } else {
      this.items = this.items.filter(i => i.product.id !== productId);
    }

    this.saveToStorage();
  };

  removeProduct = (productId: string) => {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.saveToStorage();
  };

  clear = () => {
    this.items = [];
    this.saveToStorage();
  };

  getQuantity = (productId: string) => {
    return this.items.find(i => i.product.id === productId)?.quantity ?? 0;
  };

  get totalCount() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  get totalPrice() {
    const sum = this.items.reduce((sum, i) => sum + Math.round(i.product.price) * i.quantity, 0);
    return `${Math.round(sum)} ₽`;
  }

  private saveToStorage() {
    const timestamp = Date.now();
    
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(this.items.map(i => ({
        product: {
          id: i.product.id, 
          name: i.product.name,
          price: i.product.price,
          image: i.product.image
        },
        quantity: i.quantity, 
        timestamp
      })))
    );
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    
    if (!raw) return [];
    
    try {
      const stored: StoredCartItem[] = JSON.parse(raw);
      const now = Date.now();
      
      return stored
        .filter(s => now - s.timestamp <= STORAGE_TTL)
        .map(s => ({ 
          product: new Product(s.product), 
          quantity: s.quantity 
        }));
    } catch {
      return [];
    }
  }
}