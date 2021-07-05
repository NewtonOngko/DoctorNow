import configRest from '../config.rest'
import { request } from '../request'

const {transactions} = configRest.REST

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

