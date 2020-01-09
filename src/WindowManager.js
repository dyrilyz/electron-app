import {BrowserWindow, ipcMain} from 'electron'
import {login} from "@/inner-browser"

const isDevelopment = process.env.NODE_ENV !== 'production'
const isMacOS = process.platform === 'darwin'

function createWindow(opt, isDidFinishLoadShow = true) {
  const conf = {
    width: 1020,
    height: 700,
    minWidth: 1020,
    minHeight: 700,
    frame: true,
    // transparent: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
  }

  process.platform === 'darwin' && Object.assign(conf, {titleBarStyle: 'hiddenInset'})
  opt && Object.assign(conf, opt)
  console.log(conf)
  let win = new BrowserWindow(conf)

  if (isDidFinishLoadShow) {
    win.webContents.on('did-finish-load', () => win.show())
  } else {
    win.show()
  }

  win.on('closed', () => win = null)

  let resizeTimeId = null
  win.on('resize', () => {
    if (resizeTimeId) {
      clearTimeout(resizeTimeId)
    }
    // 事件防抖
    resizeTimeId = setTimeout(() => {
      resizeTimeId = null
      const isMaximized = win.isMaximized()
      win.webContents.send('win-maximize', isMaximized)
    }, 100)
  })

  // 如果是macOS，因为这里存在一个bug：
  // 当开发者工具默认打开时，-webkit-app-region: drag可能会失效。
  // issues：https://github.com/electron/electron/issues/3647
  if (isDevelopment && isMacOS) win.webContents.openDevTools()

  return win
}

// 事件中转
ipcMain.on('notify', (e, {eName, data}) => {
  const arr = BrowserWindow.getAllWindows().filter(win => win.webContents !== e.sender)
  arr.forEach(win => {
    win.webContents.send(eName, data)
  })
})

// 打开新窗口
ipcMain.on('open-window', (e, data) => {
  const {url, opt, parentId} = data
  if (parentId) {
    const parent = BrowserWindow.fromId(parentId)
    Object.assign(opt, {parent})
  }
  const win = createWindow(opt)
  win.loadURL(url)
})

ipcMain.on('pms-login', (e, data) => {
  login()
  console.log(data)
})

export default {createWindow}
