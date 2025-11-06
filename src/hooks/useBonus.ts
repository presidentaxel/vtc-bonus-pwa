import { useEffect, useMemo, useState } from 'react';
import { bonusForMonth, getRank, nextRank, totalEarnings } from '../lib/calc';
import { loadState, saveState, pushHistory } from '../lib/storage';


export function useBonus() {
const [countPrev, setPrev] = useState<number>(loadState().countPrev);
const [countNow, setNow] = useState<number>(loadState().countNow);


useEffect(() => {
saveState({ countPrev, countNow, history: loadState().history });
}, [countPrev, countNow]);


useEffect(() => {
pushHistory(countNow);
}, [countNow]);


const statsPrev = useMemo(() => {
const r = getRank(countPrev);
const nx = nextRank(countPrev);
return { rank: r.name, perRide: r.bonusPerRide, next: nx };
}, [countPrev]);


const statsNow = useMemo(() => {
const b = bonusForMonth(countNow);
const nx = nextRank(countNow);
const total = totalEarnings(countNow, 0);
return { ...b, next: nx, total };
}, [countNow]);


return { countPrev, setPrev, countNow, setNow, statsPrev, statsNow };
}