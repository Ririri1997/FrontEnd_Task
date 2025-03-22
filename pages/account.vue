<template>
 <div>
  <p>Это страница для авторизованных людишек </p>
  <button @click="logout">Выйти</button>
  <h2>Товары</h2>

  <!-- Фильтры -->
  <div class="filters">
   <label for="date-filter">Фильтр по дате:</label>
   <input type="date" v-model="dateFilter" />

   <label for="status-filter">Фильтр по статусу:</label>
   <select v-model="statusFilter">
    <option value="all">Все</option>
    <option value="available">Доступно</option>
    <option value="sold out">Продано</option>
   </select>

   <label for="category-filter">Фильтр по категории:</label>
   <select v-model="categoryFilter">
    <option value="">Все</option>
    <option value="Electronics">Электроника</option>
    <option value="Clothing">Одежда</option>
    <option value="Furniture">Мебель</option>
    <option value="Accessories">Аксессуары</option>
   </select>
  </div>

  <!-- Таблица -->
  <table>
   <thead>
    <tr>
     <th>ID</th>
     <th>Название</th>
     <th>Категория</th>
     <th>Цена</th>
     <th>Статус</th>
     <th>Дата создания</th>
    </tr>
   </thead>
   <tbody>
    <tr v-for="item in filteredProducts" :key="item.id">
     <td>{{ item.id }}</td>
     <td>{{ item.name }}</td>
     <td>{{ item.category }}</td>
     <td>{{ item.price }}</td>
     <td>{{ item.status }}</td>
     <td>{{ item.date_created }}</td>
    </tr>
   </tbody>
  </table>
 </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';

const router = useRouter();

const logout = () => {
 localStorage.removeItem('user');
 router.push('/login');
};

interface Product {
 id: number;
 name: string;
 category: string;
 price: number;
 status: 'available' | 'sold out';
 date_created: Date;
}

const dateFilter = ref<Date>();
const statusFilter = ref<"sold out" | "available"  | "all">('all');
const categoryFilter = ref<string>('');
const products = ref<Product[]>([]);

const getProducts = async () => {
  const { data, error } = await useFetch<Product[]>('/products.json');
  if (error.value) {
    console.error('Ошибка при загрузке данных:', error.value);
  } else {
    products.value = data.value || [];
  }
};

onMounted(() => {
  getProducts();
});


// Вычисляем отфильтрованные товары
const filteredProducts = computed(() => {
  return products.value.filter((product: Product) => {
    const matchesDate = 
    dateFilter.value ? product.date_created === dateFilter.value : true;
   
    const matchesStatus =
      statusFilter.value === 'all' || product.status === statusFilter.value;

    const matchesCategory = categoryFilter.value
      ? product.category === categoryFilter.value
      : true;

    return matchesDate && matchesStatus && matchesCategory;
  });
});
</script>

<style scoped>
.filters {
 margin-bottom: 1rem;
}

.filters label {
 margin-right: 0.5rem;
}
</style>
