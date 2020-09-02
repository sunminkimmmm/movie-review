<template>
    <div>
        <template v-for="item in movielist">
            <movieItem v-bind:key="item.mCode" v-bind:movielist="item">
        </template> 


    </div>
</template>


<script>


export default {
    name:"movieList",
    props:["movielist"],
    methods: {
        
    },


}



</script>