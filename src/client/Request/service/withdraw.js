import configRest from '../config.rest'
import { request } from '../request'

const {withdraw} = configRest.REST

export function GetWithdrawAll (body) {
    return request({
      url:  withdraw.main,
      method: 'GET',
      data :body
    })
  }
export function UpdateWithdraw (id,body) {
    return request({
      url:  withdraw.updatewithdraw.replace(':id',id),
      method: 'PUT',
      body :body
    })
  }
export function GetWithdrawByID (id,body) {
    return request({
      url:  withdraw.updatewithdraw.replace(':id',id),
      method: 'GET',
      body :body
    })
  }

