const state = () =>({
    numberOfPlayers:0,
    currentPlayer:{},
    players:[],
    tokens:['boot', 'car', 'dog', 'ship', 'thimble', 'tophat', 'wheelbarrow']
});
const getters = {
        numberOfPlayers: state => state.numberOfPlayers,
        currentPlayer: state => state.currentPlayer,
        players: state => state.players,
        tokens: state => state.tokens
}
const mutations = {
    setPosition(state, player){
        state.currentPlayer = player;
    },
    updateState(state, payload){
        state[payload.field] = payload.value
    }
}
const actions = {
    set({commit}, payload){
        commit('updateState', {field: payload.field, value: payload.value})
    },
    moveTo({dispatch, getters}, payload){
        let allPlayers = getters['players'];
        allPlayers[payload.token].position = payload.position;
        dispatch('set', {field: 'players', value: allPlayers});
    },
    goToJail({commit, state}, payload){
        console.log('goToJail - ' + JSON.stringify(payload));
        console.log('goToJail - ' + state.currentPlayer);
        let tempPlayer = state.currentPlayer;
        tempPlayer.jailed = true;
        tempPlayer.position = 10;
        tempPlayer.currentSpaceName = 'In Jail';
        commit('updateState', {field: 'currentPlayer', value: tempPlayer})
    },
    leaveJail({commit, state}, payload){
        console.log('goToJail - ' + JSON.stringify(payload));
        console.log('goToJail - ' + state.currentPlayer);
        let tempPlayer = state.currentPlayer;
        tempPlayer.jailed = false;
        tempPlayer.escapeTries = 0;
        tempPlayer.currentSpaceName = 'Just Visiting';
        commit('updateState', {field: 'currentPlayer', value: tempPlayer})
    },
    payMoney({commit, state}, payload){
        console.log('payMoney - ' + JSON.stringify(payload));
        let tempPlayer = state.players[state.players.findIndex(x=>x.token == payload.token)];
        tempPlayer.cash -= payload.value;
        commit('updateState', {field:`${state.players[state.players.findIndex(x=>x.token == payload.token)]}`, value: tempPlayer})

    },
    getMoney({commit, state}, payload){
        console.log('getMoney - ' + JSON.stringify(payload));
        let tempPlayer = state.players[state.players.findIndex(x=>x.token == payload.token)];
        tempPlayer.cash += payload.value;
        commit('updateState', {field:`${state.players[state.players.findIndex(x=>x.token == payload.token)]}`, value: tempPlayer})
    },
    
}
export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}