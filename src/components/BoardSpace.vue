<template>
    <div class='BoardSpace' :class='spaceClass' :style="{backgroundImage: `url(${bgImage})`}">
        <div v-if='spaceType=="property"'>
            <div class='ImprovementBar' :style="{ backgroundColor: colorGroup}">
            </div>
        </div>
        <h3 class='GoCollect mt-3' v-if="spaceType == 'go'">{{spaceText}}</h3>
        <h3 class='Just mt-3' v-if="spaceType == 'jail'">JUST</h3>
        <h3 class='Visiting' v-if="spaceType == 'jail'">VISITING</h3>
        <h3 class='Goto mt-3' v-if="spaceType == 'gojail'">GO TO</h3>
        <h3 class='ToJail mt-3' v-if="spaceType == 'gojail'">JAIL</h3>
        <h3 v-if="!spaceClass.includes('Corner')"  class='SpaceName  mt-3'>{{spaceName}}</h3>
        <div class='TokensHere' v-if='tokenHere'>
            <PlayerToken v-for='(currentToken, index) in tokensOnSpace' :key='index' 
                :PlayerName='currentToken.name'
                :PlayerNumber='index+1'
                :TokenName='currentToken.token'
                :TokenPosition='currentToken.position'
            />
        </div>
        <div class='Cost' v-if='cost > 0'>
            <span>${{cost}}</span>
        </div>
    </div>
</template>

<script>
import PlayerToken from './PlayerToken.vue'
export default{
    name: 'BoardSpace',
    props:['id','spaceType', 'spaceName', 'cost', 'colorGroup', 'spaceText', 'spaceClass'],
    components:{
        PlayerToken
    },
    computed:{
        tokenHere(){
            return this.tokensOnSpace.length > 0
        },
        currentTokens(){
            return this.$store.getters['Players/players']
        },
        tokensOnSpace(){
            let result = []
            this.currentTokens.forEach((token) => {
                if(token.position == this.$props.id){
                    result.push(token);
                }
            });
            return result
        },
        bgImage(){
            switch(this.$props.spaceType){
                case 'railroad': return require('../assets/images/railroad.png'); 
                case 'chance': return require('../assets/images/chance.png'); 
                case 'community': return require('../assets/images/commuchest.png'); 
                case 'electric': return require('../assets/images/electric.png'); 
                case 'waterworks': return require('../assets/images/waterworks.png'); 
                case 'gojail': return require('../assets/images/gojail.png'); 
                case 'parking': return require('../assets/images/freeparking.png'); 
                case 'luxtax': return require('../assets/images/luxury.png'); 
                case 'jail': return require('../assets/images/injail.jpg'); 
                case 'go': return require('../assets/images/go-go-arrow.png'); 
                default: return 'none'
            }
        }
    }
}
</script>

<style type="scss">
    .BoardSpace{
        position: relative;
        height: 100%;
        width: 360px;
        border-right: 2px solid #000;
        border-left: 2px solid #000;
        background-repeat: no-repeat;
        background-size: 60%;
        background-position: 50%;
    }
    .Chance{
            background-size: 40%;
    }
    .ImprovementBar{
        height: 80px;
        border-bottom: 3px solid #000;
    }
    .Cost{
        width: 100%;
        position: absolute;
        bottom: 15px;
    }
    .Cost span{
        font-family: 'Open Sans', Arial, sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 35px;
    }
    .Corner.Go{
        background-position: 50% 75%;
    }
    .SpaceName, .BoardSpace h3{
        font-family:'Open Sans', Arial, sans-serif;
        font-weight:700;
        font-style:normal;
        text-transform: uppercase;
        font-size: 35px;
        margin-left: 15px;
        margin-right: 15px;
    }
    .Corner.Go{
        background-position: 50% 75%;
    }
    .BoardSpace h3.GoCollect{
    transform: rotate(-24deg);
    right: 28%;
    top: 5%;
    position: absolute;
    margin-left: 55px;
    margin-right: 55px;
    }
    .Just{
        transform: rotate(90deg);
        position: absolute;
        top: 35%;
    }
    .Visiting{
        position: absolute;
        bottom: 0;
        left: 35%;
    }
    .Goto{
        position: absolute;
        left: 35%;
    }
    .ToJail{
        position: absolute;
        bottom: 0;
        left: 35%;
    }
    .Corner{
        width: 500px;
    }
    .InJail{
        background-size: 75%;
        background-position: 100% 0%;
    }
    .TokensHere{
        position: absolute;
        top: 10%;
        width: 100%;
        height: auto;
    }

</style>