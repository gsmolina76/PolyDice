<template>
    <div class='Inventory'>
        <div class='SinglePlayerInventory'>
            <div v-for='(group, index) in {colorGroupData}' :key='index'>
                <div v-for='({colorGroup}, index) in group' :key='index'>
                    <PlayerProperty :id='colorGroup.value'/>
                </div>   
            </div>
        </div>
        
    </div>
</template>

<script>
import PlayerProperty from './PlayerProperty.vue';
export default{
    name:'PlayerInventory',
    props:['player'],
    components:{
            PlayerProperty
    },
    computed:{
        colorGroupData(){
            let collectData = [];
            this.$props.player.properties.forEach((ownedProperty) => {
                collectData.push({propId: ownedProperty, colorGroup: this.$store.getters['BoardData/Properties'][this.$store.getters['BoardData/Properties'].findIndex(x=>x.boardId == ownedProperty)].propertyType});
            });
            let groupByColor = [];
            collectData.forEach((node)=>{
                if(groupByColor.findIndex(x=> x.groupName == node.colorGroup) == -1) groupByColor.push({groupName: node.colorGroup, colorGroupIds:[]});
                groupByColor[groupByColor.findIndex(x=> x.groupName == node.colorGroup)].colorGroupIds.push({value: node.propId});

            });
            return groupByColor;
        }
        
    }/*,
    methods:{
        ownedInGroup(colorGroup){
            console.log('colorGroup: ' + JSON.stringify(colorGroup))
            let collectData = [];
            this.$props.player.properties.forEach((ownedProperty) => {
                if()
                collectData.push(this.$store.getters['BoardData/Properties'][this.$store.getters['BoardData/Properties'].findIndex(x=>x.propertyType == colorGroup)].boardId);
            });
            return collectData;
        }
    }*/


}
</script>