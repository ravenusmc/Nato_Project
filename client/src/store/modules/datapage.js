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
  joinByDecadeData: [['1940-1949', 12], ['1950-1959', 3], ['1980-1989', 1], ['1990-1999', 3], ['2000-2009', 9], ['2010-2019', 1], ['2020-2029', 3]], 
  foundingMemberPieChart: [[12, 20]], 
  yearsInNatoData: [[0, 1], [1, 1], [4, 1], [7, 1], [15, 2], [20, 7], [25, 3], [42, 1], [69, 1], [72, 2], [75, 12]],
  FoundingVsNonFoundingByRegionData: [
    ['Southern Europe', {'Founding_Member': 1, 'Non_Founding_Member': 7}], 
    ['Western Europe', {'Founding_Member': 6, 'Non_Founding_Member': 2}], 
    ['Eastern Europe', {'Founding_Member': 0, 'Non_Founding_Member': 2}], 
    ['North America', {'Founding_Member': 2, 'Non_Founding_Member': 0}], 
    ['Central Europe', {'Founding_Member': 0, 'Non_Founding_Member': 4}], 
    ['Northern Europe', {'Founding_Member': 3, 'Non_Founding_Member': 5}]
  ],
  NatoTimeLineData: [
    {'Country': 'Albania', 'Join Year': 2009}, 
    {'Country': 'Belgium', 'Join Year': 1949}, 
    {'Country': 'Bulgaria', 'Join Year': 2004}, 
    {'Country': 'Canada', 'Join Year': 1949}, 
    {'Country': 'Croatia', 'Join Year': 2009}, 
    {'Country': 'Czech Republic', 'Join Year': 1999}, 
    {'Country': 'Denmark', 'Join Year': 1949}, 
    {'Country': 'Estonia', 'Join Year': 2004}, 
    {'Country': 'Finland', 'Join Year': 2023}, 
    {'Country': 'France', 'Join Year': 1949}, 
    {'Country': 'Germany', 'Join Year': 1955}, 
    {'Country': 'Greece', 'Join Year': 1952}, 
    {'Country': 'Hungary', 'Join Year': 1999}, 
    {'Country': 'Iceland', 'Join Year': 1949}, 
    {'Country': 'Italy', 'Join Year': 1949}, 
    {'Country': 'Latvia', 'Join Year': 2004}, 
    {'Country': 'Lithuania', 'Join Year': 2004}, 
    {'Country': 'Luxembourg', 'Join Year': 1949}, 
    {'Country': 'Montenegro', 'Join Year': 2017}, 
    {'Country': 'Netherlands', 'Join Year': 1949}, 
    {'Country': 'North Macedonia', 'Join Year': 2020}, 
    {'Country': 'Norway', 'Join Year': 1949}, 
    {'Country': 'Poland', 'Join Year': 1999}, 
    {'Country': 'Portugal', 'Join Year': 1949}, 
    {'Country': 'Romania', 'Join Year': 2004}, 
    {'Country': 'Slovakia', 'Join Year': 2004}, 
    {'Country': 'Slovenia', 'Join Year': 2004}, 
    {'Country': 'Spain', 'Join Year': 1982}, 
    {'Country': 'Sweden', 'Join Year': 2024}, 
    {'Country': 'Türkiye', 'Join Year': 1952}, 
    {'Country': 'United Kingdom', 'Join Year': 1949}, 
    {'Country': 'United States', 'Join Year': 1949}
  ], 
  // Data Fields dealing with economy 
  
}

const getters = {
  NATO_States: (state) => state.NATO_States,
  initialMapYear: (state) => state.initialMapYear, 
  joinByDecadeData: (state) => state.joinByDecadeData,
  foundingMemberPieChart: (state) => state.foundingMemberPieChart, 
  yearsInNatoData: (state) => state.yearsInNatoData, 
  FoundingVsNonFoundingByRegionData: (state) => state.FoundingVsNonFoundingByRegionData, 
  NatoTimeLineData: (state) => state.NatoTimeLineData,
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