import { makeAutoObservable, reaction } from 'mobx';
import { ProductApi } from 'api/types';
import { AmountConfig } from 'config/constants';

type CartItem = {
  product: ProductApi;
  quantity: number;
};

export default class CartStore {
  cartItems: CartItem[] = [];
  appliedPromocode: string | null = null;
  discount: number = 0;

  constructor() {
    this.cartItems = [];
    makeAutoObservable(this);

    const savedPromocode = localStorage.getItem('appliedPromocode');
    if (savedPromocode) {
      this.appliedPromocode = savedPromocode;
      this.updateDiscount();
    }

    reaction(
      () => this.cartItems.map((item) => ({ id: item.product.id, quantity: item.quantity })),
      () => this.saveCartToStorage(),
    );
  }

  addToCart(product: ProductApi, quantity: number = 1) {
    const existingItem = this.cartItems.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.updateDiscount();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.product.id !== productId);
    this.updateDiscount();
  }

  incrementQuantity(productId: number) {
    const item = this.cartItems.find((item) => item.product.id === productId);
    if (item) {
      item.quantity += 1;
      this.updateDiscount();
    }
  }

  decrementQuantity(productId: number) {
    const item = this.cartItems.find((item) => item.product.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.updateDiscount();
    }
  }

  clearCart() {
    this.cartItems = [];
  }

  updateDiscount(): void {
    if (this.appliedPromocode) {
      const discountPercent = this.getPromocode(this.appliedPromocode);
      this.discount = this.getTotalAmount() * (discountPercent / 100);
    } else {
      this.discount = 0;
    }
  }

  getPromocode(code: string): number {
    if (code === AmountConfig.PROMOCODE) {
      return AmountConfig.discount;
    }
    return 0;
  }

  applyPromocode(code: string): void {
    const discountPercent = this.getPromocode(code);
    if (discountPercent > 0) {
      this.appliedPromocode = code;
      this.updateDiscount();
      localStorage.setItem('appliedPromocode', code);
    } else {
      localStorage.removeItem('appliedPromocode');
      this.appliedPromocode = null;
      this.discount = 0;
      throw new Error('Invalid promocode');
    }
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getFinalAmount(): number {
    const total = this.getTotalAmount() - this.discount + AmountConfig.delivery;
    return total > 0 ? total : 0;
  }

  loadCartFromStorage() {
    if (!this.cartItems) {
      this.cartItems = [];
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    } else {
      this.cartItems = [];
    }

    if (this.appliedPromocode) {
      this.updateDiscount();
    }
  }

  saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
