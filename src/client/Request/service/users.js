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
export function AddUser (body) {
    return request({
      url:  user.adduser,
      method: 'POST',
      data :body
    })
  }