import { http } from '../utils/http'

export const api = {
  // login: (params) => http.post(`/user/loginOrRegisterByWxMiniApp`, params, false),
  // getQuotaRemaining: (params) => http.get(`/quota/remaining`, params),
  // postScenesChat: (params) => http.post(`/scenes/chat`, params),
  // postScenesTranslate: (params) => http.post(`/scenes/translate`, params),
  // postLeaveMessage: (params) => http.post(`/messages`, params),
  // postQuotaAddUsage: (params) => http.post(`/quota/addUsage`, params),
  // getUserInfo: (params) => http.post(`/wx/info`, params),
  // updatePhoneByWxMiniApp: (params) => http.post(`/user/updatePhoneByWxMiniApp`, params),
  // postPayWechat: (params) => http.post(`/pay/wechat`, params),
  // getSubscriptions: (params) => http.get(`/subscriptions`, params),
  // getSencesCosts: (params) => http.get(`/scenes/costs`, params),
  // getSencesExamplesSearch: (params) => http.get(`/scenes/examples/search`, params),
  getWaterWellList: (params) => http.get('/items/water_well', params),
  refreshToken: (params) => http.post('/auth/refresh', params, false)
}
