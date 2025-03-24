import { defineStore } from "pinia";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: "available" | "sold out";
  date_created: string;
}


export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    async fetchProducts() {
      try {    
        const { data } = await useFetch<Product[]>("/api/products");
        if (data.value) this.products = data.value;
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      }
    },
  },
  getters: {
   filteredProducts: (state) => (status: string, category: string, date: string) => {
     return state.products.filter((product) => {
       const matchesStatus = status === "all" || product.status === status;
       const matchesCategory = !category || product.category === category;
       const matchesDate = !date || product.date_created === date;

       return matchesStatus && matchesCategory && matchesDate;
     });
   },
 },
});
