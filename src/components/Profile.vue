<template>
  <div>
    <span class="md-display-3">My Reviews</span>
    <br>
    <md-divider />
    <br>
    <md-progress-bar
      v-if="isLoading"
      md-mode="query"
    />
    <ul
      v-else
      class="results-list"
    >
      <li
        v-for="movie in movies"
        :key="movie.imdbID"
      >
        <MovieSearchCard
          :title="movie.title"
          :year="movie.released"
          :imdb-i-d="movie.imdb_id"
          :img-u-r-l="movie.img_url"
          :exists="true"
          :user-review="movie.rating"
        />
      </li>
    </ul>
    <div id="junk">{{junkText}}</div>
  </div>
</template>

<script>

import { getAllUserReviews, getAllMovies } from "@/service/service";
import MovieSearchCard from "@/components/MovieSearchCard";

export default {
  name: "Profile",
  data: () => ({
    movies: [],
    isLoading: false,
    junkText: ''
  }),
  methods: {
    retrieveReviews() {
      this.isLoading = true
      getAllUserReviews(this.$root.$data.userToken)
          .then((r) => {
            const imdb_ids = r.map((r) => r.movie)
            getAllMovies(this.$root.$data.userToken, `?ids=${imdb_ids}`)
            .then((resp) => {
              this.movies = resp.map((m) => {
                return {
                  rating: r.filter((r) => r.movie === m.imdb_id)[0].rating,
                  ... m
                }
              })
            }).finally(() => {
              this.isLoading = false
            })
          })
    }
  },
  beforeMount() {
    this.retrieveReviews()
  },
  components: {
    MovieSearchCard
  }
}
</script>

<style scoped>
.results-list {
  list-style: none;
  padding: 0;
}
</style>