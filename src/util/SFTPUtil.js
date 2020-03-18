import {Client as SshClient} from "ssh2"
import path from "path"
import {randKey, fileSort} from "@/util/_base_fun"

export default class SFTPUtil {
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
   * 客户端上传文件
   * @param from 本地地址
   * @param to 远程地址
   */
  upload(from, to) {
    from = path.resolve(from)
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