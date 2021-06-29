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
export function AddDoctor (body) {
    return request({
      url:  doctor.addDoctor,
      method: 'POST',
      body :body
    })
  }
export function UpdateDoctor (id,body) {
    return request({
      url:  doctor.updatedoctor.replace(':id',id),
      method: 'PUT',
      body :body
    })
  }
export function GetDoctorByID (id,body) {
    return request({
      url:  doctor.getdoctorbyid.replace(':id',id),
      method: 'GET',
      body :body
    })
  }

