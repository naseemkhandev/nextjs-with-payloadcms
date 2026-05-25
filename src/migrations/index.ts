import * as migration_20260525_000841 from './20260525_000841';

export const migrations = [
  {
    up: migration_20260525_000841.up,
    down: migration_20260525_000841.down,
    name: '20260525_000841'
  },
];
