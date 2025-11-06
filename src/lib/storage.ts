const KEY = 'vtc-bonus-state';


export type State = {
countPrev: number; // n-1
countNow: number; // n
history: Array<{ date: string; count: number }>; // pour sparkline
};


const defaultState: State = { countPrev: 0, countNow: 0, history: [] };


export function loadState(): State {
try {
const raw = localStorage.getItem(KEY);
return raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState;
} catch {
return defaultState;
}
}


export function saveState(s: State) {
localStorage.setItem(KEY, JSON.stringify(s));
}


export function pushHistory(count: number) {
const s = loadState();
const today = new Date().toISOString().slice(0, 10);
const last = s.history[s.history.length - 1];
if (!last || last.date !== today) {
s.history.push({ date: today, count });
if (s.history.length > 30) s.history.shift();
saveState(s);
}
}