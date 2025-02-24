<script setup lang="ts">
import { ref } from 'vue';
import { useUsers } from '@/modules/auth/useUsers';

const { fetchToken, registerUser, logout,  name, email, password, user } = useUsers();

const registerDialog = ref<HTMLDialogElement | null>(null);

const toggleRegisterDialog = () => {
  if (registerDialog.value) {
    registerDialog.value.open ? registerDialog.value.close() : registerDialog.value.show();
  }
}
</script>

<template>
  <div class="flex h-max">
    <!-- Left side with background image -->
    <div class="w-1/2 bg-center bg-cover" style="background-image: url('https://picsum.photos/800/1200'); background-color: var(--vt-c-black, #181818);"></div>

    <!-- Right side with login and register forms -->
    <div class="w-1/2 bg-[#181818] flex-grow text-gray-300 flex flex-col p-8">
      <!-- Top part: Login and Logout -->
      <div>
        <p class="mb-4 text-2xl">Login / Logout</p>
        <input type="text" class="p-2 m-2 text-gray-300 bg-transparent border-b border-gray-500 focus:outline-none" placeholder="Email" v-model="email"  /> 
        <input type="password" class="p-2 m-2 text-gray-300 bg-transparent border-b border-gray-500 focus:outline-none" placeholder="Password" v-model="password" /> 
        <button class="bg-[#1E40AF] text-white p-2 rounded hover:bg-[#1E3A8A] w-full mt-4" @click="fetchToken(email, password)">Login</button> <!-- Login button -->
        <button class="bg-[#4B5563] text-white p-2 rounded hover:bg-[#374151] w-full mt-2" @click="logout">Logout</button> <!-- Logout button -->
      </div>

      <!-- Lower part: Register -->
      <div class="register-block">
        <p class="mt-24 mb-4 text-2xl cursor-pointer flex-nowrap" @click="toggleRegisterDialog">Click to register</p> <!-- Register button -->
        <dialog ref="registerDialog">
          <form class="flex flex-wrap">
            <input type="text" class="flex-1 p-2 m-2 text-gray-300 bg-transparent border-b border-gray-500 focus:outline-none" placeholder="Name" v-model="name" />
            <input type="text" class="flex-1 p-2 m-2 text-gray-300 bg-transparent border-b border-gray-500 focus:outline-none" placeholder="Email" v-model="email" />
            <input type="password" class="flex-1 w-full p-2 m-2 text-gray-300 bg-transparent border-b border-gray-500 focus:outline-none" placeholder="Password" v-model="password"  /> 
            <button class="bg-[#10B981] text-white p-2 rounded hover:bg-[#059669] w-full mt-4" @click.prevent="registerUser(name, email, password)">Register</button> <!-- Register button -->
          </form>
          <button class="w-full p-2 mt-2 text-white bg-red-600 rounded hover:bg-red-700" @click="toggleRegisterDialog">Close</button> <!-- Close button -->
        </dialog>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-block {

  display: flex;
  position: relative;
}


dialog {
  background-color: var(--vt-c-black, #181818);
  border-left: 1px solid var(--vt-c-gray-500, #9CA3AF);
  padding: 1rem;
  position: absolute;
  top:8rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
dialog[open] {
  opacity: 1;
  pointer-events: inherit;
}
dialog::backdrop {
  background-color: rgba(0,0,255, 0.2);
}
</style>
