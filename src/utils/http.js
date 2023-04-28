import { HOST } from '../config'
import storage from '../utils/storage'

const payload = (url, params, access) => {
  let host = ''
  if (!url.startsWith('http')) {
    host = HOST
  }
  let payload = {
    url: host + url,
    data: params,
    dataType: 'json',
    header: {}
  }
  if (access) {
    const token = storage.get('token')
    if (token) {
      payload.header['Authorization'] = 'Bearer ' + token
    }
  }
  return payload
}

const httpMethodsType = [{
  type: 'get',
  method: 'GET'
}, {
  type: 'post',
  method: 'POST'
}, {
  type: 'put',
  method: 'PUT'
}, {
  type: 'patch',
  method: 'PATCH'
}, {
  type: 'delete',
  method: 'DELETE'
}]

const httpMethod = {}
httpMethodsType.forEach((res) => {
  httpMethod[res.type] = (url, params = {}, access = true) => {
    return uni.request({method: res.method, ...payload(url, params, access), complete: ()=> {}})
  }
})

// /**
//  * 文件上传
//  *
//  * @param {any} url
//  * @param {any} [params={}]
//  * @returns
//  */
// const wxUpload = (url, params = {}) => {
//   let host = ''
//   if (url.startsWith('http')) {
//     host = url
//   } else {
//     host = HOST + url
//   }
//   let payload = {
//     url: host,
//     name: params.name,
//     filePath: params.filePath,
//     formData: params.formData,
//     header: {
//       'X-Access-Token': wx.getStorageSync('token'),
//       'X-File-Name': params.name
//     },
//     success: (res) => {
//       params.success(JSON.parse(res.data))
//     }
//   }
//   return wx.uploadFile(payload)
// }

export const http = httpMethod
// module.exports = {
//   // wxUpload
// }
