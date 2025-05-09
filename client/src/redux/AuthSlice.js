import { createSlice } from "@reduxjs/toolkit";


const intialState={
    loading:null,
    error:null,
    user:null
}


const AuthSlice = createSlice({
    name:"authslice",
    initialState:intialState,
    reducers:{
        SetUser:(state,action)=>{
            state.user=action.payload
        },
        logoutUser:(state)=>{
            state.user=null;
            state.loading=false;
            state.error=null
        }
    }
})

export const {SetUser, logoutUser} = AuthSlice.actions

export default AuthSlice.reducer;