<template>
  <div
    v-if="$root.$data.userLoggedIn"
    class="nav-drawer"
  >
    <md-toolbar class="md-primary">
      <md-button
        class="md-icon-button"
        @click="showNavigation = true"
      >
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Movie Bean</span>
    </md-toolbar>

    <md-drawer
      :md-active.sync="showNavigation"
      md-swipeable
    >
      <md-toolbar
        class="md-transparent"
        md-elevation="0"
      >
        <md-icon>local_movies</md-icon>
      </md-toolbar>

      <md-list>
        <md-list-item
          @click="navigate('Feed')"
        >
          <md-icon>list_alt</md-icon>
          <span class="md-list-item-text">Feed</span>
        </md-list-item>

        <md-list-item
          @click="navigate('MyReviews')"
        >
          <md-icon>person</md-icon>
          <span class="md-list-item-text">My Reviews</span>
        </md-list-item>

        <md-list-item
          @click="navigate('Watchlist')"
        >
          <md-icon>personal_video</md-icon>
          <span class="md-list-item-text">My Watchlist</span>
        </md-list-item>

        <md-list-item
          @click="navigate('BrowseMovies')"
        >
          <md-icon>thumbs_up_down</md-icon>
          <span class="md-list-item-text">Browse Reviews</span>
        </md-list-item>

        <md-list-item
          @click="navigate('MovieSearch')"
        >
          <md-icon>add_circle</md-icon>
          <span class="md-list-item-text">Add Movie</span>
        </md-list-item>

        <md-list-item
          @click="navigate('Settings')"
        >
          <md-icon>settings</md-icon>
          <span class="md-list-item-text">Settings</span>
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>

  <div v-else>
    <md-toolbar class="md-primary">
      <span class="md-title">Movie Bean</span>
    </md-toolbar>
  </div>
</template>

<script>

export default {
  name: 'NavDrawer',
  data: () => ({
    showNavigation: false
  }),
  methods: {
    navigate (page) {
      this.showNavigation = false
      this.$root.$data.setPageView(page)
    }
  }
}
</script>

<style scoped>

</style>
