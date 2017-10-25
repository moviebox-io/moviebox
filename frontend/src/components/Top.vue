<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="../assets/logo.png" class="logo" width="200" height="48"/>
      </router-link>
      <div class="navbar-burger burger" data-target="navMenubd-example">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu">
      <div class="navbar-item">
        <div class="control">
          <input class="input is-medium" id="search" type="text" placeholder="Search..." v-model="searchQuery" @keyup.enter="search">
        </div>
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div id="signInBtn" v-show="!loggedIn"></div>
      </div>
      <div v-if="loggedIn" class="user">
        <div class="navbar-item">
          <router-link to="/about" tag="span">
            <i class="fa fa-cog fa-fw" aria-hidden="true"></i>
            <div class="name">{{ name }}</div>
            <img :src="imageUrl" class="user-avatar" width="32" height="32"/>
          </router-link>
        </div>
        <div class="navbar-item">
          <button @click="signOut" class="button">Sign out</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'top',
  data () {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: 'loggedIn',
      name: 'getName',
      imageUrl: 'getImageUrl'
    })
  },
  watch: {
    '$route': 'updateQuery'
  },
  mounted () {
    window.addEventListener('load', () => {
      this.loadGapiAuth2()
    })
  },
  methods: {
    search () {
      if (this.searchQuery.length >= 3) {
        this.$router.replace(`/search/${this.searchQuery}`)
      }
    },
    updateQuery () {
      this.searchQuery = this.$route.params.query
    },
    onSignInSuccess (googleUser) {
      return this.$store.dispatch('login', { googleUser })
    },
    onSignInError (error) {
      console.error(error)
    },
    signOut () {
      let auth2 = window.gapi.auth2.getAuthInstance()
      auth2.signOut().then(() => {
        return this.$store.dispatch('logout')
      })
    },
    loadGapiAuth2 () {
      window.gapi.load('auth2', () => {
        let auth2 = window.gapi.auth2.init()
        auth2.then(() => {
          window.gapi.signin2.render('signInBtn', {
            'theme': 'light',
            'onsuccess': this.onSignInSuccess,
            'onfailure': this.onSignInError
          })
        }, this.onSignInError)
      })
    }
  }
}
</script>

<style scoped lang="scss">
#search {
  width: 500px;
}

.user {
  text-align: right;
  .name {
    display: inline-block;

    .user-avatar {
      border-radius: 50%;
      height: 32px;
      margin: 8px 0 8px 8px;
      outline: 0;
      vertical-align: top;
      width: 32px;
    }
  }
}
</style>
