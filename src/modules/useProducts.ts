import { ref } from 'vue';

interface Product {
   id: string,
   name: string,
   description: string,
   imageURL: string,
   price: number,
   stock: number,
   discount: boolean,
   discountPct: number,
   isHidden: boolean
}

export const useProduct = () => {
   
};