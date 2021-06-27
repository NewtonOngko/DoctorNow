import configRest from '../config.rest'
import { request } from '../request'

const {hospital} = configRest.REST

export function GetHospitalAll (body) {
    return request({
      url:  hospital.main,
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

