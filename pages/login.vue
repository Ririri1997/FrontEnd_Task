<template>
 <div>
  <h2>Вход</h2>
  <div class="auth">

  <input v-model="username" placeholder="Логин" />
  <input v-model="password" type="password" placeholder="Пароль" />

  <Button @click="handleLogin">Войти</Button>
  <p v-if="authStore.errorMessage" class="error">{{ authStore.errorMessage }}</p>
 </div>
 </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/useAuthStore";

const authStore = useAuthStore();
const router = useRouter();

const username = ref<string>("");
const password = ref<string>("");

const handleLogin = async () => {
  const success = await authStore.login(username.value, password.value);
  if (success) {
    router.push("/account");
  }
};
</script>

<style scoped lang="sass">
.auth 
 display: flex 
 flex-direction: column  
 max-width: 240px
 input 
  padding: 8px 24px
  border-radius: 4px
  width: 100%
  max-width: 240px
  margin-bottom: 12px
  background-color: #dcebf9 
  border: none
.error 
 color: red

</style>
