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
      dot-size="50"
      height="10px"
      style="padding-left: 15px; padding-right: 15px;"
    />
    <br>
    <br>
    <md-button
      class="md-raised md-primary"
      @click="sendRating(imdbID)"
    >
      Rate
    </md-button>
  </div>

  <div v-else>
    <p class="md-display-1">
      You rated {{ recordedUserRating }} Beans!
    </p>
  </div>
</template>

<script>

import VueSlider from 'vue-slider-component'
import {createMovieRating, getUserMovieRating} from "@/service/service";
import 'vue-slider-component/theme/default.css'
export default {
  name: "RatingSlider",
  data: () => ({
    recordedUserRating: '',
    userRating: 5,
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
    VueSlider
  },
  methods: {
    sendRating(imdbID) {
      createMovieRating(imdbID, this.userRating , this.$root.$data.userToken)
      .then((resp) => {
        this.recordedUserRating = resp.rating
        this.$emit("update")
      })
    },
    getUserRating() {
      getUserMovieRating(
          this.$root.$data.activeMovie,
          this.$root.$data.userToken
      ).then((resp) => {
        if (resp) {
          this.recordedUserRating = resp[0].rating
        }
      })
    }
  },
  beforeMount() {
    this.getUserRating()
  }
}
</script>

<style scoped>

</style>