<script setup lang="ts">
import { useCart } from '@/modules/cart/useCart';

const { cart, updateQuantity, cartTotal, salesTax, grandTotal, code, checkOutBuy } = useCart();
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-2xl font-bold">Checkout Section</h2>
    <p v-if="cart.length === 0" class="pt-5 text-center">Items have been order <br> You have no orders currently</p>
    <!-- If cart is empty -->
    <div> <!-- If cart is not empty -->
      <div v-for="item in cart" :key="item._id" class="flex items-center pb-4 mb-4 border-b">
        <!-- Loop through the cart items -->
        <!-- First Column: Image -->
        <div class="w-1/6">
          <img :src="item.imageURL" alt="Product Image" class="object-cover w-full h-24 rounded-lg">
          <!-- Product image -->
        </div>
        <!-- Second Column: Title and Description -->
        <div class="w-2/6 px-4">
          <p class="font-semibold">{{ item.name }}</p>
        </div>
        <!-- Third Column: Quantity with + and - -->
        <div class="flex items-center w-1/6">
          <button @click="updateQuantity(item._id, item.quantity - 1)" class="px-2 bg-orange-600">-</button>
          <!-- Decrease quantity -->
          <span class="mx-2">{{ item.quantity }}</span>
          <button @click="updateQuantity(item._id, item.quantity + 1)" class="px-2 bg-teal-600">+</button>
          <!-- Increase quantity -->
        </div>
        <!-- Fourth Column: Total Price -->
        <div class="w-1/6 text-right">
          <p class="font-semibold">$ {{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>
      </div>

      <!-- Summary Row -->
      <div class="pt-4 mt-4">
        <div class="flex justify-between mb-2">
          <p class="font-semibold">Subtotal:</p>
          <p>$ {{ cartTotal }}</p>
        </div>
        <div class="flex justify-between mb-2">
          <p class="font-semibold">Sales Tax:</p>
          <p>$ {{ salesTax }}</p>
        </div>
        <div class="flex justify-between mb-2">
          <p class="font-semibold">Coupon Code:</p>
          <input v-model="code" type="text" class="border p-1 pr-2 bg-[#181818] text-right w-28"
            placeholder="Enter code">
        </div>
        <div class="flex justify-between mb-4">
          <p class="font-semibold">Grand Total:</p>
          <p>$ {{ grandTotal }}</p>
        </div>
        <div class="flex justify-end">
          <button @click="checkOutBuy" class="p-2 text-white bg-orange-600 rounded hover:bg-orange-700">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
