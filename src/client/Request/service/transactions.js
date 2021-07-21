import configRest from '../config.rest'
import { request } from '../request'

const {transactions,topup} = configRest.REST

export function GetTransactionsAll (body) {
    return request({
      url:  transactions.main,
      method: 'GET',
      data :body
    })
  }
export function UpdateTransactions (id,body) {
    return request({
      url:  transactions.updatetrans.replace(':id',id),
      method: 'PUT',
      body :body
    })
  }
export function GetTransByID (id,body) {
    return request({
      url:  transactions.updatetrans.replace(':id',id),
      method: 'GET',
      body :body
    })
  }
export function GetTopup (body) {
    return request({
      url:  topup.topup,
      method: 'GET',
      body :body
    })
  }
  export function GetWithdraw (body) {
    return request({
      url:  topup.withdraw,
      method: 'GET',
      body :body
    })
  }
  export function UpdateWithdraw (id,body) {
    return request({
      url:  topup.updateWithdraw.replace(':id',id),
      method: 'PUT',
      body :body
    })
  }
  export function GetWithdrawByID (id,body) {
    return request({
      url:  topup.updateWithdraw.replace(':id',id),
      method: 'GET',
      body :body
    })
  }