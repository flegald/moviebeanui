<template>
  <div>
    <span class="md-display-1">All Reviews</span>

    <div
      v-for="rating in allRatings"
      :key="rating.user.user"
    >
      <md-card>
        <md-card-header>
          <md-avatar
            v-if="rating.user.profile_img"
            class="md-large"
          >
            <img
              :src="rating.user.profile_img"
              alt="Avatar"
            >
          </md-avatar>

          <md-avatar
            v-else
            class="md-large"
          >
            <img
              src="https://cdn4.iconfinder.com/data/icons/fruits-n-vegetables-128-color/128/kidney_beans_bean-512.png"
              alt="Avatar"
            >
          </md-avatar>
          <md-card-header-text>
            <div class="md-title">
              {{ rating.user.user }}
            </div>
            <div class="md-subhead">
              {{ rating.rating }} / 10
            </div>
          </md-card-header-text>
        </md-card-header>

        <md-card-content>
          {{ rating.comment }}
        </md-card-content>

        <RatingReaction
          :rating="rating"
          @update="$emit('update')"
        />
      </md-card>
      <br>
      <md-divider />
    </div>
  </div>
</template>

<script>

import RatingReaction from '@/components/MovieDetails/RatingReaction'
export default {
  name: 'RatingListItems',
  components: { RatingReaction },
  props: {
    allRatings: {
      type: Array,
      default: () => {
        return [{ user: String, rating: String, movie: String }]
      }
    }
  }
}
</script>

<style scoped>
</style>
