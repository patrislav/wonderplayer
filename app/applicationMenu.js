const { Menu } = require('electron')

const emptyFunction = () => {}

module.exports = function ApplicationMenu(params = {}) {
  const { onOpenFile, onAddSubtitles } = params

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open file',
          click: onOpenFile || emptyFunction
        },
        {
          label: 'Add subtitles',
          click: onAddSubtitles || emptyFunction
        }
      ]
    }
  ]

  return Menu.buildFromTemplate(template)
}
