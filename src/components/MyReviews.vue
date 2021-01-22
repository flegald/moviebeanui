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
  </div>
</template>

<script>

import { getAllUserReviews, getAllMovies } from '@/service/service'
import MovieSearchCard from '@/components/MovieSearchCard'

export default {
  name: 'MyReviews',
  components: {
    MovieSearchCard
  },
  data: () => ({
    movies: [],
    isLoading: false
  }),
  beforeMount () {
    this.retrieveReviews()
  },
  methods: {
    retrieveReviews () {
      this.isLoading = true
      getAllUserReviews(this.$root.$data.userToken)
        .then((r) => {
          const imdbIds = r.map((r) => r.movie)
          getAllMovies(this.$root.$data.userToken, `?ids=${imdbIds}`)
            .then((resp) => {
              this.movies = resp.map((m) => {
                return {
                  rating: r.filter((r) => r.movie === m.imdb_id)[0].rating,
                  ...m
                }
              })
            }).finally(() => {
              this.isLoading = false
            })
        })
    }
  }
}
</script>

<style scoped>
.results-list {
  list-style: none;
  padding: 0;
}
</style>
