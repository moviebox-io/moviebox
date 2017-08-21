<template>
  <div class="container">
    <vue-progress-bar></vue-progress-bar>
    <top></top>
    <router-view></router-view>
  </div>
</template>

<script>
import Top from '@/components/Top'

export default {
  name: 'app',
  components: {
    Top
  }
}
</script>

<style lang="scss">
$navbar-item-img-max-height: 3.75rem;
$primary: #be002c;
@import '~bulma';
$fa-font-path: '~font-awesome/fonts';
@import '~font-awesome/scss/font-awesome.scss';
</style>
