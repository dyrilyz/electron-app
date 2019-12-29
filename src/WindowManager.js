import {BrowserWindow, ipcMain} from 'electron'

const windowPool = []

function createWindow(opt, isDidFinishLoadShow = true, windowName = '') {
  const conf = {
    width: 1020,
    height: 700,
    minWidth: 1020,
    minHeight: 700,
    frame: false,
    // transparent: true,
    show: false,
    webPreferences: {
      nodeIntegration: true
    },
  }

  opt && Object.assign(conf, opt)
  let win = new BrowserWindow(conf)
  let id = win.id
  windowPool.push({id, windowName, win})

  if (isDidFinishLoadShow) {
    win.webContents.on('did-finish-load', () => win.show())
  } else {
    win.show()
  }

  win.on('closed', () => {
    for (const i in windowPool) {
      if (windowPool[i].id === id) {
        windowPool.splice(i, 1)
        win = null
        id = null
        break
      }
    }
  })

  return win
}

/**
 * 根据窗口id获取窗口对象
 * @param id
 * @returns {Promise<BrowserWindow>}
 */
function getShowedWinById(id) {
  for (const i in windowPool) {
    if (windowPool[i].id === id) {
      return windowPool[i].win
    }
  }
}

/**
 * 窗口向指定窗口发送事件
 * @param fromId 当前窗口
 * @param toId 目标窗口
 * @param eName 事件名称
 * @param data 传递的数据
 */
async function winToWin(fromId, toId, eName, data) {
  // const fromWin = await getShowedWinById(fromId)
  const toWin = await getShowedWinById(toId)
  toWin.webContents.send(eName, data)
}

// 事件中转(子窗口->父窗口)
ipcMain.on('child-transfer',
  /**
   * 事件中转(子窗口->父窗口)
   * @param e
   * @param meta [
   *      id: 窗口id
   *      eName 事件名称
   *      data 数据
   *  ]
   */
  (e, meta) => {
    const win = BrowserWindow.fromId(meta.id)
    if (win) {
      const parent = win.getParentWindow()
      parent && parent.webContents.send(meta.eName, meta.data)
    }
  }
)

// event.sender为渲染进程的webContent对象
ipcMain.on('get-window-id', e => {
  const win = BrowserWindow.fromWebContents(e.sender)
  if (win) {
    e.reply('reply-window-id', win.id)
  }
})

ipcMain.on('win-minimize', (e, id) => {
  if (id) {
    const win = getShowedWinById(id)
    win && win.minimize()
  }
})

ipcMain.on('win-maximize', (e, id) => {
  if (id) {
    const win = getShowedWinById(id)
    win && win.maximize()
  }
})

ipcMain.on('win-close', (e, id) => {
  if (id) {
    const win = getShowedWinById(id)
    win && win.close()
  }
})

export default {
  createWindow,
  getShowedWinById,
  winToWin,
}
