<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useUsers } from '@/modules/auth/useUsers';
import { state } from '@/modules/globalStates/state';
import CartBasket from '@/components/cart/CartBasketView.vue';

const { logout } = useUsers();
const isLoggedIn = computed(() => state.isLoggedIn);

const isCartVisible = ref<boolean>(false);

const toggleCart = (): void => {
  isCartVisible.value = !isCartVisible.value;
  console.log("iscartvisible: ", isCartVisible.value);
};
</script>

<template class="w-screen">
  <header class="py-4 text-white">
    <div class="wrapper" >

      <nav class="">
        <RouterLink to="/" class="mr-4">Home</RouterLink>
        <RouterLink to="/about" class="mr-4">About</RouterLink>
        <RouterLink to="/products" class="mr-4">Products</RouterLink>
        <RouterLink to="/auth" class="mr-4">Auth</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/admin" class="mr-4">Admin</RouterLink>
        <button v-if="isLoggedIn" @click="logout" class="cursor-pointer">Logout</button>
        <!-- RouterLink to products, Auth, Admin & and logout button -->


        <!-- toggle cart button -->
         <button @click="toggleCart">Cart</button>

        <!-- Routerlink to orders -->


      </nav>
    </div>
  </header>

  <RouterView />

  <!-- CartBasket component -->   
   <CartBasket v-if="isCartVisible" @updateIsVisible="toggleCart" :isVisible="isCartVisible" />

</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
