import * as migration_20251109_060306 from './20251109_060306';

export const migrations = [
  {
    up: migration_20251109_060306.up,
    down: migration_20251109_060306.down,
    name: '20251109_060306'
  },
];
