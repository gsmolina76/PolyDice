import Vue from 'vue';
import Vuex from 'vuex';
import Players from './Players';
import BoardData from './BoardData';
import CardData from './CardData';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        Players,
        BoardData,
        CardData
    }
});

//store.$app = app;