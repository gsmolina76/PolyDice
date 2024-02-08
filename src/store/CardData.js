const state = () =>({
    ChanceCards:[
        {id:0, action: 'move', title:'ADVANCE TO THE NEAREST RAILROAD', text: 'If UNOWNED, you may buy it from the bank. If OWNED, pay owner twice the rental to which they are otherwise entitled', value:0},
        {id:1, action: 'move', title:'ADVANCE TO THE NEAREST RAILROAD', text: 'If UNOWNED, you may buy it from the bank. If OWNED, pay owner twice the rental to which they are otherwise entitled', value:0},
        {id:2, action: 'pay', title: 'SPEEDING FINE', text: 'Pay $15', value:15},
        {id:3, action: 'move', title: 'GO BACK THREE SPACES', text: '', value:0},
        {id:4, action: 'pay', title: 'YOU HAVE BEEN ELECTED CHAIRMAN OF THE BOARD', text: 'Pay each player $50', value:50},
        {id:5, action: 'move', title: 'ADVANCE TO ST. CHARLES PLACE', text: 'If you pass GO, collect $200', value:11},
        {id:6, action: 'move', title: 'ADVANCE TO BOARDWALK', text: '', value:39},
        {id:7, action: 'pay', title: 'MAKE GENERAL REPAIRS ON ALL YOUR PROPERTY', text: 'For each house, pay $25. For each hotel, pay $100', value:0},
        {id:8, action: 'win', title: 'BANK PAYS YOU', text: 'Dividend of $50', value:50},
        {id:9, action: 'move', title: 'ADVANCE TO GO', text: '(Collect $200)', value:200},
        {id:10, action: 'move', title: 'GO TO JAIL', text: 'Go Directly to jail. Do not pass GO. Do not collect $200.', value:0},
        {id:11, action: 'move', title:'ADVANCE TO THE NEAREST UTILITY', text: 'If UNOWNED, you may buy it from the bank. If OWNED, throw dice and pay owner ten times the amount rolled', value:0},
        {id:12, action: 'move', title: 'ADVANCE TO ILLINOIS AVENUE', text: 'If you pass GO, collect $200', value:24},
        {id:13, action: 'win', title: 'YOUR BUILDING LOAN MATURES', text: 'Collect $150', value:150},
        {id:14, action: 'move', title: 'TAKE A TRIP TO READING RAILROAD', text: 'If you pass GO, collect $200', value:5},
        {id:15, action: 'keep', title: 'GET OUT OF JAIL FREE', text: 'This card may be kept until needed or traded', value:0},
        
    ],
    CommunityCards:[
        {id:0, action: 'win', title:'YOU HAVE WON SECOND PRIZE IN A BEAUTY CONTEST', text: 'Collect $10', value:10},
        {id:1, action: 'win', title:'BANK ERROR IN YOUR FAVOR', text: 'Collect $200', value:200},
        {id:2, action: 'move', title: 'ADVANCE TO GO', text: '(Collect $200)', value:0},
        {id:3, action: 'pay', title: 'YOU ARE ASSESED FOR REPAIRS', text: '$40 per house, $115 per hotel', value:0},
        {id:4, action: 'win', title: 'FROM SALE OF STOCK', text: 'You get $50', value:50},
        {id:5, action: 'win', title: 'YOU INHERIT $100', text: '', value:100},
        {id:6, action: 'win', title: 'IT IS YOUR BIRTHDAY', text: 'Collect $10 from each player', value:10},
        {id:7, action: 'win', title: 'RECEIVE $25', text: 'Consultancy fee', value:25},
        {id:8, action: 'pay', title: 'PAY HOSPITAL FEES', text: '$100', value:100},
        {id:9, action: 'win', title: 'INCOME TAX REFUND', text: 'Collect $20.', value:20},
        {id:10, action: 'move', title: 'GO TO JAIL', text: 'Go Directly to jail. Do not pass GO. Do not collect $200.', value:0},
        {id:11, action: 'pay', title: 'PAY SCHOOL FEES', text: '$50', value:50},
        {id:12, action: 'win', title: 'LIFE INSURANCE MATURES', text: 'Collect $100', value:100},
        {id:13, action: 'win', title: 'HOLIDAY FUND MATURES', text: 'Receive $100', value:100},
        {id:14, action: 'pay', title: 'DOCTOR\'S FEES', text: '$50', value:50},
        {id:15, action: 'keep', title: 'GET OUT OF JAIL FREE', text: 'This card may be kept until needed or traded', value:0},
    ],
    ChanceDeck:[],
    ChanceLength:0,
    CommunityDeck:[],
    CommunityLength:0,
});
const getters = {
    ChanceCards:state => state.ChanceCards,
    CommunityCards:state => state.CommunityCards,
    ChanceDeck:state => state.ChanceDeck,
    CommunityDeck:state => state.CommunityDeck,
    ChanceLength:state => state.ChanceLength,
    CommunityLength:state => state.CommunityLength
}
const mutations = {
    updateState(state, payload){
        console.log('update cardData - ' + JSON.stringify(payload))
        state[payload.field] = payload.value
    }
}
const actions = {
    set({commit}, payload){
        commit('updateState', {field: payload.field, value: payload.value})
    },
    initializeDeck({commit, state, dispatch}, payload){
        console.log('initialize called - ' + JSON.stringify(payload))
        console.log('deck: '+ payload.deck + ', chanceLength: '+ state.ChanceLength + ', communityLength: '+state.CommunityLength)
        //let deckLength = payload.deck == 'chance' ? state.ChanceLength : state.CommunityLength;
        let numberArray = [];
        let start = 0;
        let min = 0;
        let max = 15;
        console.log('Max: '+max+', min: '+min);
        for(let i = 0; start <= max; numberArray[i++] = start++)
        console.log('numberArray: '+numberArray);
        commit('updateState', {field: payload.deck == 'chance' ? 'ChanceDeck' : 'CommunityDeck', value: numberArray});
        commit('updateState', {field: payload.deck == 'chance' ? 'ChanceLength' : 'CommunityLength', value: numberArray.length});
        dispatch('shuffle', {deck: payload.deck});


    },
    shuffle({commit, state}, payload){
        console.log('deck: '+ payload.deck + ', chanceLength: '+ state.ChanceLength + ', communityLength: '+state.CommunityLength)
        let deckLength = payload.deck == 'chance' ? state.ChanceLength : state.CommunityLength;
        console.log('deck: '+ payload.deck + ', chanceLength: '+ state.ChanceLength + ', communityLength: '+state.CommunityLength+', deckLength: '+ deckLength)
        let shuffleDeck = payload.deck == 'chance' ? state.ChanceDeck : state.CommunityDeck;
        for (let j, x, i = shuffleDeck.length; i; j = Math.floor(Math.random() * i), x = shuffleDeck[--i], shuffleDeck[i] = shuffleDeck[j], shuffleDeck[j] = x);
        commit('updateState', {field: payload.deck == 'chance' ? 'ChanceDeck' : 'CommunityDeck', value: shuffleDeck});
    },
    returnCard({commit, state}, payload){
        console.log('returning card to bottom')
        let tempDeck = payload.deck == 'Chance' ? state.ChanceDeck : state.CommunityDeck;
        tempDeck.push(tempDeck.shift());
        commit('updateState', {field: payload.deck == 'Chance' ? 'ChanceDeck' : 'CommunityDeck', value: tempDeck});
    }
}
export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}