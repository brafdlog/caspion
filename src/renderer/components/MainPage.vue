<template>
  <div id="wrapper">
    <main>
      <div class="side">
        <span class="title">
          Welcome to your new project!
        </span>
        <Importers></Importers>
      </div>
    </main>
  </div>
</template>

<script>
  import Importers from './MainPage/Importers'

  export default {
    name: 'main-page',
    components: { Importers }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  main {
    display: flex;
  }

  .side {
    display: flex;
    flex-direction: column;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }
</style>
