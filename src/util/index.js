import {promises as fsPromises} from 'fs'
import path from 'path'
import {remote} from 'electron'
import {Client as SshClient} from 'ssh2'

const nameSort = (v1, v2) => v1.name.toUpperCase().localeCompare(v2.name.toUpperCase())

function randKey(digit = 36) {
  let result = ''
  while (digit-- > 0) {
    let letter = Math.floor(Math.random() * 36).toString(36)
    Math.random() > 0.5 && (letter = letter.toUpperCase())
    result += letter
  }
  return result
}

function fileSort(fileList) {
  const fileGroup = []
  const dirGroup = []
  fileList.forEach(item => {
    switch (item.type) {
      case 0: {
        fileGroup.push(item)
        break
      }
      case 1:
      case 2: {
        dirGroup.push(item)
        break
      }
    }
  })
  fileGroup.sort(nameSort)
  dirGroup.sort(nameSort)
  fileList.splice(0, fileList.length, ...dirGroup, ...fileGroup)
}

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

export class SFTPUtil {
  constructor(serverConfig) {
    this.conn = new SshClient()
    this.serverConfig = serverConfig
  }

  connect() {
    return new Promise((resolve) => {
      this.conn.on('ready', () => {
        resolve()
      })

      this.conn.connect(this.serverConfig)
    })
  }

  end() {
    return new Promise((resolve, reject) => {
      this.conn.on('end', (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
      this.conn.end()
    })
  }

  getRemoteFiles(targetPath) {
    return new Promise((resolve, reject) => {
      this.conn.sftp((err, sftp) => {
        if (err) throw err
        sftp.readdir(targetPath, (err, list) => {
          if (err) {
            reject(err)
            return
          }
          const dirTree = []
          for (const fileInfo of list) {
            const file = {
              name: fileInfo.filename,
              key: randKey(),
            }
            let type = 0
            // TODO 将来可扩展文件类型
            switch (fileInfo.longname[0]) {
              case 'd':
                type = 1
                break
            }
            Object.assign(file, {type})
            dirTree.push(file)
          }
          fileSort(dirTree)
          resolve(dirTree)
        })
      })
    })
  }

  /**
   * 客户端下载文件
   * @param from 远程地址
   * @param to 本地地址
   */
  download(from, to) {
    to = path.resolve(to)
    return new Promise((resolve, reject) => {
      this.conn.sftp((err, sftp) => {
        if (err) {
          reject(err)
          return
        }
        sftp.fastGet(from, to, '', downloadError => {
          if (downloadError) {
            reject(downloadError)
            return
          }
          resolve()
        })
      })
    })
  }

  /**
   * 客户端下载文件
   * @param from 本地地址
   * @param to 远程地址
   */
  upload(from, to) {
    to = path.resolve(to)
    return new Promise((resolve, reject) => {
      this.conn.sftp((err, sftp) => {
        if (err) {
          reject(err)
          return
        }
        sftp.fastPut(from, to, '', downloadError => {
          if (downloadError) {
            reject(downloadError)
            return
          }
          resolve()
        })
      })
    })
  }

}
