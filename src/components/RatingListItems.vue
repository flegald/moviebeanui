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
                class="md-icon-button rate-icon"
                @click="postReaction('👍', rating.pk)"
              >
                👍
              </md-button>

              <md-button
                class="md-icon-button rate-icon"
                @click="postReaction('👎', rating.pk)"
              >
                👎
              </md-button>

              <md-button
                class="md-icon-button rate-icon"
                @click="postReaction('🧠', rating.pk)"
              >
                🧠
              </md-button>

              <md-button
                class="md-icon-button rate-icon"
                @click="postReaction('🤬', rating.pk)"
              >
                🤬
              </md-button>

              <md-button
                class="md-icon-button rate-icon"
                @click="postReaction('😭', rating.pk)"
              >
                😭
              </md-button>
            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
      </md-card>
      <br>
      <md-divider />
    </div>
  </div>
</template>

<script>

import {addReaction} from "@/service/service";

export default {
  name: "RatingListItems",
  props: {
    allRatings: {
      type: Array,
      default: () => {
        return [{user: String, rating: String, movie: String}]
      }
    }
  },
  methods: {
    postReaction(reaction, ratingPk) {
      addReaction(reaction, ratingPk, this.$root.$data.userToken)
          .then(() => {
            this.$emit("update")
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