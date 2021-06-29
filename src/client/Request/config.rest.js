const port01 = 5000
const port02 = 4000
//const version = '/api/v1'
const host = 'http://localhost'

export default {
  API_BERIER: 'Bearer',
  API_KEY: 'kernel001',
  API_PORT: port01,
  //API_VESION: version,
  API_HOST: host,
  //API_URL: `${host}${version}`,
  API_URL: `${host}:${port01}`,
  REST: {
    auth: {
      login: '/admin/login',
    },
    user: {
      main: '/users',
      adduser :'/users',
      updateuser:'/users/:id',
      getbyid:'/users/:id'
    },
    doctor: {
      main: '/doctors',
      addDoctor :'/doctors',
      updatedoctor:'/doctors/:id',
      getdoctorbyid:'/doctors/:id'
    },
    hospital: {
      main: '/hospitals',
      addHospital :'/hospitals',
      updateHospital:'/hospitals/:id',
      gethospitalbyid:'/hospitals/:id'
    },
    consultation: {
      main: '/consultations',
      addConsultation :'/consultations'
    },
    appointment: {
      main: '/appointments',
      adduser :'/appointments'
    },
    transactions: {
      main: '/transactions',
      adduser :'/transactions'
    },
    news: {
      main: '/news',
      adduser :'/news'
    }
  }
}