import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setAuth(token, user) {
      this.token = token
      this.user = user
    },
    removeAuth() {
      this.token = null
      this.user = null
    },
  },
  persist: true,
})
