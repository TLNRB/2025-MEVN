import { ref } from 'vue';
import type { Product } from '@/interfaces/interfaces';

export const useProducts = () => {
   const error = ref<string | null>(null);
   const loading = ref<boolean>(false);
   const products = ref<Product[]>([]);

   const fetchProducts = async (): Promise<void> => {
      loading.value = true;

      try {
         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
         if (!response.ok) {
            throw new Error('Failed to fetch products');

         }
         const data: Product[] = await response.json();

         products.value = data;
         console.log("Products are fetched: ", products.value);
      }
      catch (err) {
         error.value = (err as Error).message;
      }
      finally {
         loading.value = false;
      }
   }

   const deleteProduct = async (id: string): Promise<void> => {
      try {
         const token = localStorage.getItem('lsToken');

         if (!token) {
            throw new Error('No token found');
         }

         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`, {
            method: 'DELETE',
            headers: {
               'auth-token': token
            }
         });

         if (!response.ok) {
            throw new Error('Failed to delete product');
         }

         products.value = products.value.filter(product => product._id !== id);
         console.log('Product deleted: ', id);
      }
      catch (err) {
         error.value = (err as Error).message;
      }
   }

   return { error, loading, products, fetchProducts, deleteProduct };
};