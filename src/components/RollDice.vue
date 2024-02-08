<template>
    <div id='RollDice'>
        <button @click='rollDice' :disabled='disabled'>Roll Dice</button>
        <div class='dice'>
            <img :src='dieFace'>
            <img :src='dieFace2'>
        </div>
        <h2 v-if='totalRoll'>{{totalRoll}}</h2>
        <h2 v-if='doublesRolled > 0'>doubles rolled: {{doublesRolled}}</h2>
    </div>
</template>

<script>
    export default{
        name: 'RollDice',
        data() {
            return {
                result:{
                    rolledValue: 1,
                    rolledValue2: 1
                },
                tumbles:500,
                timeOut: null,
                disabled: false,
                control:0,
                totalRoll:null,
                doublesRolled:0
            }
        },
        computed:{
            dieFace(){
                return require('../assets/images/die-faces/side-'+this.result.rolledValue+'.png');
            },
            dieFace2(){
                return require('../assets/images/die-faces/side-'+this.result.rolledValue2+'.png');
            }
        },
        methods: {
            rollDice(){
                this.totalRoll = null;
                this.disabled = true;
                this.tumbles = Math.ceil(Math.random() * 3000 + 500)
                
                this.timeout = setInterval(()=>{
                    this.result.rolledValue = Math.ceil(Math.random() * 6);
                    this.result.rolledValue2 = Math.ceil(Math.random() * 6);
                }, 100);

                setTimeout(()=>{
                    clearInterval(this.timeout);
                    let doubles = false;
                    this.disabled = false;
                    this.totalRoll = this.result.rolledValue + this.result.rolledValue2;
                    this.$store.dispatch('BoardData/set', {field: 'CurrentRoll', value:this.totalRoll});
                    if(this.result.rolledValue == this.result.rolledValue2){doubles = true; this.doublesRolled++}else{this.doublesRolled = 0;}
                    this.$emit('move-token', this.totalRoll, doubles);
                }, this.tumbles);
                
            },
        },
    }
</script>

<style>
    #RollDice .dice img{padding: 20px; max-width: 100px;}
</style>