import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomePageExtendedView.vue')
    },
    {
      path: '/all-movies-sample',
      name: 'moviesample',
      component: () => import('../views/MovieSampleView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/single-movie/:imdbID',
      name: 'single-movie',
      component: () => import('../views/SingeMovieView.vue')
    },
    {
      path: '/saved-list',
      name: 'My list',
      component: () => import('../views/MovieListView.vue')
    }
  ],
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ el: '#main', behavior: 'smooth' })
      }, 1000)
    })
  }
})

export default router
