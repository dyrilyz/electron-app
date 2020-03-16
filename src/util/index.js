import {remote} from 'electron'
import moment from 'moment'

export function urlResolver(that, route) {
  const baseUrl = location.href.replace(location.hash, '')
  const url = that.$router.resolve(route)
  return `${baseUrl}${url.href}`
}

export function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function hasModal() {
  let flag = false
  const children = remote.getCurrentWindow().getChildWindows()
  for (const win of children) {
    if (win.isModal()) {
      flag = true
      break
    }
  }
  return flag
}

export function hasNotModal() {
  return !hasModal()
}

export function random(range) {
  return Math.round(Math.random() * range)
}

export function dateTime(val) {
  return moment(val).format('YYYY-MM-DD HH:mm:ss')
}

export function date(val) {
  return moment(val).format('YYYY-MM-DD')
}

export function time(val) {
  return moment(val).format('HH:mm:ss')
}