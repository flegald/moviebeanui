<template>
  <div>
    <form
      novalidate
      class="md-layout"
      @submit.prevent="sendLoginReq"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">
            Login
          </div>
          <span
            v-if="error"
            class="md-subheading error-text"
          >
            An error occurred please try again
          </span>
        </md-card-header>

        <md-card-content>
          <md-field>
            <label for="username">Username</label>
            <md-input
              name="username"
              id="username"
              v-model="form.username"
              :disabled="isSending"
            />
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input
              type="password"
              name="password"
              id="password"
              v-model="form.password"
              :disabled="isSending"
            />
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button @click="$emit('create')">
            Create Account
          </md-button>
          <md-button
            type="submit"
            class="md-primary md-raised"
            :disabled="isSending"
          >
            Login
          </md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import {getUserProfile, login} from "@/service/service";

export default {
  name: "LoginForm",
  data: () => ({
    error: false,
    form: {
      username: null,
      password: null,

    },
    isSending: false
  }),
  methods: {

    sendLoginReq () {
      this.isSending = true
      this.error = false
      login(
          {
            "username": this.form.username,
            "password": this.form.password
          }).then((r) => {
            if (r.token) {
              console.log(r)
              const token = r.token
              getUserProfile(token).then((resp) => {
                this.$root.$data.setUserSession(resp)
                this.$root.$data.setPageView("Feed")
                this.$root.$data.logUserIn(token)
                this.$root.$data.setPageView('Feed')
              })
            } else {
              this.error = true
            }
          })
      .catch(() => {
        this.error = true
      })
      .finally(() => {
        this.isSending = false
      })
    }
  }
}
</script>

<style scoped>
  .error-text {
    color: #ff5252
  }
</style>