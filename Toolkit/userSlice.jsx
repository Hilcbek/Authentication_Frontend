import { createSlice } from '@reduxjs/toolkit'
export let userSlice = createSlice({
    name : 'user',
    initialState : {
        username : null,
        profile : null,
        id : null,
        email : null
    },
    reducers : {
        LOGIN : (state,action) => {
            state.username = action.payload.username
            state.profile = action.payload.profile
            state.id = action.payload.id
            state.email = action.payload.email
        },
        LOGOUT : (state,action) => {
            state.username = null
            state.profile = null
            state.id = null
            state.email = null
        },
        UPDATE : (state,action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.profile = action.payload.profile
        },
        DELETE : (state,action) => {
            state.email = null
            state.profile = null
            state.id = null
            state.username = null
            localStorage.clear()
        },
    }
})
export let { LOGIN, LOGOUT, UPDATE, DELETE } = userSlice.actions;
export default userSlice.reducer;