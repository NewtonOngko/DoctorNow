import configRest from '../config.rest'
import { request } from '../request'

const { topUp } = configRest.REST

export function GetTopUpAll(body) {
  return request({
    url: topUp.main,
    method: 'GET',
    data: body,
  })
}
