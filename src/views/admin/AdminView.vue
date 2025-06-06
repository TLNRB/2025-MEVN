<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProducts } from '@/modules/useProducts';
import type { NewProduct, Product } from '@/interfaces/interfaces';

const { products, error, loading, fetchProducts, addProduct, deleteProduct, updateProduct, getTokenAndUserId } = useProducts();

onMounted(() => {
  fetchProducts();
});

const newProduct = ref<NewProduct>({
  name: '',
  description: '',
  imageURL: '',
  price: 0,
  stock: 0,
  discount: false,
  discountPct: 0,
  isHidden: false,
  _createdBy: undefined
});

const addProductHandler = async () => {
  const { userId } = getTokenAndUserId();
  newProduct.value._createdBy = userId;

  await addProduct(newProduct.value);
}

const updateProductHandler = async (product: Product) => {
  const { _id, ...updatedProduct } = product;
  await updateProduct(product._id, updatedProduct);
}
</script>

<template>
  <div class="bg-[#181818] min-h-screen lazy-css">
    <h1 class="mb-8 text-3xl font-bold">Admin View</h1>
    <div v-if="loading" class="text-center">Loading...</div> <!-- Loading wait screen -->
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div> <!-- Error message -->
    <div  class="flex flex-wrap -mx-2"> <!-- add new product section -->
    <div class="w-full p-2 my-8">
      <h2 class="mb-4 text-2xl font-semibold">Add Product</h2>
      <form @submit.prevent="addProductHandler"> <!-- Add product form -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input type="text" placeholder="Name" v-model="newProduct.name" class="p-2 border rounded" /> <!-- Product name -->
          <span  class="absolute ml-2 text-xs text-red-500">Can't be empty</span> <!-- Error message & validate -->

          <input type="text" placeholder="Description" v-model="newProduct.description" class="p-2 border rounded" /> <!-- Product description -->
          <div class="p-2 border rounded">

            <span class="font-bold uppercase">Product Price: </span>
            <input type="number"  placeholder="Price" v-model="newProduct.price" class="pl-2 " /> <!-- Product price -->
          </div>
          <div class="p-2 border rounded">

            <span class="font-bold uppercase">Product Stock: </span>
            <input type="number"  placeholder="Stock" v-model="newProduct.stock" class="pl-2 " />  <!-- Product stock -->
          </div>
          <div class="flex items-center p-2 border rounded">

            <input type="checkbox" v-model="newProduct.discount" class="w-6 h-6 mr-2 border rounded" /> <span class="font-bold uppercase">Discount in %:</span> <!-- Discount in % -->
            <input type="number" v-model="newProduct.discountPct" placeholder="Discount %" class="pl-2 ml-2 " /> <!-- Discount % -->
          </div>
          <div class="flex items-center p-2 border rounded ">
            <input type="checkbox" v-model="newProduct.isHidden" class="w-6 h-6 p-2 mr-2 border rounded" /> <span class="font-bold uppercase">Hidden product</span> <!-- Hidden product -->
          </div>
          <input type="text" placeholder="Image URL" v-model="newProduct.imageURL" class="h-10 p-2 border rounded" /> <!-- Image URL -->

        </div>
        <button type="submit" class="p-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>

    <!-- Edit existing products -->
    <div class="w-full p-2 my-8">

      <h2 class="mb-4 text-2xl font-semibold">Products</h2>
      <div v-for="product in products" :key="product._id" class="mb-4 p-4 border rounded bg-[#181818]"> <!-- Loop through the products -->
         <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input type="text" placeholder="Name" v-model="product.name" class="p-2 border rounded" /> <!-- Product name -->
          <input type="text" placeholder="Description" v-model="product.description" class="p-2 border rounded" /> <!-- Product description -->
          <div class="p-2 border rounded">

            <span class="font-bold uppercase">Product Price: </span>
            <input type="number" placeholder="Price" v-model="product.price" class="pl-2 " /> <!-- Product price -->
          </div>
          <div class="p-2 border rounded">

            <span class="font-bold uppercase">Product Stock: </span>
            <input type="number"  placeholder="Stock" v-model="product.stock" class="pl-2 " /> <!-- Product stock -->
          </div>
          <div class="flex items-center p-2 border rounded">

            <input type="checkbox" v-model="product.discount" class="w-6 h-6 mr-2 border rounded" /> <span class="font-bold uppercase">Discount in %:</span> <!-- Discount in % -->
            <input type="number"  placeholder="Discount %" v-model="product.discountPct" class="pl-2 ml-2 " /> <!-- Discount % -->
          </div>
          <div class="flex items-center p-2 border rounded ">
            <input type="checkbox" v-model="product.isHidden"  class="w-6 h-6 p-2 mr-2 border rounded" /> <span class="font-bold uppercase">Hidden product</span> <!-- Hidden product -->
          </div>
          <input type="text" v-model="product.imageURL" placeholder="Image URL" class="h-10 p-2 border rounded" /> <!-- Image URL -->
          <span>
            Thumbnail img: <img :src="product.imageURL" alt="Product Image" class="object-cover w-24 h-24 mb-4 rounded-lg"> <!-- Product image -->
          </span>
        </div>

        <div class="flex mt-4 space-x-2"> <!-- Update and delete buttons -->
          <p>ID:  </p> <!-- Product ID for testing -->
          <button @click="deleteProduct(product._id)"  class="p-2 text-white bg-red-600 rounded hover:bg-red-700">Delete</button> <!-- Delete button -->
          <button @click="updateProductHandler(product)"  class="p-2 text-white bg-green-600 rounded hover:bg-green-700">Edit</button> <!-- Edit button -->
         </div>
      </div>
    </div>
  </div>
     <!-- Custom confirmation dialog -->

  </div>
</template>

<style scoped>
input {
  background-color: #2b2b2b;
}

.lazy-css {
  color: #969696 ;
}

input[type=checkbox] {
  accent-color: var(--input-field-color);
}

</style>
