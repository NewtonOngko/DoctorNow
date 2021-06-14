import configRest from '../config.rest'
import { request } from '../request'

const {user} = configRest.REST

export function GetUserAll (body) {
    return request({
      url:  user.main,
      method: 'GET',
      data :body
    })
  }
  