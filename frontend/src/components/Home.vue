<template>
  <section class="section">
    <div class="columns">
      <div class="column box is-narrow">
        <div class="content side-menu">
          <p class="title">Categories</p>
          <p class="subtitle">Or no categories?</p>
          <div class="content">
            Who knows...
          </div>
        </div>
      </div>
      <div class="column">
        <div class="columns is-multiline">
          <div class="column is-11 is-offset-1" v-for="movie in movies" :item="movie" :key="movie.id">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-64x64">
                      <img v-if="movie.poster_path" :src="movie.poster_path" alt="Image">
                      <span v-else class="icon is-large"><i class="fa fa-film" aria-hidden="true"></i></span>
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ movie.title }}</p>
                    <p class="subtitle is-6"><small><i class="fa fa-star" aria-hidden="true"></i>{{ movie.vote_average }}</small></p>
                  </div>
                </div>

                <div class="content">
                  {{ movie.overview }}
                </div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item">Save</a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api'

export default {
  name: 'home',
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

.side-menu {
  width: 200px;
}
</style>