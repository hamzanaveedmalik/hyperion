<template>
  <div id="app">
    <Header class="header" name="Iain" />
    <div class="top-col">
      <Stats class="stats" />
      <Events class="events" />
    </div>
    <PolicyTable />
  </div>
</template>

<script>
import PolicyTable from "./components/PolicyTable.vue";
import Stats from "./components/Stats.vue";
import Header from "./components/Header.vue";
import Events from "./components/UpcomingEvents.vue";

export default {
  name: "App",
  components: {
    PolicyTable,
    Stats,
    Header,
    Events
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #1b1b1b;
}

.top-col {
  display: grid;
}

.events {
  margin-right: 10%;
}

.stats {
}

@media screen and (max-width: 768px) {
  .events {
    display: none;
  }

  .header {
    display: none;
  }
}
</style>
