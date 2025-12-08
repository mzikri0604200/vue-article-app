import { defineStore } from 'pinia'
const THEME_KEY = 'app-theme'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: localStorage.getItem(THEME_KEY) || 'light',
    availableThemes: ['light', 'dark', 'synthwave', 'cyberpunk', 'valentine'],
  }),
  actions: {
    setTheme(newTheme) {
      this.theme = newTheme
      localStorage.setItem(THEME_KEY, newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    },
    initTheme() {
      const savedTheme = localStorage.getItem(THEME_KEY)
      const theme = savedTheme || 'light'
      this.theme = theme
      document.documentElement.setAttribute('data-theme', theme)
    },
  },
})
