<template>
  <div>
    <span class="md-display-3">My Watchlist</span>
    <br>
    <md-divider />
    <br>

    <md-progress-bar
      v-if="isLoading"
      md-mode="query"
    />

    <ul
      class="results-list"
      v-else
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
import MovieSearchCard from '@/components/MovieSearchCard'
import { getWatchlist } from '@/service/service'

export default {
  name: 'Watchlist',
  data: () => ({
    movies: [],
    isLoading: false
  }),
  methods: {
    getUserWatchlist () {
      this.isLoading = true
      getWatchlist(this.$root.$data.userToken)
        .then((resp) => {
          this.movies = resp
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  components: {
    MovieSearchCard
  },
  beforeMount () {
    this.getUserWatchlist()
  }
}
</script>

<style scoped>
.results-list {
  list-style: none;
  padding: 0;
}
</style>
