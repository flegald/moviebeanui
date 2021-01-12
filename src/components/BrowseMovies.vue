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
    <ul
      class="results-list"
      v-if="!isLoading"
    >
      <li
        v-for="movie in allMovies"
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
import { getAllMovies } from "@/service/service";
import { getRatingAverage, sortAlpha, sortHighLow, sortLowHigh, sortTotalReviews } from "@/utils/utils";
import MovieSearchCard from "@/components/MovieSearchCard";

export default {
  name: "BrowseMovies",
  data: () => ({
    allMovies: [],
    sortValue: "alpha",
    isLoading: false
  }),
  methods: {
    retrieveMovies() {
      this.isLoading = true
      getAllMovies(this.$root.$data.userToken, "?reviews=true").then((r) => {
        this.allMovies = r.map((m) => {
          return {
            movieBeanRating: getRatingAverage(m.ratings),
            numReviews: m.ratings.length,
            ...m
          }
        })
        this.allMovies = sortAlpha(this.allMovies)
        this.isLoading = false
      })
    },
    sortList() {
      switch (this.sortValue) {
        case "alpha":
          this.allMovies = sortAlpha(this.allMovies)
              break
        case "rating-high-low":
          this.allMovies = sortHighLow(this.allMovies)
              break
        case "rating-low-high":
          this.allMovies = sortLowHigh(this.allMovies)
              break
        case "num-reviews":
          this.allMovies = sortTotalReviews(this.allMovies)
              break
      }

    }
  },
  beforeMount() {
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