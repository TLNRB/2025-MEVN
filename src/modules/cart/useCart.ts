import { ref } from 'vue';
import type { CartItem } from '@/interfaces/interfaces';

export const useCart = () => {
   const cart = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));

   const addToCart = (product: Omit<CartItem, 'quantity'>): void => {
      console.log('Adding to cart: ', cart.value);
      const exisitngItem = cart.value.find((item) => item._id === product._id);

      if (exisitngItem) {
         exisitngItem.quantity += 1;
         console.log('Updated exisitngItem quantity', exisitngItem);
      }
      else {
         cart.value.push({ ...product, quantity: 1 });
         console.log('Added new item to cart', cart.value);
      }

      localStorage.setItem('cart', JSON.stringify(cart.value));
      console.log('Added to cart: ', cart.value);
   }

   const removeFromCart = (productId: string): void => {
      const existingItem = cart.value.find((item) => item._id === productId);

      if (existingItem) {
         cart.value = cart.value.filter((item) => item._id !== productId);
         localStorage.setItem('cart', JSON.stringify(cart.value));
      }
   }

   const updateQuantity = (productId: string, quantity: number): void => {
      const item = cart.value.find((item) => item._id === productId);
      if (item) {
         item.quantity = quantity;
         if (item.quantity <= 0) {
            removeFromCart(productId);
         }
         else {
            localStorage.setItem('cart', JSON.stringify(cart.value));
         }
      }
      console.log(`Updated quantity of ${productId} to ${quantity}`);
      console.log('Updated cart: ', cart.value);
   }

   const cartTotal = (): number => {
      return Number(cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));
   }

   const cartTotalIndividualProduct = (productId: string): number => {
      const item = cart.value.find((item) => item._id === productId);
      return item ? item.price * item.quantity : 0;
   }

   const salesTax = (): number => {
      const taxRate: number = 0.25;
      return Math.round(cartTotal() * taxRate * 100) / 100;
   }

   const code = ref<string>('');

   const couponCodeDiscount = (code: string): number => {
      const couponCodeAccepted = code === 'DISCOUNT';
      return couponCodeAccepted ? 0.9 : 1;
   }

   const grandTotal = (): number => {
      return Number(((cartTotal() + salesTax()) * couponCodeDiscount(code.value)).toFixed(2));
   }

   return { cart, addToCart, updateQuantity, cartTotal, cartTotalIndividualProduct, salesTax, code, grandTotal }
}