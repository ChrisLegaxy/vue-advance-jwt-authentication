<template>
  <main id="login">
    <v-container style="height: 100%">
      <v-row align="center" justify="center" no-gutters style="height: 100%">
        <div class="wrapper">
          <h1 class="mb-8">Login 🐾</h1>

          <v-form>
            <v-text-field dark label="Username" class="my-2" />
            <v-text-field dark label="Password" type="password" class="my-2" />

            <div class="d-flex align-center">
              <v-btn color="orange" class="my-3" large>Login</v-btn>
              <v-spacer />
              <a style="color: orange" @click="$router.push('/register')">Don't have an account?</a>
            </div>
          </v-form>
        </div>
      </v-row>
    </v-container>
  </main>
</template>

<style lang="scss" scoped>
#login {
  background-color: #28282b;
  height: 100%;
  color: white;

  .wrapper {
    margin: 0.5rem;
    width: 100%;
    max-width: 600px;
  }
}
</style>
