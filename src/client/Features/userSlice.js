import { Exposure } from '@material-ui/icons';
import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        id:null,
    },
    reducers:{
        login:(state,action)=>{
            state.user = action.payload
        },
        user:(state,action)=>{
            state.id = action.payload
        },
        logout:(state)=>{
            state.user = null
        }

    }
})

export const {login,logout,user} = userSlice.actions;

export const  selectUser =(state) => state.userReducer.user;

export const  selectUserid =(state) => state.userReducer.id;

export default userSlice.reducer;