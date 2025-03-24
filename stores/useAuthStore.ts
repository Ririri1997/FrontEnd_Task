import { defineStore } from "pinia";

interface UserCredentials {
  username: string;
  passphrase: string;
}

interface User {
  credentials: UserCredentials;
  active: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    errorMessage: "",
  }),
  actions: {
    async login(username: string, password: string) {
     const { data: users } = await useFetch<User[]>("/api/users");


      if (!username || !password) {
        this.errorMessage = "Введите данные";
        return false;
      }

      const user = users.value?.find(
        (u) =>
          u.credentials.username === username &&
          u.credentials.passphrase === password
      ) || null;

      if (user && user.active) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(user));
        this.errorMessage = "";
        return true;
      } else {
        this.errorMessage = "Неверные данные авторизации";
        return false;
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },

    checkAuth() {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      }
    },
  },
});
