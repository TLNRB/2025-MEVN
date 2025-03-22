<script setup lang="ts">
import { onMounted } from 'vue';
import { useProducts } from '@/modules/useProducts';
import { useCart } from '@/modules/cart/useCart';

const { products, error, loading, fetchProducts } = useProducts();
const { addToCart } = useCart();

onMounted(() => {
  fetchProducts();
})
</script>

<template>
  <div class="">
    <h2 class="mb-4 text-2xl font-bold">Products</h2>
    <div v-if="loading" class="text-center">Loading...</div>

    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <div v-else class="flex flex-wrap -mx-2">
      <div v-for="product in products" :key="product.id" class="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4" >
        <div class="p-4 bg-white rounded-lg shadow-md">
        <img :src="product.imageURL" :alt="`${product.name} image`" class="object-cover w-full h-48 mb-4 rounded-lg">
          <h3 class="mb-2 text-lg font-semibold text-gray-700">{{ product.name }}</h3>
          <p class="text-gray-700">{{ product.description }}</p>
          <p class="mt-2 font-bold text-blue-500">{{ product.price }}</p>
          <div class="flex justify-between mt-4">
            <button class="px-1 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Product Details</button>
            <button @click="addToCart(product)" class="px-1 py-2 text-white bg-green-500 rounded hover:bg-green-600">Add to Cart</button> <!-- Add to cart button -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
