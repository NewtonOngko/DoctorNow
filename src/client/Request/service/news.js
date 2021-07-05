import configRest from '../config.rest'
import { request } from '../request'

const {news} = configRest.REST

export function GetNewsAll (body) {
    return request({
      url:  news.main,
      method: 'GET',
      data :body
    })
  }
export function AddNews (body) {
    return request({
      url:  news.addnews,
      method: 'POST',
      body :body
    })
  }
export function UpdateNews (id,body) {
    return request({
      url:  news.updatenews.replace(':id',id),
      method: 'PUT',
      body :body
    })
  }
export function GetNewsByID (id,body) {
    return request({
      url:  news.getbyid.replace(':id',id),
      method: 'GET',
      body :body
    })
  }

