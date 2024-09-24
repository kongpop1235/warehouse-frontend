<template>
  <form @submit.prevent="handleSubmit">
    <h2>{{ isLogin ? $t('login.title') : $t('signup.title') }}</h2>

    <input
      type="text"
      v-model="username"
      :placeholder="$t('username')"
      required
    />

    <input
      type="password"
      v-model="password"
      :placeholder="$t('password')"
      required
    />

    <button type="submit">
      {{ isLogin ? $t('login.button') : $t('signup.button') }}
    </button>

    <p @click="$emit('toggle')">
      {{ isLogin ? $t('signup.switch') : $t('login.switch') }}
    </p>
  </form>
</template>

<script>
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async handleSubmit() {
      if (this.isLogin) {
        // Login
        try {
          const response = await this.$axios.$post('auth/login', {
            username: this.username,
            password: this.password,
          })
          this.$store.dispatch('auth/login', response.token)
          this.$router.push('/dashboard')
        } catch (error) {
          console.error('Login failed:', error)
        }
      } else {
        // Sign up
        try {
          await this.$axios.$post('auth/register', {
            username: this.username,
            password: this.password,
          })
          this.$emit('toggle')
        } catch (error) {
          console.error('Signup failed:', error)
        }
      }
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 10px;
  color: #007bff;
  cursor: pointer;
}

p:hover {
  text-decoration: underline;
}
</style>
