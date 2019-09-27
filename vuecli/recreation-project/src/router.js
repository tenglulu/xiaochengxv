import Vue from 'vue'
import Router from 'vue-router'
import Movie from './views/movie/Movie.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'movie',
      component: Movie
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('./views/music/Music.vue')
    },
    {
      path: '/book',
      name: 'book',
      component: () => import('./views/book/Book.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('./views/chat/Chat.vue')
    },
    {
      path:'/bookdetail',
      name:'bookdetail',
      component: () => import('./views/book/BookDetail.vue')
    }
  ]
})
