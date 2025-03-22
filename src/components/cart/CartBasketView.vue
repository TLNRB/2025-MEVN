<script setup lang="ts">
import { useCart } from '@/modules/cart/useCart';

const { cart, updateQuantity } = useCart();

const isVisible = defineModel<boolean>('isVisible'); 

const toggleCart = (): void => {
  isVisible.value = !isVisible.value;
}


</script>


<template>
    <transition name="fade-slide">
      <div v-if="isVisible" @click.self="toggleCart" class="fixed inset-0 flex justify-end bg-black bg-opacity-50" > <!-- Overlay + toggleCart -->
        <div @click.stop class="cart-content bg-[#181818] w-96 h-full p-4 overflow-y-auto" > <!-- Cart content & .stop -->
          <!-- top close X -->
          <button @click="toggleCart" class="absolute text-4xl text-red-400 top-3 right-4 hover:text-red-700">&times;</button> <!-- Close button -->

          <h2 class="mb-4 text-2xl font-bold">Cart</h2>
          <div v-for="item in cart" :key="item._id" class="mb-4"> <!-- Loop through the cart items -->

            <div class="flex pb-2">
              <img :src="item.imageURL"  alt="Product Image" class="object-cover h-24 rounded-lg w-28"> <!-- Product image -->
              <div class="flex flex-col justify-between ml-2">
                <div>
                  <p class="font-semibold">{{ item.name }}</p> <!-- Product name -->
                  <p>Price: {{ item.price.toFixed(2) }}</p> <!-- Product price -->
                  <p>Total:  </p> <!-- Total price of the product -->
                </div>
                <div class="flex items-center">
                  <button @click="updateQuantity(item._id, item.quantity - 1)"  class="px-2 bg-orange-600">-</button>  <!-- Decrease quantity -->
                  <span class="mx-2">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item._id, item.quantity + 1)"  class="px-2 bg-teal-600">+</button>   <!-- Increase quantity -->
                </div>

              </div>

            </div>
          </div>

          <p v-if="cart.length === 0" class="text-center">Cart is empty</p> <!-- If cart is empty -->

          <div class="pt-4 border-t ">
            <p class="font-semibold text-right">Subtotal: $ </p> <!-- Total in the cart -->
            <p class="font-semibold text-right">Sales tax: $ </p> <!-- Salestax in the cart -->
            <p class="font-semibold">Coupon Code:</p>
            <input type="text" class="border p-1 pr-2 bg-[#181818] text-right w-28" placeholder="Enter code"> <!-- Coupon code -->
            <p class="font-semibold text-right">Grand Total: $ </p> <!-- Grand total in the cart -->
            <div class="flex justify-end">
              <button class="p-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700">Checkout</button> <!-- Checkout button on click -->
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
}

.cart-content {
  transition: transform 0.3s ease-in-out;
}

.fade-slide-enter-from .cart-content, .fade-slide-leave-to .cart-content {
  transform: translateX(100%);
}
</style>
