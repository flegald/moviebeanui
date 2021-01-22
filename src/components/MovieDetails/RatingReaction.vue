<template>
  <md-card-expand>
    <md-card-actions md-alignment="space-between">
      <ul>
        <li
          v-for="reaction in rating.reactions"
          :key="`${rating.user.user}${reaction.rating}`"
        >
          {{ reaction.reaction }}
        </li>
      </ul>
      <md-card-expand-trigger>
        <md-button class="md-icon-button">
          Rate
        </md-button>
      </md-card-expand-trigger>
    </md-card-actions>
    <md-divider />
    <md-card-expand-content>
      <md-card-content>
        <md-button
          v-for="e in emojis"
          :key="e"
          class="md-icon-button rate-icon"
          @click="postReaction(e, rating.pk)"
        >
          {{ e }}
        </md-button>
      </md-card-content>
    </md-card-expand-content>
  </md-card-expand>
</template>

<script>
import { addReaction } from '@/service/service'

export default {
  name: 'RatingReaction',
  props: {
    rating: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    emojis: ['👍', '👎', '🧠', '🤬', '😭']
  }),
  methods: {
    postReaction (reaction, ratingPk) {
      addReaction(reaction, ratingPk, this.$root.$data.userToken)
        .then(() => {
          this.$emit('update')
        })
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
ul > li {
  display: inline-block;
  font-size: 20px;
}
.rate-icon {
  font-size: 28px;
  background-color: #616161;
  margin-right: 10px;
}
</style>
