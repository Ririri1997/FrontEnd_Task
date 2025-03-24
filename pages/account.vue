<template>
  <header>
   <p>Добро пожаловать!</p>
   <Button  @click="logout" class="button">Выйти</Button>
  </header>
  <h2>Товары</h2>

  <!-- Фильтры -->
  <div class="filters">
   <div class="filter">

    <label for="date-filter">Фильтр по дате:</label>
    <input type="date" v-model="dateFilter" />
   </div>
   
   <div class="filter">
   <label for="status-filter">Фильтр по статусу:</label>
   <select v-model="statusFilter">
    <option value="all">Все</option>
    <option value="available">Доступно</option>
    <option value="sold out">Продано</option>
   </select>
  </div>
  <div class="filter">
   <label for="category-filter">Фильтр по категории:</label>
   <select v-model="categoryFilter">
    <option value="">Все</option>
    <option value="Electronics">Электроника</option>
    <option value="Clothing">Одежда</option>
    <option value="Furniture">Мебель</option>
    <option value="Accessories">Аксессуары</option>
   </select>
  </div>
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
   <tr v-for="item in store.filteredProducts(statusFilter, categoryFilter, dateFilter)" :key="item.id">

    <td>{{ item.id }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.category }}</td>
    <td>{{ item.price }}</td>
    <td>{{ item.status }}</td>
    <td>{{ item.date_created }}</td>
   </tr>
  </tbody>
 </table>
</template>


<script setup lang="ts">
import { useProductsStore } from "~/stores/useProductsStore";
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useProductsStore();

const statusFilter = ref<"available" | "sold out" | "all">("all");
const categoryFilter = ref<string>("");
const dateFilter = ref<string>("");

onMounted(() => {
 store.fetchProducts();
});

const logout = () => {
 localStorage.removeItem('user');
 router.push('/login');
};
</script>

<!-- о стилях позабучусь чуть позже -->
<style scoped lang="sass">

header
 padding: 24px 0px
 width: 100%
 display: flex
 align-items: center
 justify-content: space-between
 p
  margin: 0
  line-height: 100%
  font-size: 24px

table 
 background-color: #dcebf9
 border-collapse: collapse
 width: 100%
thead
 background-color: #1976d2	
 color: #ffffff
th
 padding: 8px 12px
td
 padding: 4px 12px
tr 
 border-bottom: 1px solid #000000
.filters 
 margin-bottom: 1rem


.filters 
 display: flex
 .filter
  margin-right: 24px
  label 
   margin-right: 10px

 
  

</style>
