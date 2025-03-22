<template>
 <div>
  <h2>Вход</h2>
  <input v-model="username" placeholder="Логин" />
  <input v-model="password" type="password" placeholder="Пароль" />
  <button @click="login">Войти</button>
  <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
 </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface UserCredentials {
 username: string;
 passphrase: string;
}
interface User {
 credentials: UserCredentials;
 active: boolean;
}

const username = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');
const router = useRouter();

const login = async () => {
 // Загружаем JSON с пользователями. Вообще не безопасное хранение 
 const { data: users } = await useFetch<User[]>('/users.json');

 // захотелось добавить чуть-чуть валидации 
 if (!username.value || !password.value) {
  errorMessage.value = 'Введите данные';
  return
 }
 // Ищем пользователя
 const user: User | null = users.value?.find((u: User) =>
  u.credentials.username === username.value &&
  u.credentials.passphrase === password.value
 ) || null;

 if (user && user.active) {
  localStorage.setItem('user', JSON.stringify(user));
  router.push('/account');
 } else {
  errorMessage.value = 'Введены неверные данные авторизации. Попробуйте ещё раз';
 }
};
</script>

<style scoped>
.error {
 color: red;
}
</style>
