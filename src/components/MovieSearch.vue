<template>
  <div>
    <span class="md-display-3">Add Movie</span>
    <br>
    <md-divider />
    <br>
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-field>
        <label for="movie-search">Search Move Title</label>
        <md-input
          v-model="searchInput"
          @input="sendSearchReq"
          name="movie-search"
          id="movie-search"
        />
      </md-field>
    </md-card>
    <ul class="results-list">
      <li
        v-for="movie in movies"
        :key="movie.imdbID"
      >
        <MovieSearchCard
          :title="movie.Title"
          :year="movie.Year"
          :imdb-i-d="movie.imdbID"
          :img-u-r-l="movie.Poster"
          :exists="movie.exists"
        />
      </li>
    </ul>
    <div>
      <md-progress-bar
        v-if="isSearching"
        md-mode="query"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { movieSearch } from '@/service/service'
import MovieSearchCard from '@/components/MovieSearchCard'

export default {
  name: 'MovieSearch',
  data: () => ({
    searchInput: '',
    isSearching: false,
    movies: []
  }),
  components: {
    MovieSearchCard
  },
  created () {
    this.sendSearchReq = _.debounce(this.sendSearchReq, 500)
  },
  methods: {
    sendSearchReq () {
      this.isSearching = true
      movieSearch(this.searchInput, this.$root.$data.userToken)
        .then((resp) => {
          this.movies = resp
        })
        .catch(() => {
          console.log('Error')
        })
        .finally(() => {
          this.isSearching = false
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
