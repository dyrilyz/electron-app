import puppeteer from 'puppeteer-core'
import path from 'path'
import {CHROME_PATH_MAC, CHROME_PATH_WIN} from "@/constant"

const browserPaths = {
  // 'darwin': 'chrome-mac/Chromium.app/Contents/MacOS/Chromium',
  'darwin': CHROME_PATH_MAC,
  'win32': CHROME_PATH_WIN,
}


export async function login() {
  try {
    console.log(path.resolve(__static))
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: path.resolve(browserPaths[process.platform])
    })
    console.log(browser)
  } catch (e) {
    console.log(e)
  }
}
