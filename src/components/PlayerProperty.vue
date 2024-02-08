<template>
    <div class='Property'>
        <button class='PropertyBlock' :class='PropertyData.propertyType' @click="$bvModal.show(`property-stats-card-${id}`)">

        </button> 
        <b-modal :id="`property-stats-card-${id}`">
            <div class='PropertyStats'>
                <div class='PropertyTitle' :class='PropertyData.propertyType'>
                    <h3>Title Deed</h3>
                    <h2>{{PropertyData.propertyName}}</h2>
                </div>
                <p>{{PropertyData}}</p>
            </div>
        </b-modal>
    </div>
</template>

<script>

export default{
    name:'PlayerProperty',
    props:['id'],
    data(){
        return{
            PropertyData: this.$store.getters['BoardData/Properties'][this.$store.getters['BoardData/Properties'].findIndex(x=>x.boardId ==this.$props.id)]
        }
    }

}
</script>

<style>
    .PropertyBlock{
        height:20px;
        width:20px;
    }
</style>
