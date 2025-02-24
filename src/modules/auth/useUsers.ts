import { ref } from 'vue';
import type { User } from '@/interfaces/interfaces';

export const useUsers = () => {
   const token = ref<string | null>(null);
   const isLoggedIn = ref<boolean>(false);
   const error = ref<string | null>(null);
   const user = ref<User | null>(null);

   const name = ref<string | null>(null);
   const email = ref<string | null>(null);
   const password = ref<string | null>(null);
};