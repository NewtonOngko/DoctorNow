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
      login: '/login/admin',
    },
    user: {
      main: '/users',
      adduser :'/users'
    },
    doctor: {
      main: '/doctors',
      addDoctor :'/doctors'
    },
    hospital: {
      main: '/hospitals',
      addDoctor :'/hospitals'
    },
    consultation: {
      main: '/consultations',
      addConsultation :'/consultations'
    },
    appoitment: {
      main: '/appoitments',
      adduser :'/appoitments'
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