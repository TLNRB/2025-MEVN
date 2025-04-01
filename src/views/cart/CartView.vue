<script setup lang="ts">
import { useCart } from '@/modules/cart/useCart';
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-2xl font-bold">Checkout Section</h2>
    <p class="pt-5 text-center">Items have been order <br> You have no orders currently</p> <!-- If cart is empty -->
    <div> <!-- If cart is not empty -->
      <div class="flex items-center pb-4 mb-4 border-b"> <!-- Loop through the cart items -->
        <!-- First Column: Image -->
        <div class="w-1/6">
          <img  alt="Product Image" class="object-cover w-full h-24 rounded-lg"> <!-- Product image -->
        </div>
        <!-- Second Column: Title and Description -->
        <div class="w-2/6 px-4">
          <p class="font-semibold"></p> <!-- Product name -->
         <!--  <p class="text-gray-500">{{ item.description }}</p> -->
        </div>
        <!-- Third Column: Quantity with + and - -->
        <div class="flex items-center w-1/6">
          <button  class="px-2 bg-orange-600">-</button> <!-- Decrease quantity -->
          <span class="mx-2"></span> <!-- Quantity -->
          <button class="px-2 bg-teal-600">+</button> <!-- Increase quantity -->
        </div>
        <!-- Fourth Column: Total Price -->
        <div class="w-1/6 text-right">
          <p class="font-semibold">$</p> <!-- Total price of the product with .toFixed() -->
        </div>
      </div>

      <!-- Summary Row -->
      <div class="pt-4 mt-4">
        <div class="flex justify-between mb-2">
          <p class="font-semibold">Subtotal:</p>
          <p>$</p> <!-- Total in the cart -->
        </div>
        <div class="flex justify-between mb-2">
          <p class="font-semibold">Sales Tax:</p>
          <p>$</p>  <!-- Salestax in the cart -->
        </div>
        <div class="flex justify-between mb-2">
          <p class="font-semibold">Coupon Code:</p>
          <input type="text" class="border p-1 pr-2 bg-[#181818] text-right w-28" placeholder="Enter code"> <!-- Coupon code -->
           </div>
        <div class="flex justify-between mb-4">
          <p class="font-semibold">Grand Total:</p>
          <p>$</p>  <!-- Grand total in the cart -->
        </div>
        <div class="flex justify-end">
          <button class="p-2 text-white bg-orange-600 rounded hover:bg-orange-700" >Buy Now</button> <!-- Checkout button on click -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
