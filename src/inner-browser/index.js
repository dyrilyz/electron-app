import puppeteer from 'puppeteer-core'
import path from 'path'

const browserPaths = {
  // 'darwin': 'chrome-mac/Chromium.app/Contents/MacOS/Chromium',
  'darwin': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'win32': 'chrome-mac/Chromium.app/Contents/MacOS/Chromium',
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
