import { TOKEN_KEY_PREFIX } from '../config'

export default {
  set: (key, value) => {
    uni.setStorageSync(TOKEN_KEY_PREFIX + key, value)
  },
  get: (key) => {
    return uni.getStorageSync(TOKEN_KEY_PREFIX + key)
  }
}