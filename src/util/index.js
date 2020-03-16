import {promises as fsPromises} from 'fs'
import path from 'path'
import {remote} from 'electron'
import {Client as SshClient} from 'ssh2'

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
      key: getRandHex(18),
      // 0: 文件， 1: 文件夹
      type: +stat.isDirectory()
    })
  }
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

      console.log(this.serverConfig)
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
              key: getRandHex(18),
            }
            let type = 0
            switch (fileInfo.longname[0]) {
              case 'd':
                type = 1
                break
            }
            Object.assign(file, {type})
            dirTree.push(file)
          }
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

  upload() {
  }

}

function getRandHex(digit) {
  return (Math.random() * Math.pow(10, digit) * 16).toString(16)
}
