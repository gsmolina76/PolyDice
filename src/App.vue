<template>
  <div id="app">
    <SetupGame
      :gameInProgress='gameStarted'
      @start-game='startGame'
    />
    <div id='InProgress'>
      <RollDice 
        @move-token='moveToken'
      />
      <div v-if="(currentToken.jailed == true)">
        <h3>IN JAIL! You've tried to escape {{currentToken.escapeTries}} times </h3>
        <button @click='bailOut()'>Pay $50 Bail</button>
      </div>
      <GameBoard
        v-if='gameStarted'
        :currentSpace='currentSpace'
      />
      <b-modal id="modal-property" title="BootstrapVue">
         <PropertyCard
          v-if="(displaySpace != null)"
          :spaceId='currentSpace'
          :propClass='displaySpace.spaceClass'
          @purchase-property='purchaseProperty()'
          @pay-owner='payOwner'
         />
      </b-modal>
      <b-modal id="modal-card" title="BootstrapVue">
          <CCard
          v-if="(displaySpace != null)"
          :spaceId='currentSpace'
          :propClass='displaySpace.spaceClass'
          @resolve-card='resolveCard'
          />
      </b-modal>
      <b-modal id="modal-space" title="BootstrapVue">
          <div v-if="(displaySpace != null)">
              <h2>{{displaySpace.spaceName}}</h2>
              <button class='col-4 btn btn-success' v-if="(displaySpace.cost)" @click="payBank(currentToken.token, displaySpace.cost)"> Pay ${{displaySpace.cost}}</button>
          </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import RollDice from './components/RollDice.vue';
import PropertyCard from './components/PropertyCard.vue'
import GameBoard from './components/GameBoard.vue'
import SetupGame from './components/SetupGame.vue'
import CCard from './components/CCard.vue'

export default {
  name: 'App',
  components: {
    RollDice,
    PropertyCard,
    GameBoard,
    SetupGame,
    CCard,
  },
  data(){
    return{
      currentSpace:0,
      gameStarted: false,
      doublesRolled:0,
      displaySpace: null
    }
  },
  computed:{
    activePlayer(){
      let checkIndex = this.allPlayers == [] ? null : this.allPlayers.findIndex(x => x.playerId == this.currentToken.playerId);
      return checkIndex
    },
    currentToken(){
        return this.$store.getters['Players/currentPlayer']
    },
    allPlayers(){
        return this.$store.getters['Players/players']
    }
  },
  methods:{
    moveToken(roll, doubles){
      if(doubles == true){
        this.doublesRolled++;
        if(this.doublesRolled == 3){
          this.$store.dispatch('Players/goToJail', this.currentToken);
        }
        if(this.currentToken.jailed == true){
            this.$store.dispatch('Players/leaveJail', this.currentToken);
        }
      }
      else{
        this.doublesRolled = 0;
      }
      if(this.currentToken.jailed == false){
        for(let i=0; i< roll; i++){
            this.advanceToken(i, roll);
        }
      }else{
        if(this.currentToken.escapeTries < 3){
            let proxyToken = this.currentToken;
            proxyToken.escapeTries++;
            this.$store.dispatch('Players/set', {field: 'currentPlayer', value:proxyToken});
            if(proxyToken.escapeTries != 3) this.advancePlayer();
            else {
              alert("Pay the $50");
              this.bailout();
              for(let i=0; i< roll; i++){
                this.advanceToken(i, roll);
              }
            }
        }
      }
    },
    advanceToken(count, fullRoll){
      setTimeout(() => {
          this.currentSpace = (this.currentSpace + 1)%40;
          //console.log('current space: '+this.currentSpace)
          if(this.currentSpace == 0) this.$store.dispatch('Players/getMoney', {token: this.currentToken.token, value: 200});
          this.$store.dispatch('Players/moveTo', {token: this.activePlayer, position: this.currentSpace});
          if(count == fullRoll - 1){
            this.followTheSpace();
          }
      }, 1000 * (count))
    },
    startGame(players){
      this.$store.dispatch('Players/set', {field: 'players', value: players});
      this.gameStarted = true;
      this.$store.dispatch('Players/set', {field:'currentPlayer', value: players[0]});
      console.log('initialize decks');
      this.$store.dispatch('CardData/initializeDeck', {deck:'chance'});
      this.$store.dispatch('CardData/initializeDeck', {deck:'community'});
    },
    followTheSpace(){
      setTimeout(() => {
        this.handleSpace({player: this.activePlayer, spaceId: this.currentSpace})
          .then(() =>{
            if(this.doublesRolled == 0){
              this.advancePlayer();
            }
          });
      }, 1000);

    },
    async handleSpace(payload){
      let scoper = this;
      return new Promise(function (resolve, reject) {
        let spaces = scoper.$store.getters['BoardData/BoardSpaces'];
        let space = spaces[spaces.findIndex(x => x.id == payload.spaceId)]
        console.log('handlespace - '+ JSON.stringify(space));
        scoper.displaySpace = space;
        let playerList = scoper.$store.getters['Players/players'];
        playerList[payload.player].currentSpaceName = space.spaceName;
        switch(space.spaceType){
            case 'property':
            case 'railroad':
            case 'waterworks':
            case 'electric': 
                scoper.$bvModal.show('modal-property');
                break;
            case 'incomeTax':
            case 'luxTax':
                scoper.$bvModal.show('modal-space');  break;
            case 'gojail':
                scoper.$bvModal.show('modal-space');
                scoper.$store.dispatch('Players/goToJail', scoper.activePlayer);
                break;
            case 'chance':
            case 'community':
                scoper.$bvModal.show('modal-card'); 
                break;
            default: scoper.$bvModal.show('modal-space');  break
        }
        scoper.$store.dispatch('Players/set', {field: 'players', value: playerList})
          .then(()=>{
              scoper.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
                console.log('update - '+ bvEvent, modalId)
                  resolve('player updated')
              });
          })
          .catch((error) =>{
            reject(error);
          });

      });
    },
    advancePlayer(){
      setTimeout(()=>{
        if(this.activePlayer == this.allPlayers.length - 1){
          this.$store.dispatch('Players/set', {field:'currentPlayer', value: this.allPlayers[0]});
        }else{
          this.$store.dispatch('Players/set', {field:'currentPlayer', value: this.allPlayers[this.activePlayer + 1]});
        }
        this.currentSpace = this.allPlayers[this.activePlayer].position;
      }, 1000);
    },
    bailOut(){
      this.$store.dispatch('Players/payMoney', {token: this.currentToken.token, value: 50});
      this.$store.dispatch('Players/leaveJail', this.currentToken);
    },
    purchaseProperty(){
      console.log('giving '+this.displaySpace.spaceClass+': '+this.displaySpace.spaceName+' to '+this.currentToken.token);
      let proxyToken = this.currentToken;
      proxyToken.properties.push(this.displaySpace.id);
      if(this.displaySpace.spaceClass == 'Railroad') proxyToken.railOwned++;
      if(this.displaySpace.spaceClass == 'Utility') proxyToken.utilOwned++;
      this.$store.dispatch('Players/payMoney', {token: this.currentToken.token, value: this.displaySpace.cost});
      this.$store.dispatch('Players/set', {field:'currentPlayer', value: proxyToken});
      this.$store.dispatch('BoardData/setPropertyAttr', {boardId:this.displaySpace.id, attr:'owner', value: this.currentToken.playerId});
      this.$bvModal.hide('modal-property')

    },
    payOwner(cost, owner){
      console.log('giving '+cost+' to '+owner);
      this.$store.dispatch('Players/payMoney', {token: this.currentToken.token, value: cost});
      this.$store.dispatch('Players/getMoney', {token: owner, value: cost});
      this.$bvModal.hide('modal-property')

    },
    payBank(token, amount){
      this.$store.dispatch('Players/payMoney', {token: token, value: amount});
      this.$bvModal.hide('modal-space') 
    },
    resolveCard(token, cardData, deckType){
      console.log('resolve: '+deckType);
        if(cardData.id == 10){ 
          this.$store.dispatch('Players/goToJail', token);
        }else{
          switch (cardData.action){
            case 'win':
              cardData.id == 6 ? this.$store.dispatch('Players/getMoney', {token: token, value: cardData.value * (this.allPlayers.length - 1)}) : this.$store.dispatch('Players/getMoney', {token: token, value: cardData.value});
              break;
            case 'pay':
              this.$store.dispatch('Players/payMoney', {token: token, value: cardData.value});
              break;
            case 'move':
              this.$store.dispatch('Players/moveTo', {token: token, position: cardData.value});
              break;
            default : console.log('missed something!'); break;
          }
        }
        this.$bvModal.hide('modal-card')
        this.$store.dispatch('CardData/returnCard', {deck: deckType});
        
    }
  }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
.modal-dialog{text-align: center;}
.modal-header{display:none !important;}
</style>
