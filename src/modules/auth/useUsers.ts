import { ref } from 'vue';
import type { User } from '@/interfaces/interfaces';

export const useUsers = () => {
   const token = ref<string | null>(null);
   const isLoggedIn = ref<boolean>(false);
   const error = ref<string | null>(null);
   const user = ref<User | null>(null);

   const name = ref<string>('');
   const email = ref<string>('');
   const password = ref<string>('');

   const fetchToken = async (email: string, password: string): Promise<void> => {
      try {
         const response = await fetch('https://ments-restapi.onrender.com/api/user/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'auth-token': localStorage.getItem('lsToken') || ''
            },
            body: JSON.stringify({ email, password })
         })

         if (!response.ok) {
            const errorResponse = await response.json();
            console.log(errorResponse.error || 'Invalid credentials');

            throw new Error('Invalid credentials');
         }

         const authResponse = await response.json();

         token.value = authResponse.data.token;
         user.value = authResponse.data.user;
         isLoggedIn.value = true;

         localStorage.setItem('lsToken', authResponse.data.token);
         localStorage.setItem('userIDToken', authResponse.data.userId);

         console.log('Token:', token.value);
         console.log('User is logged in: ', authResponse)
      }
      catch (err) {
         error.value = (err as Error).message || 'An error occurred';
         isLoggedIn.value = false;
      }
   }

   return { token, isLoggedIn, error, user, name, email, password, fetchToken };
};