<template>
    <div class='Inventory row'>
        <div class='SinglePlayerInventory col-12'>
                    <PropertyColorGroup v-for='(colorGroup, idx) in colorGroupData' 
                    :key='idx'
                    :data='colorGroup' />
        </div>
    </div>
</template>

<script>
import PropertyColorGroup from './PropertyColorGroup.vue';
export default{
    name:'PlayerInventory',
    props:['player'],
    components:{
            PropertyColorGroup,
    },
    computed:{
        colorGroupData(){
            let collectData = [];
            this.$props.player.properties.forEach((ownedProperty) => {
                collectData.push({propId: ownedProperty, colorGroup: this.$store.getters['BoardData/Properties'][this.$store.getters['BoardData/Properties'].findIndex(x=>x.boardId == ownedProperty)].propertyType});
            });
            console.log('what the heck goes on here? '+JSON.stringify((collectData)));
            let groupByColor = [];
            collectData.forEach((node)=>{
                if(groupByColor.findIndex(x=> x.groupName == node.colorGroup) == -1) groupByColor.push({groupName: node.colorGroup, colorGroupIds:[]});
                groupByColor[groupByColor.findIndex(x=> x.groupName == node.colorGroup)].colorGroupIds.push(node.propId);


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