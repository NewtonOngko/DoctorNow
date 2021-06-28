import configRest from '../config.rest'
import { request } from '../request'

const {auth} = configRest.REST

export function UserLogin (body) {
    return request({
      url:  auth.login,
      method: 'POST',
      body :body
    })
  }
  