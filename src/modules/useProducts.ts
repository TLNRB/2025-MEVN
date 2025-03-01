import { ref } from 'vue';
import type { Product, NewProduct } from '@/interfaces/interfaces';

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

   const getTokenAndUserId = (): { token: string, userId: string } => {
      const token = localStorage.getItem('lsToken');
      const userId = localStorage.getItem('userIdToken');

      if (!token) throw new Error('No token found');
      if (!userId) throw new Error('No userId found');

      return { token, userId };
   }

   const validateProduct = (product: NewProduct): void => {
      if (!product.name) throw new Error('Name is required');
   }

   const setDefaultValues = (product: NewProduct, userId: string): NewProduct => {
      return {
         name: product.name,
         description: product.description || 'New Product Description',
         imageURL: product.imageURL || 'https://picsum.photos/500/500',
         price: product.price || 16,
         stock: product.stock || 5,
         discount: product.discount || false,
         discountPct: product.discountPct || 0,
         isHidden: product.isHidden || false,
         _createdBy: userId
      }
   }

   const addProduct = async (product: NewProduct): Promise<void> => {
      try {
         const { token, userId } = getTokenAndUserId();

         validateProduct(product);

         const productWithDefaults = setDefaultValues(product, userId);

         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'auth-token': token
            },
            body: JSON.stringify(productWithDefaults)
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

   return { error, loading, products, fetchProducts, addProduct, deleteProduct, getTokenAndUserId };
};