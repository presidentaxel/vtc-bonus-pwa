export const RANKS = [
  { name: 'Bronze',  min: 0,   max: 49,  bonusPerRide: 1 },
  { name: 'Argent',  min: 50,  max: 99, bonusPerRide: 2 },
  { name: 'Or',      min: 100, max: 149, bonusPerRide: 3 },
  { name: 'Diamant', min: 150, max: Infinity, bonusPerRide: 4 },
] as const;

export const COLORS: Record<string, string> = {
  Bronze:  '#cd7f32',
  Argent:  '#9ca3af',
  Or:      '#f59e0b',
  Diamant: '#3b82f6',
};