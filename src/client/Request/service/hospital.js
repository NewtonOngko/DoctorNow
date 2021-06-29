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
export function AddHospital (body) {
    return request({
      url:  hospital.addHospital,
      method: 'POST',
      body :body
    })
  }
export function UpdateHospital (id,body) {
    return request({
      url:  hospital.updateHospital.replace(':id',id),
      method: 'PUT',
      body :body
    })
  }
export function GetHospitalByID (id,body) {
    return request({
      url:  hospital.gethospitalbyid.replace(':id',id),
      method: 'GET',
      body :body
    })
  }

