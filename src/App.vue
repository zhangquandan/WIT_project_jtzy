<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',

    created() {

      // 在页面加载时读取sessionStorage
      if (sessionStorage.getItem('store')) {
        var data = JSON.parse(sessionStorage.getItem('store'))
         data.viewType = "campus"
        this.$store.replaceState(Object.assign({}, this.$store.state, data))
      }
      // 在页面刷新时将store保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store',JSON.stringify(this.$store.state))

      })
    },

    mounted() {
    },

    methods: {}
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 1920px;
    height: 1080px;
    background-image: url(./assets/img/bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .anchorBL {
    display: none;
  }

  .map-tooltip {
    font-size: 0.9rem;
    text-align: left;
    padding: 10px;
    margin: 0px;
    opacity: 1;
    line-height: 25px;
    background-color: rgba(4, 33, 103, 0.5);
    box-shadow: 0 0 10px blue;
  }
</style>
