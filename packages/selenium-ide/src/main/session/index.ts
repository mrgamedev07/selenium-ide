import { App, Menu } from 'electron'
import Api from '../api'
import { Session, Storage } from '../types'
import ArgTypesController from './controllers/ArgTypes'
import CommandsController from './controllers/Commands'
import DialogsController from './controllers/Dialogs'
import DriverController from './controllers/Driver'
import PlaybackController from './controllers/Playback'
import PluginsController from './controllers/Plugins'
import ProjectsController from './controllers/Projects'
import RecorderController from './controllers/Recorder'
import StateController from './controllers/State'
import SuitesController from './controllers/Suites'
import TestsController from './controllers/Tests'
import VariablesController from './controllers/Variables'
import WindowsController from './controllers/Windows'

export default async function createSession(
  app: App,
  store: Storage
): Promise<Session> {
  // Building our session object
  const partialSession: Partial<Session> = {
    app,
    dialogs: new DialogsController(),
    menu: new Menu(),
    store,
  }
  partialSession.argTypes = new ArgTypesController(partialSession as Session)
  partialSession.commands = new CommandsController(partialSession as Session)
  partialSession.driver = new DriverController(partialSession as Session)
  partialSession.playback = new PlaybackController(partialSession as Session)
  partialSession.plugins = new PluginsController(partialSession as Session)
  partialSession.projects = new ProjectsController(partialSession as Session)
  partialSession.recorder = new RecorderController(partialSession as Session)
  partialSession.state = new StateController(partialSession as Session)
  partialSession.suites = new SuitesController(partialSession as Session)
  partialSession.tests = new TestsController(partialSession as Session)
  partialSession.variables = new VariablesController(partialSession as Session)
  partialSession.windows = new WindowsController(partialSession as Session)
  partialSession.api = await Api(partialSession as Session)
  const session = partialSession as Session

  // Get the underlying driver going
  session.windows.open('chromedriver')

  return session
}