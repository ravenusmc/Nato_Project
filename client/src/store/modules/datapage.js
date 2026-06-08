import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const data = {

  NATO_States: [
    'Belgium', 'Canada', 'Denmark', 'France', 'Iceland', 'Italy', 'Luxembourg',
    'Netherlands', 'Norway', 'Portugal', 'United Kingdom', 'United States'
  ],
}

const getters = {
  NATO_States: (state) => state.NATO_States,
};

const actions = {

  grabMapData: ({ commit }, payload) => {
		const path = 'http://localhost:5000/getInitialDataForMapGraph';
    axios.post(path, payload, { headers: { 'Content-Type': 'application/json' } })
			.then((res) => {
        console.log(res.data)
				commit('setNATO_States', res.data['Screen_vs_Happeniness'])
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

};

export default {
	namespaced: true,
	state: data,
	getters,
	actions,
	mutations,
};