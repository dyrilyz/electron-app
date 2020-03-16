import {promises as fsPromises} from 'fs'
import path from 'path'
// import os from 'os'
import {remote} from 'electron'

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

export async function getLocalDirList(targetPath) {
  const dirTree = []
  const rootDirs = await fsPromises.readdir(targetPath)
  for (const name of rootDirs) {
    let stat
    try {
      stat = await fsPromises.stat(path.resolve(targetPath, `./${name}`))
    } catch {
      console.log('error')
      continue
    }
    dirTree.push({
      name,
      key: +new Date() + (Math.random() * 10000).toFixed(0),
      // 0: 文件， 1: 文件夹
      type: +stat.isDirectory()
    })
  }
  return dirTree
}
