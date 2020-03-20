<template>
  <div>
    <div
      v-for="stat in stats"
      :key="stat.name"
      class="box-common"
      :class="(stat.value==2)?'bindable':(stat.value===12)?'unanswered':'expired'"
    >
      <div class="stat-value">{{stat.value}}</div>
      <div class="stat-name">{{stat.name}}</div>
    </div>

    <div class="btn-div">
      <button class="stat-btn">Respond</button>
      <button class="stat-btn">Reply</button>
      <button class="stat-btn">Close</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "circular-std";

export default {
  name: "Stats",
  data() {
    return {
      stats: []
    };
  },
  computed: {
    compClasses: function(stats) {
      var arr = stats;
      console.log(arr.name);
      if (stats.name === "Bindable quotations") {
        return "box-common bindable";
      }
      if (stats.name === "Unanswered subjectives") {
        return "box-common unanswered";
      } else return "box-common expired";
    }
  },
  created() {
    axios
      .get("http://localhost:3000/stats")
      .then(res => (this.stats = res.data))
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.box-common {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 550px;
  height: 150px;
  margin-left: 5%;
  margin-bottom: 1%;
  background-color: #f08484;
}

.bindable {
  background: transparent linear-gradient(284deg, #34cc6f 0%, #00edbf 100%) 0%
    0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
}

.unanswered {
  background: transparent linear-gradient(284deg, #2937a0 0%, #0ef4f9 100%) 0%
    0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
}

.expired {
  background: transparent linear-gradient(104deg, #ff5f90 0%, #8000ff 100%) 0%
    0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
}

.stat-value {
  font-size: 132px;
  text-align: left;
  font-family: CircularStd;
  font-weight: bold;
  letter-spacing: -5.28px;
  color: #1a1a1a;
  opacity: 1;
  margin-left: 15px;
}

.stat-name {
  width: 124px;
  height: 64px;
  text-align: right;
  text-decoration: underline;
  font-family: CircularStd;
  font-size: 28px;
  font-weight: 300;
  letter-spacing: -1.12px;
  color: #1a1a1a;
  opacity: 1;
  margin-left: 15px;
}

.stat-btn {
  width: 149px;
  height: 48px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 0.2;
  margin: 60px;

  text-align: center;
  font-family: CircularStd;
  font-size: 18px;
  letter-spacing: -0.54px;
}

.stat-btn:hover {
  background: #3c3c3c;
  transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
}

.btn-div {
  position: absolute;
  top: 130px;
  left: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px;
  z-index: 1;
}

@media screen and (max-width: 768px) {
  .btn-div {
    position: absolute;
    top: -30px;
    left: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
  }

  .stat-btn {
    width: 90px;
    height: 28px;
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 3px;
    opacity: 0.2;
    margin: 40px;

    text-align: center;
    font-family: CircularStd;
    font-size: 12px;
    letter-spacing: -0.54px;
  }
  .box-common {
    width: 332px;
    height: 90px;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .stat-value {
    font-size: 80px;
    text-align: left;
    font-family: CircularStd;
    font-weight: bold;
    letter-spacing: -5.28px;
    color: #1a1a1a;
    opacity: 1;
    margin-left: 15px;
  }

  .stat-name {
    width: 124px;
    height: 64px;
    text-align: right;
    text-decoration: underline;
    font-family: CircularStd;
    font-size: 18px;
    font-weight: 300;
    letter-spacing: -1.12px;
    color: #1a1a1a;
    opacity: 1;
    margin-left: -25px;
    margin-top: 23px;
  }
}
</style>