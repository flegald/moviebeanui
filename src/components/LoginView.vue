<template>
  <div>
    <LoginForm
      v-if="view==='login'"
      @create="changeForm('create')"
    />
    <CreateAccount
      v-if="view==='create'"
      @login="changeForm('login')"
    />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import CreateAccount from "@/components/CreateAccount";
export default {
name: "LoginView",
  data: () => ({
    view: "login"
  }),
  methods: {
    changeForm(view) {
      this.view = view
    }
  },
  components: {
    CreateAccount,
    LoginForm
  }
}
</script>

<style scoped>

</style>