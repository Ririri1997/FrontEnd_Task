<template>
 <div>
  <h2>Вход</h2>
  <input v-model="username" placeholder="Логин" />
  <input v-model="password" type="password" placeholder="Пароль" />
  <button @click="login">Войти</button>
  <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
 </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const login = async () => {
 // Загружаем JSON с пользователями. Вообще не безопасное хранение 
 const { data: users } = await useFetch('/users.json');

 // Ищем пользователя
 const user = users.value.find(u =>
  u.credentials.username === username.value &&
  u.credentials.passphrase === password.value
 );

 if (user && user.active) {
  localStorage.setItem('user', JSON.stringify(user));
  router.push('/account');
 } else {
  errorMessage.value = 'Неверные данные или аккаунт не активен';
 }
};
</script>

<style scoped>
.error {
 color: red;
}
</style>
