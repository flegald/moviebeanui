<template>
  <div>
    <span class="md-display-3">Browse</span>
    <br>
    <md-divider />

    <md-progress-bar
      v-if="isLoading"
      md-mode="query"
    />

    <md-field v-if="!isLoading">
      <label for="sort">Sort</label>
      <md-select
        v-model="sortValue"
        name="sort"
        id="sort"
        @md-selected="sortList"
      >
        <md-option value="alpha">
          Alphabetically
        </md-option>
        <md-option value="num-reviews">
          Total Reviews
        </md-option>
        <md-option value="rating-high-low">
          Rating (high -> low)
        </md-option>
        <md-option value="rating-low-high">
          Rating (low -> high)
        </md-option>
      </md-select>
    </md-field>

    <md-field>
      <label for="filterGenre">Genres</label>
      <md-select
        v-model="selectedGenres"
        name="filterGenre"
        id="filterGenre"
        @md-selected="filterMovies"
        multiple
      >
        <md-option
          v-for="genre in allGenres"
          :value="genre"
          :key="genre"
        >
          {{ genre }}
        </md-option>
      </md-select>
    </md-field>

    <ul
      class="results-list"
      v-if="!isLoading"
    >
      <li
        v-for="movie in filteredResults"
        :key="movie.imdbID"
      >
        <MovieSearchCard
          :title="movie.title"
          :year="movie.released"
          :imdb-i-d="movie.imdb_id"
          :img-u-r-l="movie.img_url"
          :exists="true"
          :movie-bean-rating="movie.movieBeanRating"
          :num-of-reviews="movie.numReviews"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { getAllMovies } from '@/service/service'
import {
  getRatingAverage,
  sortMoviesAlpha,
  sortHighLow,
  sortLowHigh,
  sortTotalReviews,
  sortArrayAlpha, filterGenre
} from '@/utils/utils'
import MovieSearchCard from '@/components/MovieSearchCard'

export default {
  name: 'BrowseMovies',
  data: () => ({
    allMovies: [],
    allGenres: [],
    selectedGenres: [],
    filteredResults: [],
    sortValue: 'alpha',
    filterGenre: '',
    isLoading: false
  }),
  methods: {
    retrieveMovies () {
      this.isLoading = true
      getAllMovies(this.$root.$data.userToken, '?reviews=true').then((r) => {
        for (const m of r) {
          const movieGenres = m.genre.split(',').map(g => g.trim())
          this.allGenres = this.allGenres.concat(movieGenres)
          this.allMovies.push({
            movieBeanRating: getRatingAverage(m.ratings),
            numReviews: m.ratings.length,
            genreArray: movieGenres,
            ...m
          })
        }
        this.allGenres = sortArrayAlpha(Array.from(new Set(this.allGenres)))
        this.allMovies = sortMoviesAlpha(this.allMovies)
        this.filteredResults = this.allMovies
        this.isLoading = false
      })
    },
    sortList () {
      switch (this.sortValue) {
        case 'alpha':
          this.filteredResults = sortMoviesAlpha(this.filteredResults)
          break
        case 'rating-high-low':
          this.filteredResults = sortHighLow(this.filteredResults)
          break
        case 'rating-low-high':
          this.filteredResults = sortLowHigh(this.filteredResults)
          break
        case 'num-reviews':
          this.filteredResults = sortTotalReviews(this.filteredResults)
          break
      }
    },
    filterMovies () {
      this.filteredResults = filterGenre(this.selectedGenres, this.allMovies)
      console.log(this.filteredResults)
    }
  },
  beforeMount () {
    this.retrieveMovies()
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
