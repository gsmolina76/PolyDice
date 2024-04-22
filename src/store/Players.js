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
        console.log("updating " + payload.field + ' with ' + payload.value );
        state[payload.field] = payload.value
    }
}
const actions = {
    set({commit}, payload){
        console.log("setting " + payload.field + ' with ' + payload.value );
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
        let tempPlayerArray = state.players;
        let tokenIndex = state.players.findIndex(x=>x.token == payload.token);
        let tempPlayer = state.players[tokenIndex];
        tempPlayer.cash -= payload.value;
        tempPlayerArray[tokenIndex] = tempPlayer;
        commit('updateState', {field: 'players', value: tempPlayerArray})

    },
    getMoney({commit, state}, payload){
        console.log('getMoney - ' + JSON.stringify(payload));
        let tempPlayerArray = state.players;
        let tokenIndex = state.players.findIndex(x=>x.token == payload.token);
        let tempPlayer = state.players[tokenIndex];
        tempPlayer.cash += payload.value;
        tempPlayerArray[tokenIndex] = tempPlayer;
        commit('updateState', {field: 'players', value: tempPlayerArray})
    },
    
}
export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}