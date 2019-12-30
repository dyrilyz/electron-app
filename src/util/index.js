export function urlResolver(that, route) {
  const baseUrl = location.href.replace(location.hash, '')
  const url = that.$router.resolve(route)
  return `${baseUrl}${url.href}`
}

export function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}