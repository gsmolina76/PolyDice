<template>
    <div id='CloseupBoard'>
        <div class='BoardEdge'>
            <BoardSpace v-for='(space, idx) in displaySpaces' :key='idx' 
                :spaceType='space.spaceType'
                :spaceName='space.spaceName'
                :spaceText='space.spaceText'
                :colorGroup='space.colorGroup'
                :cost='space.cost'
                :spaceClass='space.spaceClass'
                :id='space.id'
            />
        </div>
    </div>
</template>
<script>
    import BoardSpace from './BoardSpace.vue'
    
    export default{
        name: 'GameBoard',
        props:['currentSpace'],
        components: {
            BoardSpace
        },
        data(){
            return{
                BoardSpaces: this.$store.getters['BoardData/BoardSpaces']
            }
        },
        computed:{
            displaySpaces(){
                let tempStretch = [];
                let endIndex = this.$props.currentSpace + 2;
                let startIndex = this.$props.currentSpace - 2;

                for(let i=startIndex; i <= endIndex; i++){
                   // console.log('is this working? - '+ i)
                    if(i < 0){
                        tempStretch.push(this.BoardSpaces[this.BoardSpaces.length - Math.abs(0 - i)]);
                    }else if(i >= this.BoardSpaces.length){
                        tempStretch.push(this.BoardSpaces[i - this.BoardSpaces.length]);
                    }else{
                        tempStretch.push(this.BoardSpaces[i]);
                    }
                }
                return tempStretch;
            }
        }
    }
</script>

<style>
    #CloseupBoard{
        width:100vw;
        overflow-x: scroll;
    }
    .BoardEdge{
        display: inline-flex;
        flex-direction: row-reverse;
        border-top:3px solid #000; 
        border-bottom:3px solid #000; 
        height: 500px;
        background-color: honeydew;
        }
</style>