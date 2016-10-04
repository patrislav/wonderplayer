const fs = require('fs')
const srt2vtt = require('srt-to-vtt')
const concatStream = require('concat-stream')
const { app, dialog, BrowserWindow, Menu, ipcMain } = require('electron')
const createApplicationMenu = require('./applicationMenu')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  const menu = createApplicationMenu({
    onOpenFile: openFileDialog,
    onAddSubtitles: openSubtitlesDialog
  })
  Menu.setApplicationMenu(menu)

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function openFileDialog() {
  const options = {
    properties: ['openFile'],
    filters: [
      { name: 'Movies', extensions: ['mkv', 'avi', 'mp4', 'webm']},
      { name: 'All Files', extensions: ['*'] }
    ]
  }

  dialog.showOpenDialog(mainWindow, options, paths => {
    mainWindow.webContents.send('open-file', paths)
  })
}

function openSubtitlesDialog() {
  const options = {
    properties: ['openFile'],
    filters: [
      { name: 'Subtites', extensions: ['srt']},
      { name: 'All Files', extensions: ['*'] }
    ]
  }

  dialog.showOpenDialog(mainWindow, options, paths => {
    if (paths && paths[0]) {
      fs.createReadStream(paths[0]).pipe(srt2vtt()).pipe(concatStream(buffer => {
        mainWindow.webContents.send('load-subtitles', 'data:text/vtt;base64,' + buffer.toString('base64'))
      }))
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
