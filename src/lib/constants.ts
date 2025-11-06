export const RANKS = [
{ name: 'Bronze', min: 0, max: 50, bonusPerRide: 1 },
{ name: 'Argent', min: 51, max: 100, bonusPerRide: 2 },
{ name: 'Or', min: 101, max: 150, bonusPerRide: 3 },
{ name: 'Diamant', min: 151, max: Infinity, bonusPerRide: 4 },
] as const;


export const COLORS: Record<string, string> = {
Bronze: '#cd7f32',
Argent: '#9ca3af',
Or: '#f59e0b',
Diamant: '#60a5fa',
};