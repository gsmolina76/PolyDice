<template>
    <div class='PlayerToken' :class='`player-${PlayerNumber}`'>
        <div>
            <img :src='tokenImg'/>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'PlayerToken',
        props:['PlayerName', 'TokenName', 'TokenPosition', 'PlayerNumber'],
        computed:{
            tokenImg(){
                return require('../assets/images/'+this.$props.TokenName+'-token.png')
            }
        }
    }
</script>

<style>
    .PlayerToken{
        position: absolute;
        width: 30%;
    } 
    .PlayerToken img{width: 160px;}
    .player-1{ left:30%; top:10px; }
    .player-2{ left:10%; top:200px; }
    .player-3{ left:50%; top:200px; }
    .player-4{ left:30%; top:300px; }

</style>