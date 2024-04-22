<template>
    <div class='PropertyColorGroup row'>
        <PlayerProperty v-for='(colorGroupIds, index) in data.colorGroupIds' 
            :key='index'
            :id='colorGroupIds' 
            :colorGroup='data.groupName'/>
    </div>
</template>

<script>
import PlayerProperty from './PlayerProperty.vue';
export default{
    name:'PropertyColorGroup',
    props:['data'],
    components:{
        PlayerProperty
    }
}
</script>