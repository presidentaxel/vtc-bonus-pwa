import { RANKS } from './constants';


export function getRank(n: number) {
return RANKS.find(r => n >= r.min && n <= r.max) ?? RANKS[RANKS.length - 1];
}


export function nextRank(n: number) {
const cur = getRank(n);
const i = RANKS.findIndex(r => r.name === cur.name);
const nx = RANKS[i + 1];
return nx ? { name: nx.name, remaining: Math.max(0, nx.min - n) } : null;
}


export function bonusForMonth(countN: number) {
const r = getRank(countN);
return { rank: r.name, perRide: r.bonusPerRide, total: r.bonusPerRide * countN };
}


export function totalEarnings(countN: number, basePerRide = 0) {
const b = bonusForMonth(countN);
return basePerRide * countN + b.total;
}