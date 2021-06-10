const port01 = 5000
const port02 = 4000
//const version = '/api/v1'
const host = 'localhost:5000'
//const host = 'http://192.168.8.109'//'http://devi.darkotech.id'//'http://localhost'//'http://devi.darkotech.id'//'http://localhost'//'http://192.168.8.102'//'http://192.168.8.180'// 'http://192.168.57.1' // local host on device

export default {
  API_BERIER: 'Bearer',
  API_KEY: 'kernel001',
  API_PORT: port01,
  API_VESION: version,
  API_HOST: host,
  //API_URL: `${host}${version}`,
  API_URL: `${host}:${port01}`,
  REST: {
    authApi: {
      main: '/auth/login',
      type: '/auth/:type'
    },
    user: {
      main: '/users',
    }
  }
}
