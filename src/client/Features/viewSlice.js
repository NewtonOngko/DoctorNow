import { Exposure } from '@material-ui/icons';
import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:"view",
    initialState:{
        appointmentId:null,
        consultationId:null,
        doctorId:null,
        hospitalId:null,
        transactionId:null,
        newsId:null,
        topupId:null,
    },
    reducers:{
        appointment:(state,action)=>{
            state.appointmentId = action.payload
        },
        consultation:(state,action)=>{
            state.consultationId = action.payload
        },
        doctor:(state,action)=>{
            state.doctorId = action.payload
        },
        hospital:(state,action)=>{
            state.hospitalId = action.payload
        },
        transaction:(state,action)=>{
            state.transactionId = action.payload
        },
        news:(state,action)=>{
            state.newsId = action.payload
        },
        topUp:(state,action)=>{
            state.topupId = action.payload
        },
    }
})

export const {appointment,consultation,doctor,hospital,transaction,news,topUp} = userSlice.actions;

export const  selectAppointmentId =(state) => state.viewidReducer.appointmentId;
export const  selectConsultationId =(state) => state.viewidReducer.consultationId;
export const  selectDoctorId =(state) => state.viewidReducer.doctorId;
export const  selectHospitalId =(state) => state.viewidReducer.hospitalId;
export const  selectTransactionId =(state) => state.viewidReducer.transactionId;
export const  selectNewsId =(state) => state.viewidReducer.newsId;
export const  selectTopUpId =(state) => state.viewidReducer.topupId;

export default userSlice.reducer;