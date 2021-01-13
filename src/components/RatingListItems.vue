<template>
  <div>
    <span class="md-display-1">All Reviews</span>


    <md-card
      v-for="rating in allRatings"
      :key="rating.user"
    >
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">
            {{ rating.user }}
          </div>
          <div class="md-subhead">
            {{ rating.rating }} / 10
          </div>
        </md-card-header-text>
      </md-card-header>

      <md-card-content>
        {{ rating.comment }}
      </md-card-content>
      <md-divider />
    </md-card>
  </div>
</template>

<script>

export default {
  name: "RatingListItems",
  props: {
    allRatings: {
      type: Array,
      default: () => {
        return [{user: String, rating: String, movie: String}]
      }
    }
  }
}
</script>

<style scoped>

</style>