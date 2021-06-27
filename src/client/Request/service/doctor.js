import configRest from '../config.rest'
import { request } from '../request'

const {doctor} = configRest.REST

export function GetDoctorAll (body) {
    return request({
      url:  doctor.main,
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

