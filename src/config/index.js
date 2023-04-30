const env = 'dev'
const OSS = {
  dev: 'https://nanshahe.app.test.canglandata.com/assets',
  prod: 'https://nanshahe.app.canglandata.com/assets'
}[env]
const HOST = {
  dev: '/api', // 本地
  // dev: 'https://nanshahe.app.test.canglandata.com', // 测试
  prod: 'https://nanshahe.app.canglandata.com', // 生产
}[env]
const TOKEN_KEY_PREFIX = 'sw_'

export {
  HOST,
  TOKEN_KEY_PREFIX,
  OSS
}