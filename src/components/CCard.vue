<template>
    <div class='CCard' :class='propClass'>
        <h4 v-if="propClass == 'Chance'"><b>CHANCE:</b></h4>
        <h4 v-if="propClass == 'Community'"><b>COMMUNITY CHEST:</b></h4>
        <h3>{{ CardData.title }}</h3>
        <h5>{{ CardData.text }}</h5>
        <button class='col-3 btn btn-success' @click="$emit('resolve-card', CurrentPlayerId, CardData, propClass)"></button>
    </div>
</template>

<script>
    export default{
        name: 'CCard',
        props:['spaceId','propClass'],
        data(){
            return{
                CardTypeData: this.$props.propClass == 'Chance' ? this.$store.getters['CardData/ChanceCards'] : this.$store.getters['CardData/CommunityCards'],
                CardDeck: this.$props.propClass == 'Chance' ? this.$store.getters['CardData/ChanceDeck'] : this.$store.getters['CardData/CommunityDeck'],
                CurrentPlayerId: this.$store.getters['Players/currentPlayer'].token           
            }
        },
        computed:{
            CardData(){
                return this.CardTypeData[this.CardTypeData.findIndex(x=> x.id == this.CardDeck[0])]
            }
        }
    }
</script>

<style lang="scss">
    #modal-card .CCard{
        width: 450px;
        height: 200px;
        margin: 0 auto;
        border: 2px solid black;
        padding: 1rem 2rem;
    }

    #modal-card .Chance{
        background-color: orangered;
    }
    #modal-card .Community{
        background-color: goldenrod;
    }
</style>