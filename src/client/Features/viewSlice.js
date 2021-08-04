import { Exposure } from '@material-ui/icons'
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'view',
  initialState: {
    appointmentId: null,
    consultationId: null,
    doctorId: null,
    hospitalId: null,
    transactionId: null,
    newsId: null,
    topUpId: null,
    withdrawId: null,
    transactionuserId: null,
  },
  reducers: {
    appointment: (state, action) => {
      state.appointmentId = action.payload
    },
    consultation: (state, action) => {
      state.consultationId = action.payload
    },
    doctor: (state, action) => {
      state.doctorId = action.payload
    },
    hospital: (state, action) => {
      state.hospitalId = action.payload
    },
    transaction: (state, action) => {
      state.transactionId = action.payload
    },
    transactionUser: (state, action) => {
      state.transactionuserId = action.payload
    },
    news: (state, action) => {
      state.newsId = action.payload
    },
    topUp: (state, action) => {
      state.topUpId = action.payload
    },
    withdraw: (state, action) => {
        state.withdrawId = action.payload
      },
  },

})

export const {
  appointment,
  consultation,
  doctor,
  hospital,
  transaction,
  news,
  topUp,
  withdraw,
  transactionUser
} = userSlice.actions

export const selectAppointmentId = (state) => state.viewidReducer.appointmentId
export const selectConsultationId = (state) =>
  state.viewidReducer.consultationId
export const selectDoctorId = (state) => state.viewidReducer.doctorId
export const selectHospitalId = (state) => state.viewidReducer.hospitalId
export const selectTransactionId = (state) => state.viewidReducer.transactionId
export const selectTransactionUserId = (state) => state.viewidReducer.transactionuserId
export const selectNewsId = (state) => state.viewidReducer.newsId
export const selectTopUpId = (state) => state.viewidReducer.topUpId
export const selectWithdrawId = (state) => state.viewidReducer.withdrawId

export default userSlice.reducer
