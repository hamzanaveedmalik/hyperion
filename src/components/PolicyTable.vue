<template>
  <div class="parent-div">
    <div class="table-header">
      <h1 class="table-label">History</h1>
      <input type="text" class="search" v-model="search" placeholder="Search" />
      <div class="multiselect-dropdown">
        <multiselect
          class="mutliselect"
          v-model="selectedValues"
          :options="options"
          :multiple="true"
          label="label"
          track-by="label"
          placeholder="Filter by status"
        ></multiselect>
      </div>
    </div>
    <hr class="horizontal-row" />
    <div class="table-responsive">
      <table class="table" style="width:90%; margin-left:5%; margin-right:5%;">
        <thead width="400px">
          <tr>
            <th>DATE</th>
            <th>DEC ID</th>
            <th>INSURED</th>
            <th>PRODUCT</th>
            <th>OBLIGOR</th>
            <th>COUNTRY</th>
            <th>POLICY LIMIT OF LIABILITY (USD)</th>
            <th>POLICY PERIOD (DAYS)</th>
            <th>EST. PREMIUM (USD)</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(policy, index) in (filteredList)" :key="index">
            <td>{{moment(policy.date).format('DD MMM YYYY')}}</td>
            <td>{{policy.dec_id}}</td>
            <td>{{policy.insured_name}}</td>
            <td>
              <div class="product">{{policy.product_name}}</div>
            </td>
            <td>{{policy.obligor_name}}</td>
            <td>{{policy.country_name}}</td>
            <td>{{policy.limit_of_liability}}</td>
            <td>{{policy.policy_period}}</td>
            <td>{{policy.estimated_premium}}</td>
            <td>
              <div class="status-button" :class="(policy.status==='awaiting')?'awaiting':'bound'">
                <p class="status">{{policy.status}}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import axios from "axios";
import moment from "moment";
import Vue from "vue";
import Multiselect from "vue-multiselect";
import "circular-std";

Vue.component("multiselect", Multiselect);

export default {
  data: () => ({
    selectedValues: [],
    options: [],
    policies: [],
    search: "",
    moment: moment
  }),

  methods: {
    filterByStatus: function({ label, value }) {
      var selectedStringToCompare = "";

      for (let i = 0; i < this.selectedValues.length; i++) {
        selectedStringToCompare =
          this.selectedValues[i].value + ", " + selectedStringToCompare;
      }

      console.log(
        "The selected string to compare is ",
        selectedStringToCompare
      );
    }
  },

  computed: {
    filteredList: function() {
      return this.policies.filter(data => {
        let dec_id = data.dec_id.toLowerCase().match(this.search.toLowerCase());
        let insured_name = data.insured_name
          .toLowerCase()
          .match(this.search.toLowerCase());
        let product_name = data.product_name
          .toLowerCase()
          .match(this.search.toLowerCase());
        let obligor_name = data.obligor_name
          .toLowerCase()
          .match(this.search.toLowerCase());
        let country_name = data.country_name
          .toLowerCase()
          .match(this.search.toLowerCase());
        let limit_of_liability = data.limit_of_liability
          .toString()
          .toLowerCase()
          .match(this.search.toLowerCase());
        let policy_period = data.policy_period
          .toString()
          .toLowerCase()
          .match(this.search.toLowerCase());
        let estimated_premium = data.estimated_premium
          .toString()
          .toLowerCase()
          .match(this.search.toLowerCase());
        let status = data.status.toLowerCase().match(this.search.toLowerCase());

        return (
          dec_id ||
          insured_name ||
          product_name ||
          obligor_name ||
          country_name ||
          status ||
          limit_of_liability ||
          policy_period ||
          estimated_premium
        );
      });
    },
    // Needs to be investigated more
    selectedStatuses() {
      const statuses = [];
      for (const { value } of this.selectedValues) {
        statuses.push(value.toLowerCase());
      }

      return statuses;
    },
    filteredPolicies() {
      if (this.selectedStatuses.length === 0) {
        return this.policies;
      }
      const policies = [];
      for (const policy of this.policies) {
        if (this.selectedStatuses.includes(policy.status.toLowerCase())) {
          policies.push(policy);
        }
      }
      return policies;
    }
  },

  created() {
    axios
      .get("http://localhost:3000/policies")
      .then(response => (this.policies = response.data))
      .catch(err => console.log(err));

    axios
      .get("http://localhost:3000/statuses")
      .then(response => (this.options = response.data))
      .catch(err => console.log(err));
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
th {
  width: 46px;
  height: 14px;
  text-align: left;
  font-family: "IBM Plex Mono", monospace;
  letter-spacing: 0;
  color: #787a80;
  opacity: 1;
  background-color: #1b1b1b;
}

tr {
  font-family: "IBM Plex Mono", monospace;
  font-size: 12px;
  height: 47px;
  text-align: left;
  letter-spacing: 0;
  color: #f2f3f7;
  opacity: 1;
}

tr:nth-child(odd) {
  background-color: #0f0f0f;
  color: #f2f3f7;
}

input[type="text"] .search {
  font-family: "IBM Plex Mono", monospace;
  background-color: #0f0f0f;
  color: #fff;
}

input[type="text"]:focus {
  outline: none !important;
  border: 1px solid #04f9d3;
  box-shadow: 0 0 2px #04f9d3;
}

.table-label {
  margin-left: 5%;
  text-align: left;
  font-family: CircularStd;
  letter-spacing: -1.68px;
  color: #ffffff;
  opacity: 1;
}

.status-button {
  width: 68px;
  height: 20px;
  background: #52c76b 0% 0% no-repeat padding-box;
  border-radius: 22px;
  opacity: 1;
  text-align: center;
}

.awaiting {
  background: #0777ff 0% 0% no-repeat padding-box;
  border-radius: 22px;
  opacity: 1;
}

.bound {
  background: #52c76b 0% 0% no-repeat padding-box;
  border-radius: 22px;
  opacity: 1;
}

.table-header {
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.status {
  text-align: center;
  font: Bold 12px/15px IBM Plex Mono;
  letter-spacing: -0.3px;
  color: #000000;
  text-transform: uppercase;
  opacity: 1;
}

.search {
  margin-top: 1%;
  margin-left: 40%;
  color: #ffffff;
  width: 322px;
  height: 44px;
  background: #000000 0% 0% no-repeat padding-box;
  border: 1px solid #7979804a;
  border-radius: 3px;
  opacity: 1;
  font-family: CircularStd;
  font-size: 16px;
  padding: 0 15px 0 15px;
}

.product::before {
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(transparent 150px, white);
}

.horizontal-row {
  border: 2px solid #ffffff;
  opacity: 1;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}

.mutliselect {
  background-color: #000000;
  font-family: CircularStd;
}

.multiselect-dropdown {
  margin-right: 5%;
  width: 15%;
  margin-top: 1%;
}

.multiselect-dropdown:focus {
  margin-right: 5%;
  width: 15%;
  margin-top: 1%;
}
</style>
