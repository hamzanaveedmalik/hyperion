<template>
  <div class="main">
    <h1 class="label">Upcoming Events</h1>
    <hr class="horizontal" />
    <div v-for="event in events" :key="event.name">
      <div class="date-container">
        <div
          class="date-box"
          :class="(event.name=='Quote 1232 (Client 1/Obligor 3) Expires')?'quote':(event.name=='Declaration 0073980 (Client 1/Obligor 9) Expires')?'declaration':'renewal'"
        ></div>
        <p
          class="date"
          :class="(event.name=='Quote 1232 (Client 1/Obligor 3) Expires')?'quote-text':(event.name=='Declaration 0073980 (Client 1/Obligor 9) Expires')?'declaration-text':'renewal-text'"
        >{{moment(event.date).format("Do MMM YYYY")}}</p>

        <div
          class="event-box"
          :class="(event.name=='Quote 1232 (Client 1/Obligor 3) Expires')?'quote':(event.name=='Declaration 0073980 (Client 1/Obligor 9) Expires')?'declaration':'renewal'"
        ></div>
        <div
          class="event-name"
          :class="(event.name=='Quote 1232 (Client 1/Obligor 3) Expires')?'quote-text':(event.name=='Declaration 0073980 (Client 1/Obligor 9) Expires')?'declaration-text':'renewal-text'"
        >{{event.name}}</div>
        <p
          class="policy-details"
          :class="(event.name=='Quote 1232 (Client 1/Obligor 3) Expires')?'quote-text':(event.name=='Declaration 0073980 (Client 1/Obligor 9) Expires')?'declaration-text':'renewal-text'"
        >{{event.policy_details}}</p>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "Events",
  data() {
    return {
      events: [],
      moment: moment
    };
  },
  created() {
    axios
      .get("http://localhost:3000/upcoming_events")
      .then(res => (this.events = res.data))
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.label {
  text-align: left;
  margin-left: 45%;
  font: Black 42px/53px Circular Std;
  letter-spacing: -1.68px;
  color: #ffffff;
  opacity: 1;
}

.horizontal {
  border: 2px solid #ffffff;
  opacity: 1;
  width: 50%;
  margin-left: 45%;
  margin-right: 5%;
  margin-bottom: 1%;
}

.date-container {
  position: relative;
  padding: 1%;
}

.date-box {
  margin-left: 45%;
  position: absolute;
  width: 6%;
  height: 87px;
  background: #ff585f 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 0.08;
}

.date {
  position: absolute;
  padding-left: 15px;
  margin-left: 45%;
  width: 66px;
  height: 51px;
  text-align: left;
  font: CircularStd;
  letter-spacing: 0;
  color: #ff585f;
  opacity: 1;
}

.event-container {
  display: flex;
  align-items: baseline;
  padding: 1%;
}

.event-box {
  margin-left: 52%;
  position: absolute;
  background: #ff585f 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 0.08;
  width: 40%;
  height: 87px;
}

.event-name {
  margin-left: 52%;
  padding-left: 15px;
  padding-top: 15px;
  position: absolute;
  text-align: left;
  font-family: CircularStd;
  font-size: 21px;
  font-weight: bold;
  letter-spacing: 0;
}

.policy-details {
  margin-left: 52%;
  padding-left: 30px;
  padding-top: 2%;
  text-align: left;
  font-family: CircularStd;
  font-size: 14px;
  letter-spacing: 0;
}

.quote {
  background: #ff585f 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 0.08;
}

.quote-text {
  text-align: left;
  font-family: CircularStd;
  letter-spacing: 0;
  color: #ff585f;
  opacity: 1;
}

.declaration {
  background: #ffa700 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 0.08;
}

.declaration-text {
  text-align: left;
  font-family: CircularStd;
  letter-spacing: 0;
  color: #ffa700;
  opacity: 1;
}

.renewal {
  background: #52c76b 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 0.08;
}

.renewal-text {
  text-align: left;
  font-family: CircularStd;
  letter-spacing: 0;
  color: #52c76b;
  opacity: 1;
}

.main {
  position: absolute;
  top: 160px;
  left: 200px;
  width: 1500px;
}
</style>