const { Menu } = require('electron')

const emptyFunction = () => {}

module.exports = function ApplicationMenu(params = {}) {
  const { onOpenFile } = params

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open file',
          click: onOpenFile || emptyFunction
        }
      ]
    }
  ]

  return Menu.buildFromTemplate(template)
}
