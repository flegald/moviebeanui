import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '@/components/LoginView'
import Feed from '@/components/Feed'
import Watchlist from '@/components/Watchlist'
import BrowseMovies from '@/components/BrowseMovies'
import CreateAccount from '@/components/CreateAccount'
import MyReviews from '@/components/MyReviews'
import Settings from '@/components/Settings'
import MovieSearch from '@/components/MovieSearch'
import MovieDetails from '@/components/MovieDetails/MovieDetails'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: LoginView },
    { path: '/feed', component: Feed },
    { path: '/watchlist', component: Watchlist },
    { path: '/browsemovies', component: BrowseMovies },
    { path: '/createaccount', component: CreateAccount },
    { path: '/myreviews', component: MyReviews },
    { path: '/settings', component: Settings },
    { path: '/moviesearch', component: MovieSearch },
    { path: '/moviedetails', component: MovieDetails },
    {
      path: '/:catchAll(.*)',
      component: LoginView
    }]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !localStorage.getItem('mb.auth')) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
