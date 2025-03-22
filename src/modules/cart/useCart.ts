import { ref } from 'vue';
import type { CartItem } from '@/interfaces/interfaces';

export const useCart = () => {
   const cart = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));

   const addToCart = (product: Omit<CartItem, 'quantity'>): void => {
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

   return { cart, addToCart }
}