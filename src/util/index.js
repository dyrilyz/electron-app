import {promises as fsPromises} from 'fs'
import path from 'path'
import {remote} from 'electron'
import {randKey, fileSort, getDiskDeviceid, isWin} from "@/util/_base_fun"

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
  if (isWin) {
    if (!targetPath) {
      const deviceid = await getDiskDeviceid()
      return deviceid.map(name => {
        return {
          name,
          key: randKey(),
          type: 1
        }
      })
    }
  }
  const dirTree = []
  const rootDirs = await fsPromises.readdir(targetPath)
  for (const name of rootDirs) {
    let stat
    const key = randKey()
    try {
      stat = await fsPromises.stat(path.resolve(targetPath, `./${name}`))
      dirTree.push({
        name,
        key,
        // 0: 文件， 1: 文件夹
        type: +stat.isDirectory()
      })
    } catch {
      // console.log('error', name)
      continue
    }
  }
  fileSort(dirTree)
  return dirTree

}

