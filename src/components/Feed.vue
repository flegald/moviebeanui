<template>
  <div>
    <span class="md-display-3">Recent Activity</span>
    <br>
    <md-divider />
    <br>

    <md-progress-bar
      v-if="isLoading"
      md-mode="query"
    />

    <md-list
      v-else
      class="md-triple-line"
    >
      <template
        v-for="r in feedData"
      >
        <md-list-item
          :key="`${r.movie.imdb_id}${r.user.user}${Math.random().toString().substr(2, 8)}`"
          @click="viewMovie(r.movie.imdb_id)"
        >
          <md-avatar
            v-if="r.user.profile_img"
            class="md-large"
          >
            <img
              :src="r.user.profile_img"
              alt="People"
            >
          </md-avatar>

          <md-avatar
            v-else
            class="md-large"
          >
            <img
              src="https://cdn4.iconfinder.com/data/icons/fruits-n-vegetables-128-color/128/kidney_beans_bean-512.png"
              alt="People"
            >
          </md-avatar>

          <div class="md-list-item-text">
            <span><strong>{{ r.user.user }}</strong> rated <strong>{{ r.movie.title }}</strong></span>
            <span>{{ r.rating }} / 10 Beans</span>
            <p>{{ r.comment }}</p>
          </div>
        </md-list-item>
        <md-divider :key="`${r.movie.imdb_id}${r.user.user}-divider`" />
      </template>
    </md-list>
  </div>
</template>

  <script>
    import { getFeed } from "@/service/service";

    export default {
      name: "Feed",
      data: () => ({
      feedData: [],
      isLoading: false
      }),
      methods: {
      retrieveFeed() {
        this.isLoading = true
        getFeed(this.$root.$data.userToken)
          .then((resp) => {
            this.feedData = resp
          })
        .finally(() => {
          this.isLoading = false
        })
        },
        viewMovie(imdbID) {
          this.$root.$data.setActiveMovie(imdbID)
          this.$root.$data.setPageView('MovieDetails')
        }
      },
      beforeMount() {
        this.retrieveFeed()
      }
    }
  </script>

<style scoped>
</style>