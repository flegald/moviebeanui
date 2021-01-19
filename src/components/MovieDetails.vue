<template>
  <div>
    <span class="md-display-3">{{ movie.title }}</span>
    <br>
    <!--    <md-divider />-->
    <md-progress-bar
      v-if="isLoading.one && isLoading.two"
      md-mode="query"
    />
    <div v-else>
      <RatingSlider
        :imdb-i-d="movie.imdb_id"
        @update="getRatings"
      />
      <br>
      <div class="md-layout">
        <div class="md-layout-item">
          <span class="md-subheading">{{ movie.genre }}</span>
          <br>
          <br>
          <span class="md-subheading">{{ movie.released }}</span>
          <br>
          <br>
          <span class="md-subheading">{{ movie.runtime }}</span>
          <br>
          <br>
          <span class="md-subheading">{{ movie.plot }}</span>
        </div>

        <div class="md-layout-item">
          <img :src="movie.img_url">
        </div>
      </div>
      <br>
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
      <br>
      <md-divider />
      <br>
      <RatingListItems
        v-if="allRatings.length"
        :all-ratings="allRatings"
      />
    </div>
  </div>
</template>

<script>

import {getAllMovieRatings, getMovieDetails} from "@/service/service";
import {getRatingAverage} from "@/utils/utils";
import RatingSlider from "@/components/RatingSlider";
import RatingListItems from "@/components/RatingListItems";

export default {
  name: "MovieDetails",
  data: () => ({
    allRatings: [],
    movieBeanRating: '',
    isLoading: {one: false, two: false},
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
  methods: {
    getInfo() {
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
    getRatings() {
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
  },
  beforeMount() {
    this.getInfo()
    this.getRatings()
  },
  components: {
    RatingSlider,
    RatingListItems
  }
}
</script>

<style scoped>

</style>