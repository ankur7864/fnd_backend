// Starting file of VUEX

import Vuex from 'vuex';
import Vue from 'vue';
import ticketModule from './ticketModule.js';


//Load Vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({
    modules:{
        ticketModule
    }
})