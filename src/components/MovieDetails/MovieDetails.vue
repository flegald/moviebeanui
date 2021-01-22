<template>
  <div>
    <md-progress-bar
      v-if="isLoading.one || isLoading.two"
      md-mode="query"
    />
    <div v-else>
      <md-card>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">
              {{ movie.title }}
            </div>
            <div class="md-subhead">
              <p>{{ movie.genre }}</p>

              <p>{{ movie.released }}</p>

              <p>{{ movie.runtime }}</p>
            </div>
          </md-card-header-text>

          <md-card-media md-medium>
            <img
              :src="movie.img_url"
              alt="Poster"
            >
          </md-card-media>
        </md-card-header>

        <md-card-content>
          <br>
          <div>
            <span class="md-subheading">
              <span class="md-body-2">IMDB Rating:</span>
              {{ movie.imdb_rating }} / 10
            </span>
            <br>
            <span class="md-subheading">
              <span class="md-body-2">Movie Bean Rating:</span>
              {{ movieBeanRating }} / 10
            </span>
            <br>
            <span class="md-subheading">
              <a
                :href="`https://www.imdb.com/title/${movie.imdb_id}`"
                target="_blank"
              >
                <span class="md-body-2">View on IMDB</span></a>
            </span>
            <p>{{ movie.plot }}</p>

            <StreamingPlatforms :platforms="movie.platforms" />
          </div>
          <md-divider />
          <MovieRatingActions
            :imdb-i-d="movie.imdb_id"
            @update="getRatings"
          />
          <br>
        </md-card-content>
      </md-card>
      <RatingListItems
        v-if="allRatings.length"
        :all-ratings="allRatings"
        @update="getRatings"
      />
    </div>
  </div>
</template>

<script>

import { getAllMovieRatings, getMovieDetails } from '@/service/service'
import { getRatingAverage } from '@/utils/utils'
import StreamingPlatforms from '@/components/MovieDetails/StreamingPlatforms'
import MovieRatingActions from '@/components/MovieDetails/MovieRatingActions'
import RatingListItems from '@/components/MovieDetails/RatingListItems'

export default {
  name: 'MovieDetails',
  components: {
    StreamingPlatforms,
    MovieRatingActions,
    RatingListItems
  },
  data: () => ({
    allRatings: [],
    movieBeanRating: '',
    isLoading: { one: false, two: false },
    movie: {
      title: '',
      rated: '',
      released: '',
      runtime: '',
      genre: '',
      imdb_rating: '',
      img_url: '',
      plot: '',
      imdb_id: '',
      ratings: []
    }
  }),
  beforeMount () {
    this.getInfo()
    this.getRatings()
  },
  methods: {
    getInfo () {
      this.isLoading.one = true
      getMovieDetails(
        this.$root.$data.activeMovie,
        this.$root.$data.userToken
      ).then((resp) => {
        this.movie = { ...resp }
      })
        .finally(() => {
          this.isLoading.one = false
        })
    },
    getRatings () {
      this.isLoading.two = true
      getAllMovieRatings(
        this.$root.$data.activeMovie,
        this.$root.$data.userToken
      )
        .then((resp) => {
          this.allRatings = resp
          this.movieBeanRating = getRatingAverage(resp)
        })
        .finally(() => {
          this.isLoading.two = false
        })
    }
  }
}
</script>

<style scoped>

</style>
