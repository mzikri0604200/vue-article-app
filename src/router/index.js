import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailArtickel from '@/views/DetailArticle.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'
import PublicLayout from '@/components/layouts/PublicLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProfileView from '@/views/ProfileView.vue'
import UpdateProfileView from '@/views/UpdateProfile.vue'
import CreateProfileView from '@/views/CreateProfile.vue'
import { useAuthStore } from '@/store/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: {
        isAuth: true,
      },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: 'profile/create',
          name: 'create-profile',
          component: CreateProfileView,
        },
        {
          path: 'profile/update',
          name: 'update-profile',
          component: UpdateProfileView,
        },
      ],
    },
    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'article/:slug',
          name: 'DetailArticle',
          component: DetailArtickel,
        },
        {
          path: 'login',
          name: 'Login',
          component: LoginView,
          meta: {
            isPublic: true,
          },
        },
        {
          path: 'register',
          name: 'Register',
          component: RegisterView,
          meta: {
            isPublic: true,
          },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  if (to.meta.isAuth && !authStore.token) {
    alert('Anda belum login')
    return { name: 'Login' }
  }

  if (to.meta.isPublic && authStore.token) {
    alert('Anda Sudah login')
    return { name: 'dashboard' }
  }

  // if (to.meta.isPublic && authStore.user?.role != 'admin') {
  //   alert('Anda tidak memiliki akses')
  //   return { name: 'dashboard' }
  // }
})

export default router
