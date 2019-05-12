<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body, html {
    background-color: #ccfbf9;
    margin:0px;
    height:100%;
  }

  #app {
    height: 100%;
    width: 100%;
  }

  .model-root-div {height: 100%;}
  .filter-div {height: 70px;}
  .tabler-div {height: calc(100% - 70px);}
  .tabler-div > .table-btn-bar {}
  .tabler-div > .pag-class {text-align: right; padding: 10px 0;}
</style>
