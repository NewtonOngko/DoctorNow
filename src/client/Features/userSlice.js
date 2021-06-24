import { Exposure } from '@material-ui/icons';
import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        login:(state,action)=>{
            state.user = action.payload
        },
        logout:(state)=>{
            state.user = null
        }

    }
})

export const {login,logout} = userSlice.actions;

export const  selectUser =(state) => state.userReducer.user;

export default userSlice.reducer;