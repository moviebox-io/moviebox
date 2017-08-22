<template>
  <section class="section">
    <h1 class="title">
      Hello World
    </h1>
    <p class="subtitle">
      My first website with <strong>Bulma</strong>!
    </p>
    <div class="columns is-multiline is-mobile">
      <div class="column is-one-third" v-for="movie in movies" :item="movie" :key="movie.id">
        <div class="box">
          <article class="media">
            <div class="media-left is-poster">
              <figure class="image">
                <img v-if="movie.poster_path" :src="movie.poster_path" alt="Image">
                <span v-else class="icon is-large"><i class="fa fa-film" aria-hidden="true"></i></span>
              </figure>
            </div>
            <div class="media-content">
              <strong>{{ movie.title }}</strong> <small><i class="fa fa-star" aria-hidden="true"></i>{{ movie.vote_average }}</small>
              <br>
              {{ movie.overview }}
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../api'

export default {
  name: 'search',
  data () {
    return {
      loading: false,
      movies: []
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: 'loggedIn'
    })
  },
  created () {
    this.search()
  },
  watch: {
    '$route': 'search',
    loggedIn: function (newLoggedIn) {
      console.log(loggedIn)
    }
  },
  methods: {
    search () {
      this.loading = true
      this.query = this.$route.params.query
      return api.searchMovie({query: this.query}).then((data = {}) => {
        if (data.results) {
          this.movies = data.results
        }
      }).then(() => { this.loading = false })
    }
  }
}
</script>

<style scoped>
.box {
  height: 100%;
}

.is-poster {
  height: 100%;
}
</style>