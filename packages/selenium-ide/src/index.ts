import { app } from 'electron'
import chromedriver from './chromedriver'
import createSession from './session'

app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.on('ready', async () => {
  // Let chromedriver fully start up
  await chromedriver(app)
  // Create a window level data object containing everything we need
  await createSession(app)
})

let allWindowsClosed = false
// Respect the OSX convention of having the application in memory even
// after all windows have been closed
app.on('window-all-closed', () => {
  allWindowsClosed = true
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Getting things in a row so that re-activating an app with no windows
// on Darwin recreates the main window again
app.on('activate', async () => {
  if (allWindowsClosed) {
    allWindowsClosed = false
    await createSession(app)
  }
})