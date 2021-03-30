<script lang="ts">
/**
 * * Packages Imports
 */
import Vue from 'vue';

/**
 * * Local Imports
 */
import { register } from '@/api/auth';
import { setAccessToken } from '@/utils/auth';

/**
 * * Interfaces
 */
import { RegisterBodyDto } from '@/interfaces/IAuth';

interface Data {
  registerUserForm: RegisterBodyDto,
  confirmPassword: string
}

export default Vue.extend({
  name: 'LoginView',

  data: () => ({
    registerUserForm: {
      username: '',
      password: '',
    },
    confirmPassword: '',
  } as Data),

  methods: {
    async submitRegistrationForm() {
      if (this.registerUserForm.password !== this.confirmPassword) {
        alert('Password & Confirm Password Must Match');

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.$refs.registrationForm.reset();
        return;
      }

      const user = await register(this.registerUserForm);

      setAccessToken(user.accessToken);

      this.$router.push('/');
    },
  },
});
</script>

<template>
  <main id="register">
    <v-container style="height: 100%">
      <v-row
        align="center"
        justify="center"
        no-gutters
        style="height: 100%"
      >
        <div class="wrapper">
          <h1 class="mb-8">
            Register 🐾
          </h1>

          <v-form
            ref="registrationForm"
            @submit.prevent="submitRegistrationForm"
          >
            <v-text-field
              v-model="registerUserForm.username"
              dark
              label="Username"
              class="my-2"
            />
            <v-text-field
              v-model="registerUserForm.password"
              dark
              label="Password"
              type="password"
              class="my-2"
            />
            <v-text-field
              v-model="confirmPassword"
              dark
              label="Confirm Password"
              type="password"
              class="my-2"
            />

            <div class="d-flex align-center">
              <v-btn
                type="submit"
                color="orange"
                class="my-3"
                large
              >
                Register
              </v-btn>
              <v-spacer />
              <a
                style="color: orange"
                @click="$router.push('/login')"
              >Have an account?</a>
            </div>
          </v-form>
        </div>
      </v-row>
    </v-container>
  </main>
</template>

<style lang="scss" scoped>
#register {
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
