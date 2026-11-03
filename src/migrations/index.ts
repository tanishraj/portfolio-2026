import * as migration_20261103_214354_initial from './20261103_214354_initial'
import * as migration_20261103_215832_ask_events from './20261103_215832_ask_events'

export const migrations = [
  {
    up: migration_20261103_214354_initial.up,
    down: migration_20261103_214354_initial.down,
    name: '20261103_214354_initial',
  },
  {
    up: migration_20261103_215832_ask_events.up,
    down: migration_20261103_215832_ask_events.down,
    name: '20261103_215832_ask_events',
  },
]
