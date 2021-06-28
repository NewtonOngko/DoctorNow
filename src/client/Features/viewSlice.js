import { Exposure } from '@material-ui/icons';
import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:"view",
    initialState:{
        appointmentId:null,
        consultationId:null,
        doctorId:null,
        hospitalId:null,
        transactionId:null
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
    }
})

export const {appointment,consultation,doctor,hospital,transaction} = userSlice.actions;

export const  selectAppointmentId =(state) => state.viewidReducer.appointmentId;
export const  selectConsultationId =(state) => state.viewidReducer.consultationId;
export const  selectDoctorId =(state) => state.viewidReducer.doctorId;
export const  selectHospitalId =(state) => state.viewidReducer.hospitalId;
export const  selectTransactionId =(state) => state.viewidReducer.transactionId;

export default userSlice.reducer;