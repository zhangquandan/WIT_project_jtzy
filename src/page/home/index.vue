<template>
  <div class="main">
    <my-header @changeView="changeView"></my-header>
    <router-view ref="content"></router-view>
  </div>
</template>

<script>
  import myHeader from '../../components/header.vue'
  export default {
    name: '',
    data() {
      return {

      }
    },

    components: {
      myHeader
    },

    mounted() {
      this.changeView()
      document.documentElement.style.overflowY = 'auto'
    },

    methods: {
      changeView: function() {
        this.$refs.content.changeView()
      }
    }
  }
</script>

<style scoped="scoped">
  .main {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
