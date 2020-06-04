const keys = {
  server_list: 'SERVER_LIST',
}

// 创建随机id
function createId(len = 32) {
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let target = ''
  for (let i = 0; i < len; i++) {
    const index = parseInt(Math.random() * arr.length)
    target += arr[index]
  }
  return target
}

// 创建唯一id
function createOnlyId(list, idKey = 'id') {
  const id = createId()
  const [temp] = list.filter(item => item[idKey] === id)
  if (temp) {
    return createOnlyId(list)
  } else {
    return id
  }
}

// 添加server
export function addServer(server) {
  const list = getServerList()
  const id = createOnlyId(list)
  Object.assign(server, {id})
  list.push(server)
  saveServerList(list)
}

// 编辑server
export function editServer(server) {
  const list = getServerList()
  for (const item of list) {
    if (server.id === item.id) {
      Object.assign(item, server)
      break
    }
  }
  saveServerList(list)
}

// 删除server
export function removeServer(id) {
  const list = getServerList()
  const index = list.map(item => item.id).indexOf(id)
  if (index >= 0) {
    list.splice(index, 1)
  }
  saveServerList(list)
}

// 获取server列表
export function getServerList() {
  const str = localStorage.getItem(keys.server_list) || 'null'
  return JSON.parse(str) || []
}

// 保存server列表
export function saveServerList(list) {
  localStorage.setItem(keys.server_list, JSON.stringify(list) || '[]')
}
