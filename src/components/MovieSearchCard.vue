<template>
  <div>
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">
            {{ title }}
          </div>
          <div class="md-subhead">
            {{ year }}
          </div>

          <div
            v-if="movieBeanRating"
            class="md-subheading"
          >
            Beans: {{ movieBeanRating }} / 10
          </div>
          <div
            v-if="numOfReviews > 0"
            class="md-body-2"
          >
            Total Reviews: {{ numOfReviews }}
          </div>

          <div
            v-if="userReview"
            class="md-body-2"
          >
            My Review: {{ userReview }} / 10
          </div>
        </md-card-header-text>

        <md-card-media>
          <img
            :src="imgURL"
            alt="cover"
          >
        </md-card-media>
      </md-card-header>

      <md-card-actions md-alignment="left">
        <md-button
          v-if="!exists"
          class="md-raised md-primary"
          @click="sendAddRequest(imdbID)"
        >
          Add
        </md-button>
        <md-button
          v-if="exists"
          class="md-raised md-plain plain"
          @click="viewExistingMovie(imdbID)"
        >
          View
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>

import { addMovie } from "@/service/service";

export default {
  name: "MovieSearchCard",
  props: {
    title: {
      type: String,
      default: ""
    },
    imdbID: {
      type: String,
      default: ""
    },
    imgURL: {
      type: String,
      default: ""
    },
    year: {
      type: String,
      default: ""
    },
    exists: {
      type: Boolean,
      default: false
    },
    movieBeanRating: {
      type: String,
      default: ''
    },
    numOfReviews: {
      type: Number,
      default: 0
    },
    userReview: {
      type: Number,
      default: 0
    }
  },
  methods: {
    sendAddRequest(imdbID) {
      addMovie(imdbID, this.$root.$data.userToken)
          .then((resp) => {
            this.$root.$data.activeMovie = resp.imdb_id
            this.$root.$data.setPageView("MovieDetails")
          })
    },
    viewExistingMovie(imdbID) {
      this.$root.$data.activeMovie = imdbID
      this.$root.$data.setPageView("MovieDetails")
    },
  },
}
</script>

<style scoped>

  .plain {
    color: black !important;
  }
</style>