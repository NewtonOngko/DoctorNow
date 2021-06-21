import config from './config.rest'
// import storages from './storages'
import axios from 'axios'

const { API_URL, API_KEY, API_BERIER } = config

const getQueryByName = (name, url) => {
  let match = RegExp('[?&]' + name + '=([^&]*)').exec(url)

  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

export async function request (pack) {
  let {
    url,
    method = 'GET',
    data = {},
    body = {}
  } = pack

  if (method === 'GET') {
    if (Object.getOwnPropertyNames(data).length > 0) {
      url += getQueryByName('mode', url) ? '&' : '?'
      for (let i in data) {
        url += `${i}=${data[i]}&`
      }
      if (url[url.length - 1] === '&') {
        url = url.substring(0, url.length - 1)
      }
    }
  }
//   const Token = await storages.getItem('token')
//   console.log('testTOken', Token);
  return await axios.request({
        url: `${API_URL}${url}`,
        headers: {
          //'Content-Type': 'application/json;charset=UTF-8',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
         // 'Authorization': `${API_BERIER} ${Token}`
        },
        method,
        data: JSON.stringify(body)
      }).then(
        response => response.data)
        .catch(error => {
          const er = ((error || {}).response || {}).data
          return er || { message: 'No Connection' }
        })
}
