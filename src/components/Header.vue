<template>
  <div>
    <span class="main">
      <h1 class="title">Welcome, {{name}}</h1>
      <button class="quote-btn">Get quotes</button>
    </span>
    <hr class="horizontal" />
  </div>
</template>
<script>
import "circular-std";
export default {
  name: "Header",
  props: {
    name: String
  }
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.title {
  text-align: left;
  margin-left: 5%;
  font: Book 28px/36px Circular Std;
  letter-spacing: -1.12px;
  color: #ffffff;
  opacity: 1;
}

.quote-btn {
  width: 149px;
  height: 48px;
  margin-right: 5%;

  background: #04f9d3 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;

  text-align: center;
  font-family: CircularStd;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.54px;
  color: #1a1a1a;
  opacity: 1;
}

.horizontal {
  border: 2px solid #ffffff;
  opacity: 1;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
}
</style>