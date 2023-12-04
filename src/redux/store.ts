import { configureStore } from "@reduxjs/toolkit";
import { customreducer } from "./reducer";


const store = configureStore({
    reducer: {
        custom: customreducer
    }

});


export default store;




