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

   const addProduct = async (/* product: Product */): Promise<void> => {
      try {
         const token = localStorage.getItem('lsToken');
         const userId = localStorage.getItem('userIdToken');

         if (!token) throw new Error('No token found');
         if (!userId) throw new Error('No userId found');

         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'auth-token': token
            },
            body: JSON.stringify({
               name: 'New Product from Frontend',
               description: 'New Product Description',
               imageURL: 'https://picsum.photos/500/500',
               price: 16,
               stock: 5,
               discount: false,
               discountPct: 0,
               isHidden: false,
               _createdBy: userId
            })
         });

         if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Failed to add product');
         }

         const newProduct: Product = await response.json();
         products.value.push(newProduct);

         console.log('Product added: ', newProduct);

         await fetchProducts();
      }
      catch (err) {
         error.value = (err as Error).message;
      }
   }

   const deleteProduct = async (id: string): Promise<void> => {
      try {
         const token = localStorage.getItem('lsToken');

         if (!token) throw new Error('No token found');

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

   return { error, loading, products, fetchProducts, addProduct, deleteProduct };
};