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
  initialState: "Albania",
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
  NatoCountriesEconomies: [
    ['Montenegro', 5.57], 
    ['North Macedonia', 12.51], 
    ['Albania', 18.66], 
    ['Iceland', 25.37], 
    ['Estonia', 36.7], 
    ['Latvia', 38.92], 
    ['Slovenia', 63.38], 
    ['Croatia', 64.38], 
    ['Lithuania', 70.77], 
    ['Luxembourg', 82.53], 
    ['Bulgaria', 86.93], 
    ['Slovakia', 118.63], 
    ['Hungary', 186.34], 
    ['Greece', 226.7], 
    ['Portugal', 246.3], 
    ['Czech Republic', 280.83], 
    ['Finland', 295.89], 
    ['Romania', 296.25], 
    ['Denmark', 386.71], 
    ['Norway', 544.14], 
    ['Belgium', 558.41], 
    ['Sweden', 581.53], 
    ['Poland', 643.65], 
    ['Türkiye', 879.28], 
    ['Netherlands', 1033.91], 
    ['Spain', 1487.9], 
    ['Canada', 1970.55], 
    ['Italy', 1999.6], 
    ['France', 3130.85], 
    ['United Kingdom', 3322.92], 
    ['Germany', 4274.2], 
    ['United States', 26634.71]],
  NatoCountriesGDPDATA: [
    ['North Macedonia', 6014.42], 
    ['Albania', 6688.17], 
    ['Montenegro', 9440.68], 
    ['Türkiye', 10344.47], 
    ['Bulgaria', 13415.12], 
    ['Romania', 15543.02], 
    ['Croatia', 16592.78], 
    ['Poland', 17154.85], 
    ['Hungary', 19289.86], 
    ['Greece', 21266.42], 
    ['Latvia', 21622.22], 
    ['Slovakia', 21647.81], 
    ['Portugal', 24005.85], 
    ['Lithuania', 25275.0], 
    ['Czech Republic', 25978.72], 
    ['Estonia', 28230.77], 
    ['Slovenia', 30325.36], 
    ['Spain', 31630.53], 
    ['Italy', 32953.2], 
    ['France', 46438.0], 
    ['Belgium', 47973.37], 
    ['United Kingdom', 48880.85], 
    ['Germany', 51783.38], 
    ['Canada', 52020.86], 
    ['Finland', 53603.26], 
    ['Sweden', 55755.51], 
    ['Netherlands', 58845.19], 
    ['Iceland', 63425.0], 
    ['Denmark', 65544.07], 
    ['United States', 80114.03], 
    ['Norway', 100209.94], 
    ['Luxembourg', 137550.0]
  ],
  EconomyMilitarySize: [
    [5.57, 0.09, 'Montenegro'], 
    [18.66, 0.18, 'Albania'], 
    [12.51, 0.4, 'North Macedonia'], 
    [25.37, 0.48, 'Iceland'], 
    [36.7, 1.22, 'Estonia'], 
    [38.92, 1.35, 'Latvia'], 
    [70.77, 1.51, 'Lithuania'], 
    [86.93, 1.54, 'Bulgaria'], 
    [118.63, 2.36, 'Slovakia'], 
    [82.53, 2.39, 'Luxembourg'], 
    [63.38, 2.41, 'Slovenia'], 
    [64.38, 2.69, 'Croatia'], 
    [280.83, 2.95, 'Czech Republic'], 
    [296.25, 4.06, 'Romania'], 
    [246.3, 4.88, 'Portugal'], 
    [186.34, 4.96, 'Hungary'], 
    [544.14, 5.44, 'Norway'], 
    [226.7, 6.05, 'Greece'], 
    [386.71, 7.0, 'Denmark'], 
    [295.89, 7.72, 'Finland'], 
    [558.41, 9.44, 'Belgium'], 
    [581.53, 12.56, 'Sweden'], 
    [1033.91, 14.06, 'Netherlands'], 
    [643.65, 17.76, 'Poland'], 
    [879.28, 24.97, 'Türkiye'], 
    [3130.85, 33.5, 'France'], 
    [1999.6, 41.99, 'Italy'], 
    [1970.55, 47.69, 'Canada'], 
    [3322.92, 48.18, 'United Kingdom'], 
    [1487.9, 51.18, 'Spain'], 
    [4274.2, 179.09, 'Germany'], 
    [26634.71, 761.75, 'United States']
  ],
  populationVsEconomySizeData: [
    [0.59, 5.57, 'Montenegro'], 
    [2.08, 12.51, 'North Macedonia'], 
    [2.79, 18.66, 'Albania'], 
    [0.4, 25.37, 'Iceland'], 
    [1.3, 36.7, 'Estonia'], 
    [1.8, 38.92, 'Latvia'], 
    [2.09, 63.38, 'Slovenia'], 
    [3.88, 64.38, 'Croatia'], 
    [2.8, 70.77, 'Lithuania'], 
    [0.6, 82.53, 'Luxembourg'], 
    [6.48, 86.93, 'Bulgaria'], 
    [5.48, 118.63, 'Slovakia'], 
    [9.66, 186.34, 'Hungary'], 
    [10.66, 226.7, 'Greece'], 
    [10.26, 246.3, 'Portugal'], 
    [10.81, 280.83, 'Czech Republic'], 
    [5.52, 295.89, 'Finland'], 
    [19.06, 296.25, 'Romania'], 
    [5.9, 386.71, 'Denmark'], 
    [5.43, 544.14, 'Norway'], 
    [11.64, 558.41, 'Belgium'], 
    [10.43, 581.53, 'Sweden'], 
    [37.52, 643.65, 'Poland'], 
    [85.0, 879.28, 'Türkiye'], 
    [17.57, 1033.91, 'Netherlands'], 
    [47.04, 1487.9, 'Spain'], 
    [37.88, 1970.55, 'Canada'], 
    [60.68, 1999.6, 'Italy'], 
    [67.42, 3130.85, 'France'], 
    [67.98, 3322.92, 'United Kingdom'],
    [82.54, 4274.2, 'Germany'], 
    [332.46, 26634.71, 'United States']
  ],
}

const getters = {
  NATO_States: (state) => state.NATO_States,
  initialMapYear: (state) => state.initialMapYear, 
  joinByDecadeData: (state) => state.joinByDecadeData,
  foundingMemberPieChart: (state) => state.foundingMemberPieChart, 
  yearsInNatoData: (state) => state.yearsInNatoData, 
  FoundingVsNonFoundingByRegionData: (state) => state.FoundingVsNonFoundingByRegionData, 
  NatoTimeLineData: (state) => state.NatoTimeLineData,
  NatoCountriesEconomies: (state) => state.NatoCountriesEconomies, 
  NatoCountriesGDPDATA: (state) => state.NatoCountriesGDPDATA,
  EconomyMilitarySize: (state) => state.EconomyMilitarySize,
  populationVsEconomySizeData: (state) => state.populationVsEconomySizeData, 
  initialState: (state) => state.initialState,
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

  setInitialState(state, value) {
    state.initialState = value;
  },

};

export default {
	namespaced: true,
	state: data,
	getters,
	actions,
	mutations,
};