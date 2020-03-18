import child_process from "child_process"

export function randKey(digit = 36) {
  let result = ''
  while (digit-- > 0) {
    let letter = Math.floor(Math.random() * 36).toString(36)
    Math.random() > 0.5 && (letter = letter.toUpperCase())
    result += letter
  }
  return result
}


export function nameSort(v1, v2) {
  return v1.name.toUpperCase().localeCompare(v2.name.toUpperCase())
}

export function fileSort(fileList) {
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

export function getDiskDeviceid() {
  return new Promise((resolve, reject) => {
    child_process.exec('wmic logicaldisk get deviceid', (err, stdout, stderr) => {
      if (err) {
        reject(err)
        return
      }
      if (stderr) {
        reject(stderr)
        return
      }
      resolve(stdout.split(/\s+/g).filter(str => str.length === 2))
    })
  })
}

export const isWin = process.platform === 'win32'