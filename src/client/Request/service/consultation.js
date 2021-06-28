import configRest from '../config.rest'
import { request } from '../request'

const {consultation} = configRest.REST

export function GetConsultationAll (body) {
    return request({
      url:  consultation.main,
      method: 'GET',
      data :body
    })
  }
// export function AddUser (body) {
//     return request({
//       url:  user.adduser,
//       method: 'POST',
//       body :body
//     })
//   }
// export function UpdateUser (id,body) {
//     return request({
//       url:  user.updateuser.replace(':id',id),
//       method: 'PUT',
//       body :body
//     })
//   }
// export function GetUserByID (id,body) {
//     return request({
//       url:  user.getbyid.replace(':id',id),
//       method: 'GET',
//       body :body
//     })
//   }

