<template>
    <div>
       <div style="position:relative;left:1300px;top:400px; width:150px;height:200px;border:1px solid; padding:10px;"><br/><br/><br/>+
       </div>
    </div>
</template>

<script>
import {
    inputMovie
}from '../component';


    export default {
        name:"main",
        component:{
            inputMovie

        },
        data(){
            return{
                movielist:[

                ]
            }
        }
    }
</script>

<style scoped>

</style>