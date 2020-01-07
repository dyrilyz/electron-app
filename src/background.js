'use strict'

import {app, protocol, Menu} from 'electron'
import {createProtocol, installVueDevtools} from 'vue-cli-plugin-electron-builder/lib'
import WindowManager from './WindowManager'

const scheme = 'app'
const isMacOS = process.platform === 'darwin'
const isWindows = process.platform === 'win32'
const isDevelopment = process.env.NODE_ENV !== 'production'

// 定义全局窗口对象，防止js垃圾回收时导致窗口对象被回收
let win

// 注册协议
protocol.registerSchemesAsPrivileged([{scheme, privileges: {secure: true, standard: true}}])

function createMainWindow() {
  win = WindowManager.createWindow()
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    createProtocol(scheme)
    win.loadURL(scheme + '://./index.html')
  }
}

app.on('window-all-closed', () => {
  if (!isMacOS) app.quit()
})

app.on('activate', () => {
  if (win === null) createMainWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    /* vue-devtools */
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
    /*electron 6.0以下或win10黑暗模式下不支持vue-devtools，请注释该代码片段*/
  }
  createMainWindow()
})

if (isDevelopment) {
  if (isWindows) {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
} else {
  Menu.setApplicationMenu(null)
}
