<template>
  <div>
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">
          <md-avatar
            v-if="profile.profile_img"
            class="md-large"
          >
            <img
              :src="profile.profile_img"
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
          {{ profile.user }}
        </div>
      </md-card-header>

      <md-card-content>
        <br>
        <form
          novalidate
          class="md-layout"
          v-if="!isLoading"
        >
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Upload Profile Picture</label>
                <md-file
                  accept="image/*"
                  @change="stageImage"
                />
              </md-field>
            </div>
          </div>
        </form>

        <md-progress-bar
          v-else
          md-mode="query"
        />
      </md-card-content>

      <md-card-actions>
        <md-button
          @click="uploadImage"
          class="md-raised md-primary"
          :disabled="image === null || isLoading"
        >
          Upload
        </md-button>
      </md-card-actions>
      <br>
      <md-card-actions>
        <md-button
          @click="logout"
          class="md-raised md-accent"
        >
          Logout
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>

import { getUserProfile, uploadUserImg } from '@/service/service'

export default {
  name: 'Settings',
  data: () => ({
    image: null,
    profile: {},
    isLoading: false
  }),
  methods: {
    setUserProfile () {
      this.profile = this.$root.$data.profile
    },
    logout () {
      this.$root.$data.removeSession()
    },
    stageImage (event) {
      this.image = event.target.files[0]
    },
    uploadImage () {
      this.isLoading = true
      const imageData = new FormData()
      imageData.append('image', this.image, this.image.name)
      uploadUserImg(imageData, this.$root.$data.userToken)
        .then(() => {
          getUserProfile(this.$root.$data.userToken).then((resp) => {
            this.$root.$data.setUserSession(resp)
            this.profile = resp
          })
            .finally(() => {
              this.isLoading = false
            })
        })
    }
  },
  beforeMount () {
    this.setUserProfile()
  }
}
</script>

<style scoped>

</style>
