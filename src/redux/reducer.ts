import { createReducer } from "@reduxjs/toolkit"
import { isUserLogined } from "../helper/localhelper"
const intialState = {
    a: 0,
    b: "Mubashir",
    toastConf: {
        showtoast: false,
        message: "",
        type: ''
    },
    isUserLogin: isUserLogined(),
    session: false,
    tokenstatus: isUserLogined() ? 'invalid' : 'valid',
}

export const customreducer = createReducer(intialState, {
    increment: (state, action) => {
        state.a = state.a + action.payload
    },
    addSurname: (state, action) => {
        state.b = state.b + action.payload
    },
    decrement: (state, action) => {
        state.a = state.a - action.payload
    },
    showToast: (state, action) => {
        state.toastConf = action.payload;
    },
    hideToast: (state, action) => {
        state.toastConf = action.payload;
    },
    userState: (state, action) => {
        state.isUserLogin = action.payload;
    },
    userSession: (state, action) => {
        state.session = action.payload;
    },
    userTokenStatus: (state, action) => {
        state.tokenstatus = action.payload;
    }
})