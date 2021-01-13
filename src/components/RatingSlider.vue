<template>
  <div v-if="!recordedUserRating">
    <p class="md-display-1">
      How many Beans u think 🤔
    </p>
    <vue-slider
      v-model="userRating"
      :data="ratingData"
      :marks="ratingMarks"
      :lazy="true"
      :data-vlue="userRating"
      dot-size="50"
      height="10px"
      style="padding-left: 15px; padding-right: 15px;"
    />
    <br>
    <md-field>
      <label>Why that many beans?</label>
      <md-textarea v-model="ratingComment" maxlength="255"/>
      <span class="md-helper-text">{{ ratingComment.length }}/255</span>
    </md-field>
    <br>
    <md-button
      class="md-raised md-primary md-dense"
      @click="sendRating(imdbID)"
    >
      Rate
    </md-button>
    <md-button
      v-if="inWatchlist === 0"
      class="md-raised md-primary md-dense"
      @click="sendAddToWatchList(imdbID)"
    >
      Add to Watchlist
    </md-button>
    <md-button
      v-if="inWatchlist === 1"
      class="md-raised md-primary md-dense"
      @click="sendDeleteFromWatchList(imdbID)"
    >
      Remove From Watchlist
    </md-button>
  </div>

  <div v-else>
    <p class="md-display-1">
      You rated {{ recordedUserRating }} Beans!
    </p>
    <md-button
      class="md-raised md-primary md-dense"
      @click="resetRating"
    >
      Edit Rating
    </md-button>
    <md-button
      v-if="inWatchlist === 0"
      class="md-raised md-primary md-dense"
      @click="sendAddToWatchList(imdbID)"
    >
      Add to Watchlist
    </md-button>
    <md-button
      v-if="inWatchlist === 1"
      class="md-raised md-primary md-dense"
      @click="sendDeleteFromWatchList(imdbID)"
    >
      Remove From Watchlist
    </md-button>
  </div>
</template>

<script>

import VueSlider from 'vue-slider-component'
import {createMovieRating, getUserMovieRating, getWatchlist, addToWatchList, removeFromWatchList} from "@/service/service";
import 'vue-slider-component/theme/default.css'
export default {
  name: "RatingSlider",
  data: () => ({
    recordedUserRating: '',
    userRating: "5",
    inWatchlist: 0,
    ratingComment: '',
    ratingData: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    ratingMarks: {
      "1": "🥺",
      "10": "🥰"
    },
  }),
  props: {
    imdbID: {
      type: String,
      default: ""
    },
  },
  components: {
    VueSlider,
  },
  methods: {
    sendRating(imdbID) {
      createMovieRating(
          imdbID,
          this.userRating,
          this.ratingComment,
          this.$root.$data.userToken
      )
      .then((resp) => {
        this.recordedUserRating = resp.rating
        this.sendDeleteFromWatchList(imdbID)
        this.$emit("update")
      })
    },
    sendAddToWatchList(imdbID) {
      addToWatchList(imdbID, this.$root.$data.userToken)
      .then(() => {
        this.getUserWatchlist()
      })
    },
    sendDeleteFromWatchList(imdbID) {
      removeFromWatchList(imdbID, this.$root.$data.userToken)
          .then(() => {
            this.getUserWatchlist()
          })
    },
    getUserRating() {
      getUserMovieRating(
          this.$root.$data.activeMovie,
          this.$root.$data.userToken
      ).then((resp) => {
        if (resp) {
          if (resp.length > 0) {
            this.recordedUserRating = resp[0].rating
            this.ratingComment = resp[0].comment ? resp[0].comment : ""
          }
        }
      })
    },
    getUserWatchlist() {
      getWatchlist(this.$root.$data.userToken)
          .then((resp) => {
            this.inWatchlist = resp.filter((m) => {
              return m.imdb_id === this.$root.$data.activeMovie
            }).length
          })
    },
    resetRating() {
      this.recordedUserRating = ''
    },
    countCommentChars() {
      if (this.ratingComment >= 254) {
        console.log("here")
        this.ratingComment = this.ratingComment.slice(0, 254)
      }
    }
  },
  beforeMount() {
    this.getUserRating()
    this.getUserWatchlist()
  }
}
</script>

<style scoped>

</style>