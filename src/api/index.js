import { http } from '../utils/http'

export const api = {
  postLogin: (params) => http.post('/mobile/login', params, false),
  sendMobileCode: (params) => http.post('/mobile/send', params, false),
  refreshToken: (params) => http.post('/auth/refresh', params, false),
  getUserInfo: (params) => http.get('/users/me', params),
  getWaterWellList: (params) => http.get('/items/water_well', params),
}
