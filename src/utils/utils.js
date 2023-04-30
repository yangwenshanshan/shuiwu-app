import { OSS } from '../config'
import storage from './storage'

export const imgIdToURL = (id) => {
  return `${OSS}/${id}?access_token=${storage.get('token')}&fit=cover&width=200&height=200&quality=80`
}