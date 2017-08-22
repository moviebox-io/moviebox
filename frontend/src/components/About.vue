<template>
  <section class="section">
    <h1 class="title">
      Hello World
    </h1>
    <p class="subtitle">
      <figure class="image is-64x64">
        <img src="../assets/tmdb.png" alt="The movie database API">
      </figure>
      This product uses the TMDb API but is not endorsed or certified by TMDb.
    </p>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'about',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: 'loggedIn'
    })
  },
  watch: {
    loggedIn: function (newLoggedIn) {
      console.log(loggedIn)
    }
  }
}
</script>

<style>

</style>