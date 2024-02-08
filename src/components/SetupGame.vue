<template>
    <div id='SetupGame'>
        <div class='PlayerNumber' v-if="(!gameInProgress)">
            <button @click="addPlayer()" :disabled='(numPlayers== 4)'>Add Player</button>
            <button @click="removePlayer()" :disabled='(numPlayers== 1)'>Remove Player</button>
        </div>
        <div class='SetPlayers'>
            <div class='SetPlayer' :class="{CurrentPlayer: currentPlayer.playerId==player.playerId}" v-for='(player, index) in playersInGame' :key='index'>
                <div class='PlayerCard' :class='{"row": gameInProgress}' v-if="(currentPlayer.playerId==player.playerId || !gameInProgress)">
                    <div class='PlayerDisplay' :class='{"col-6": gameInProgress}'>
                        <input v-if="(!gameInProgress)" type='text' v-model='player.name'/>
                        <h3 v-if="(gameInProgress)">{{player.name}}</h3>
                        <h3 v-if="(gameInProgress)">${{player.cash}}</h3>
                        <div class='TokenChoice'>
                            <button v-if="(!gameInProgress)" @click="prevToken(player)">-</button>
                            <img class='SetupPlayerToken' :src='player.tokenimg'/>
                            <button v-if="(!gameInProgress)" @click="nextToken(player)">+</button>
                            <h4>Space: {{player.currentSpaceName}}</h4>
                        </div>
                    </div>
                    <div class="PlayerInventory col-6">
                        <PlayerInventory v-if="(gameInProgress)" :player='currentPlayer'/>
                    </div>
                </div>
                <!--<div v-if="(WaitingPlayers > 0)" class='WaitingPlayers col-6'>
                    <div v-for='(player, index) in waitingPlayers' :key='index' class="row">
                        <div class='PlayerDisplay' :class='{"col-6": gameInProgress}'>
                            <input v-if="(!gameInProgress)" type='text' v-model='player.name'/>
                            <h3 v-if="(gameInProgress)">{{player.name}}</h3>
                            <h3 v-if="(gameInProgress)">${{player.cash}}</h3>
                            <div class='TokenChoice'>
                                <img class='SetupPlayerToken' :src='player.tokenimg'/>
                                <h4>Space: {{player.currentSpaceName}}</h4>
                            </div>
                        </div>
                        <div v-if="(gameInProgress)" class='PlayerInventory col-6'>
                            <div v-for='(property, index) in player.properties' :key='index'>
                                <PlayerProperty :id='property'/>
                            </div>   
                        </div>
                    </div> 
                </div>-->
            </div>
        </div>
        <button v-if="(!gameInProgress)" @click="$emit('start-game', playersInGame)">Start Game</button>  
    </div>
</template>
<script>
import PlayerInventory from './PlayerInventory.vue';
    export default{
        name: 'SetupGame',
        components:{
            PlayerInventory
        },
        props: ['gameInProgress'],
        data(){
            return {
                playersInGame:[],
                tokens: this.$store.getters['Players/tokens'],
                tries: 0
                //tokensInUse: []
            }
        },
        created(){
            //this.tokensInUse = this.tokens;
            this.addPlayer();
        },
        computed:{
            numPlayers:{
                get(){
                    return this.$store.getters['Players/numberOfPlayers']
                },
                set(value){
                    this.$store.dispatch('Players/set', {field: 'numberOfPlayers', value:value})
                }
            },
            currentPlayer(){
                return this.$store.getters['Players/currentPlayer']
            },
            waitingPlayers(){
                let playerQueue = [];
                this.playersInGame.forEach((player) =>{
                    if(player.token != this.currentPlayer.token) playerQueue.push(player);
                });
                return playerQueue;
            }
        },
        methods:{
            addPlayer(){
                this.numPlayers++;
                    let newPlayer = {
                        playerId: this.numPlayers,
                        token: this.tokens[this.numPlayers - 1],
                        name:'',
                        cash:1500,
                        position:0,
                        doubles:0,
                        jailed:false,
                        escapeTries:0,
                        properties:[],
                        railOwned:0,
                        utilOwned:0,
                        freePass:0,
                        currentSpaceName:'Go',
                        tokenimg: require('../assets/images/'+this.tokens[this.numPlayers - 1]+'-token.png')
                    }
                    if(this.playersInGame.findIndex(x => x.token == this.tokens[this.numPlayers - 1]) != -1){
                        this.nextToken(newPlayer)
                    }
                this.playersInGame.push(newPlayer);

            },
            removePlayer(){
                this.numPlayers--;
                this.playersInGame.splice(this.playersInGame.length - 1, 1);
            },
            prevToken(player){
                let currentToken = this.tokens.findIndex(x => x == player.token);
                if(currentToken == 0){
                    currentToken = this.tokens.length - 1
                }else{
                    currentToken--;
                }
                if(this.playersInGame.findIndex(x => x.token == this.tokens[currentToken]) == -1){
                    player.token = this.tokens[currentToken];
                    player.tokenimg = require('../assets/images/'+this.tokens[currentToken]+'-token.png')
                    this.tries = 0;
                }else{
                    this.tries++
                    player.token = this.tokens[currentToken];
                    if(this.tries < 10){
                        this.prevToken(player);
                    }
                }
            },
            nextToken(player){
                let currentToken = this.tokens.findIndex(x => x == player.token);
                if(currentToken == this.tokens.length - 1){
                    currentToken = 0
                }else{
                    currentToken++;
                }
                if(this.playersInGame.findIndex(x => x.token == this.tokens[currentToken]) == -1){
                    player.token = this.tokens[currentToken];
                    player.tokenimg = require('../assets/images/'+this.tokens[currentToken]+'-token.png')
                    this.tries = 0;
                }else{
                    this.tries++
                    player.token = this.tokens[currentToken];
                    if(this.tries < 10){
                        this.nextToken(player);
                    }
                }
            }
        }
    }
</script>
<style>
    #SetupGame .SetPlayers .SetupPlayerToken{width: 100px;}
    #SetupGame .SetPlayers {
        margin: 15px 0;
        display: inline-flex;
    }
    #SetupGame .SetPlayers .SetPlayer .PlayerCard{
        margin: 0 15px;
        padding: 14px;
        max-width: 200px;
        border: 3px solid #000;
        border-radius: 15px;
    }
    #SetupGame .SetPlayers .CurrentPlayer .PlayerCard{
        background-color:blue;
    }
    #SetupGame .SetPlayers .SetupPlayerToken{
        margin-top: 15px;
    }
    #SetupGame .SetPlayers .SetPlayer.CurrentPlayer .PlayerCard{
        max-width: none;
    }

</style>