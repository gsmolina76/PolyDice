<template>
    <div class='PropertyCard'>
        <div class='CardBody'>
            <div v-if="(propClass=='Property')">
                <div class='PropertyTitle' :class='PropertyData.propertyType'>
                    <h3>Title Deed</h3>
                    <h2>{{PropertyData.propertyName}}</h2>
                </div>
                <div class='PropertyBody' :class='propClass'>
                    <h3>RENT: ${{PropertyData.baseRent}}</h3>
                    <h3>With 1 House: ${{PropertyData.oneHouseRent}}</h3>
                    <h3>With 2 House:  {{PropertyData.twoHouseRent}}</h3>
                    <h3>With 3 House:  {{PropertyData.threeHouseRent}}</h3>
                    <h3>With 4 House:  {{PropertyData.fourHouseRent}}</h3>

                    <h3>With HOTEL: ${{PropertyData.hotelRent}}</h3>
                    <h3>Mortgage Value: ${{PropertyData.mortgageValue}}</h3>
                    <h3>Houses cost ${{PropertyData.houseCost}} each</h3>
                    <h3>Hotels, ${{PropertyData.houseCost}} Plus 4 Houses</h3>
                    <p>If the player owns ALL of any Color-group, the rent is DOUBLED on Unimproved lots in that Group</p>
                </div>
            </div>
            <div v-if="(propClass=='Utility')">
                <div class='PropertyTitle' :class='PropertyData.propertyType'>
                    <img :src="cardImage">
                    <h2>{{PropertyData.propertyName}}</h2>
                </div>
                <div class='PropertyBody' :class='propClass'>
                    <p>If one "Utility" is Owned, rent is 4 times amount shown on the dice</p>
                    <p>If both "Utilities" are Owned, rent is 10 times amount shown on the dice</p>
                    <h3>Mortgage Value: ${{PropertyData.mortgageValue}}</h3>
                </div>
            </div>
            <div v-if="(propClass=='Railroad')">
                <div class='PropertyTitle' :class='PropertyData.propertyType'>
                    <img :src="cardImage">
                    <h2>{{PropertyData.propertyName}}</h2>
                </div>
                <div class='PropertyBody' :class='propClass'>
                    <ul>
                    <li><span>RENT:</span> <span>${{PropertyData.baseRent}}</span></li>
                    <li><span>if 2 railroads are owned:</span> <span>$50</span></li>
                    <li><span>if 3 railroads are owned:</span> <span>$100</span></li>
                    <li><span>if 4 railroads are owned:</span> <span>$200</span></li>
                    </ul>
                    <h3>Mortgage Value: ${{PropertyData.mortgageValue}}</h3>
                </div>
            </div>
        </div>
        <div class='PropertyActions mt-3 row' v-if="(PropertyData.owner == 0)">
            <div class='col-2'></div><button class='col-3 btn btn-success' @click="$emit('purchase-property')">Buy</button><div class='col-2'></div><button class='col-3 btn btn-primary'>Auction</button><div class='col-2'></div>
        </div>
        <div class='PropertyActions mt-3 row' v-if="(PropertyData.owner == CurrentPlayerId)">
            <h3> You own this property </h3>
            <div class='col-4'></div><button class='col-4 btn btn-success' @click="$bvModal.hide('modal-property')">Great!</button><div class='col-4'></div>
        </div>
        <div class='PropertyActions mt-3 row' v-if="(PropertyData.owner != CurrentPlayerId) && (PropertyData.owner > 0)">
            <!--<h3> Pay {{chargedRent}} to the owner - ({{propertyOwner}})</h3>-->
            <div class='col-3'></div><button class='col-6 btn btn-success' @click="$emit('pay-owner', chargedRent, propertyOwner)">Pay ${{chargedRent}} to the owner - ({{propertyOwner}})</button><div class='col-4'></div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'PropertyCard',
        props:['spaceId','propClass'],
        data(){
            return{
                PropertyData : this.$store.getters['BoardData/Properties'][this.$store.getters['BoardData/Properties'].findIndex(x => x.boardId == this.$props.spaceId)],
                CurrentPlayerId: this.$store.getters['Players/currentPlayer'].playerId            }
        },
        computed:{
            cardImage(){
                return require('../assets/images/'+`${this.PropertyData.propertyImage.toLowerCase()}`+'.png'); 
            },
            propertyOwner(){
                return this.$store.getters['Players/players'][this.$store.getters['Players/players'].findIndex(x => x.playerId == this.PropertyData.owner)].token
            },
            chargedRent(){
                if(this.$props.propClass == 'Property'){
                    switch(this.PropertyData.houses){
                        case 0: return this.PropertyData.monopoly ? this.PropertyData.baseRent : this.PropertyData.baseRent * 2;
                        case 1: return this.PropertyData.oneHouseRent;
                        case 2: return this.PropertyData.twoHouseRent;
                        case 3: return this.PropertyData.threeHouseRent;
                        case 4: return this.PropertyData.fourHouseRent;
                        case 5: return this.PropertyData.hotelRent;
                        default: return 0;
                    }
                }else if(this.$props.propClass == 'Utility'){
                    if(this.propertyOwner.utilOwned == 2){
                        return this.$store.getters['BoardData/CurrentRoll'] * 10
                    }else{
                        return this.$store.getters['BoardData/CurrentRoll'] * 4
                    }
                    
                }else if(this.$props.propClass == 'Railroad'){
                    switch(this.propertyOwner.railOwned){
                        case 2: return 50;
                        case 3: return 100;
                        case 4: return 200;
                        default: return 25;
                    }
                }else{
                    return 0
                }
            }
        }
    }
</script>

<style lang="scss">
    .PropertyCard .CardBody{
        width: 465px;
        min-height: 500px;
        margin: 0 auto;
        border: 2px solid black;
    }
    .PropertyTitle{
        border: 2px solid black;
        margin: 12px;
    }
    .PropertyTitle img{height:150px;}
    .PropertyTitle.Railroad, .PropertyTitle.Utility{border:none}
    .PropertyTitle.Railroad h2{
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
    .BlueViolet-Group{background-color:blueviolet;}
    .BlueViolet-Group h3, .BlueViolet-Group h2{color:#000;}
    .LtBlue-Group{background-color:lightblue;}
    .LtBlue-Group h3, .LtBlue-Group h2{color:#000;}
    .Magenta-Group{background-color:magenta;}
    .Magenta-Group h3, .Magenta-Group h2{color:#000;}
    .Gold-Group{background-color:gold;}
    .Gold-Group h3, .Gold-Group h2{color:#000;}
    .Red-Group{background-color:red;}
    .Red-Group h3, .Red-Group h2{color:#000;}
    .Yellow-Group{background-color:yellow;}
    .Yellow-Group h3, .Yellow-Group h2{color:#000;}
    .Green-Group{background-color:green;}
    .Green-Group h3, .Green-Group h2{color:#000;}
    .Blue-Group{background-color:darkblue;}
    .Blue-Group h3, .Blue-Group h2{color:#fff;}
    .PropertyBody ul{
        display: inline-flex;
        flex-direction: column;
        text-align-last: justify;
        //width: 270px;
        //margin-left: auto;
        //margin-right: auto;
        list-style: none; 
        padding: 0;
    }
    .PropertyBody.Property{
        width: 360px;
        margin-left: auto;
        margin-right: auto;
    }
    .PropertyBody.Railroad,
    .PropertyBody.Utility{
        width: 275px;
        margin-left: auto;
        margin-right: auto;
    }
    .PropertyBody li{text-align: left;}

</style>
