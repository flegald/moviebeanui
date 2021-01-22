<template>
  <div class="page-container md-layout-column">
    <NavDrawer />
    <div
      v-if="$root.$data.userLoggedIn"
      style="padding: 10px"
    >
      <component :is="$root.$data.pageView" />
    </div>
  </div>
</template>

<script>
import NavDrawer from '@/components/NavDrawer'
import MovieSearch from '@/components/MovieSearch'
import MovieDetails from '@/components/MovieDetails/MovieDetails'
import BrowseMovies from '@/components/BrowseMovies'
import MyReviews from '@/components/MyReviews'
import LoginView from '@/components/LoginView'
import Watchlist from '@/components/Watchlist'
import Feed from '@/components/Feed'
import Settings from '@/components/Settings'

import { getUserProfile } from '@/service/service'

export default {
  name: 'App',
  components: {
    MovieSearch,
    NavDrawer,
    MovieDetails,
    BrowseMovies,
    MyReviews,
    LoginView,
    Watchlist,
    Feed,
    Settings
  },
  beforeMount () {
    this.appInit()
  },
  methods: {
    appInit () {
      const token = this.$root.$data.initializeSession()
      if (token) {
        getUserProfile(token).then((resp) => {
          this.$root.$data.setUserSession(resp)
          this.$root.$data.setPageView('Feed')
        })
      } else {
        this.$root.$data.setPageView('LoginView')
      }
    }
  }
}
</script>
