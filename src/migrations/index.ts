import * as migration_20261103_214354_initial from './20261103_214354_initial'
import * as migration_20261103_215832_ask_events from './20261103_215832_ask_events'
import * as migration_20261104_194228_case_study_sections from './20261104_194228_case_study_sections'

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
  {
    up: migration_20261104_194228_case_study_sections.up,
    down: migration_20261104_194228_case_study_sections.down,
    name: '20261104_194228_case_study_sections',
  },
]
