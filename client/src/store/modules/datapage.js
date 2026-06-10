import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const data = {

  NATO_States: [
    'Belgium', 'Canada', 'Denmark', 'France', 'Iceland', 'Italy', 'Luxembourg',
    'Netherlands', 'Norway', 'Portugal', 'United Kingdom', 'United States'
  ],
  initialMapYear: 1949, 
}

const getters = {
  NATO_States: (state) => state.NATO_States,
  initialMapYear: (state) => state.initialMapYear, 
};

const actions = {

  grabMapData: ({ commit }, payload) => {
    commit('setInitialMapYear', payload['year'])
		const path = 'http://localhost:5000/getInitialDataForMapGraph';
    axios.post(path, payload, { headers: { 'Content-Type': 'application/json' } })
			.then((res) => {
        console.log(res.data)
				commit('setNATO_States', res.data)
			})
			.catch((error) => {
				console.log(error);
			});
	},

};

const mutations = {

  setNATO_States(state, value) {
		state.NATO_States = value;
	},

	setInitialMapYear(state, value) {
    state.initialMapYear = value; 
  }, 

};

export default {
	namespaced: true,
	state: data,
	getters,
	actions,
	mutations,
};