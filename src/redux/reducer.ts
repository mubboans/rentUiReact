import { createReducer } from "@reduxjs/toolkit"

const intialState = {
    a: 0,
    b: "Mubashir"
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
})