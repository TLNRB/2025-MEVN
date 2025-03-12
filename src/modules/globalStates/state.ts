import { reactive, watch } from 'vue';

const isLoggedInFromLocalStorage: boolean = localStorage.getItem('isLoggedIn') === 'true';

export const state = reactive({
   isLoggedIn: isLoggedInFromLocalStorage
})

watch(() => state.isLoggedIn, (newValue) => {
   localStorage.setItem('isLoggedIn', newValue.toString());
});
