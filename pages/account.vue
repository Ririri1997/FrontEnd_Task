<template>
 <div>
  <p>Это страница для авторизованных людишек </p>
  <button @click="logout">Выйти</button>

 </div>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
 localStorage.removeItem('user');
 router.push('/login');
};
</script>