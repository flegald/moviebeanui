<template>
  <div>
    <span class="md-display-3">Recent Activity</span>
    <br>
    <md-divider />
    <br>

    <md-list class="md-triple-line">
      <md-list-item v-for="r in feedData" :key="`${r.movie.imdb_id}${r.user}`" @click="viewMovie(r.movie.imdb_id)">
<!--        <md-avatar>-->
<!--          <img src="https://placeimg.com/40/40/people/1" alt="People">-->
<!--        </md-avatar>-->

        <div class="md-list-item-text">
          <span><strong>{{r.user}}</strong> rated <strong>{{r.movie.title}}</strong></span>
          <span>{{r.rating}} / 10 Beans</span>
          <p>{{r.comment}}</p>
        </div>

        <md-divider class="md-inset"></md-divider>
      </md-list-item>
    </md-list>
  </div>
</template>

  <script>
    import { getFeed } from "@/service/service";

    export default {
      name: "Feed",
      data: () => ({
      feedData: []
      }),
      methods: {
      retrieveFeed() {
        getFeed(this.$root.$data.userToken)
          .then((resp) => {
            this.feedData = resp
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

  <style scoped />