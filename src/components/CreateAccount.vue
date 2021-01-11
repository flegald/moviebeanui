<template>
  <div>
    <form
      novalidate
      class="md-layout"
      @submit.prevent="sendCreateAccount"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">
            Create Account
          </div>
          <span
            v-if="errorText"
            class="md-subheading error-text"
          >
            {{ errorText }}
          </span>
        </md-card-header>

        <md-card-content>
          <md-field>
            <label for="username">Username</label>
            <md-input
              name="username"
              id="username"
              v-model="form.username"
            />
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input
              type="password"
              name="password"
              id="password"
              v-model="form.password"
            />
          </md-field>
          <md-field>
            <label for="confirmPassword">Confirm Password</label>
            <md-input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              v-model="form.confirmPassword"
            />
          </md-field>
          <md-field>
            <label for="globalPassword">THE Password</label>
            <md-input
              type="password"
              name="globalPassword"
              id="globalPassword"
              v-model="form.globalPassword"
            />
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button
            @click="$emit('login')"
          >
            Cancel
          </md-button>
          <md-button
            type="submit"
            class="md-primary md-raised"
          >
            Create
          </md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { createAccount } from "@/service/service";

export default {
  name: "CreateAccount",
  data: () => ({
    errorText: null,
    form: {
      username: null,
      password: null,
      confirmPassword: null,
      globalPassword: null
    }
  }),
  methods: {
    sendCreateAccount() {
      this.errorText = null
      if (this.form.password !== this.form.confirmPassword) {
        this.errorText = "Passwords do not match"
        return
      }
      const payload = {
        username: this.form.username,
        password: this.form.password,
        globalPassword: this.form.globalPassword
      }
      createAccount(payload)
          .then((r) => {
            if (r.error) {
              if (r.error === "global_pw") {
                this.errorText = "Incorrect password"
              }
              if (r.error === "duplicate") {
                this.errorText = "Username exists"
              }
            } else {
              this.$root.$data.logUserIn(r.token)
              this.$root.$data.setPageView('Profile')
            }
      }).catch((e) => {
        console.log(e)
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