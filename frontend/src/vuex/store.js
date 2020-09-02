
    import Vue from 'vue';
    import Vuex from 'vuex';
    import axios from 'axios';
    
    Vue.use(Vuex);
    
    
    const store = new Vuex.Store({
        state:{
            customer:{
                mail: "",
                username:""
            },
            movielist:[

            ],
        }
    
    });
    
    export default store;
