<template class="w-screen">
  <header class="py-4 text-white">
    <div class="wrapper" >

      <nav class="">
        <RouterLink to="/" class="mr-4">Home</RouterLink>
        <RouterLink to="/about" class="mr-4">About</RouterLink>
        <RouterLink to="/products" class="mr-4">Products</RouterLink>
        <RouterLink to="/auth" class="mr-4">Auth</RouterLink>
        <RouterLink to="/admin" class="mr-4">Admin</RouterLink>
        <!-- RouterLink to products, Auth, Admin & and logout button -->


        <!-- toggle cart button -->


        <!-- Routerlink to orders -->


      </nav>
    </div>
  </header>

  <RouterView />

  <!-- CartBasket component -->


</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>


<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
