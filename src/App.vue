<template>
  <div id="app">
    <div class="container d-flex justify-content-between" id="header">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/test">Test</router-link>
      </div>
      <div id="authorization">
        <router-link to="/sign">Sign in</router-link> |
        <router-link to="/login">Log in</router-link> |
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav,
#authorization {
  a {
    font-weight: bold;
    text-decoration: none;
    color: #7277d8;
    &.router-link-exact-active {
      color: #1921b1;
    }
  }
}
</style>