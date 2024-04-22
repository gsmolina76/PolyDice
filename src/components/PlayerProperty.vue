<template>
    <div class='Property col-3 align-left'>
        <button class='PropertyBlock' :class='colorGroup' @click="$bvModal.show(`property-stats-card-${id}`)">

        </button> 
        <b-modal :id="`property-stats-card-${id}`">
            <div class='PropertyStats'>
                <div class='PropertyTitle' :class='colorGroup'>
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
    props:['id', 'colorGroup'],
    data(){
        return{
            PropertyIndex: this.$store.getters['BoardData/Properties'].findIndex(x=>x.boardId ==this.$props.id),
            PropertyData: this.$store.getters['BoardData/Properties'][this.$store.getters['BoardData/Properties'].findIndex(x=>x.boardId ==this.$props.id)]
            //PropertyData: this.$store.getters['BoardData/Properties'][this.$store.getters['BoardData/Properties'].findIndex(x=>x.boardId ==this.$props.id)]
        }
    }

}
</script>

<style>
    .PropertyBlock{
        height:20px;
        width:20px;
    }
    .PropertyColorGroup{
        justify-content: start;
    }
    .PropertyColorGroup .Property{
        flex-basis: min-content;
    }
</style>
