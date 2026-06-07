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

  grabGraphData: ({ commit }) => {
		// const path = 'http://localhost:5000/getInitialDataForGraphs';
		// axios.get(path)
		// 	.then((res) => {
        // // console.log(res.data)
		// 		commit('setScreenTimeVsHappiness', res.data['Screen_vs_Happeniness'])
        // commit('setSleepVsStressData', res.data['sleep_vs_stress'])
        // commit('setDetoxDaysVsStress', res.data['detox_days_vs_stress'])
        // commit('setExerciseVsHappiness', res.data['exercise_vs_happiness'])
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
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