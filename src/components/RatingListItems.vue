<template>
  <div>
    <span class="md-display-1">All Reviews</span>
    <md-list class="md-triple-line">
      <md-list-item
        v-for="rating in allRatings"
        :key="rating.user"
      >
        <md-avatar>
          <img
            src="https://cdn2.iconfinder.com/data/icons/seeds-and-nuts-ingredients/180/red_beans-01-512.png"
            alt="Profile"
          >
        </md-avatar>

        <div class="md-list-item-text">
          <span>{{ rating.user }}</span>
          <span>{{ rating.rating }}</span>
          <!--          <p>I'll be in your neighborhood doing errands this week. Do you want to meet?</p>-->
        </div>
      </md-list-item>
    </md-list>
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