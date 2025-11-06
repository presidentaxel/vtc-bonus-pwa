// src/lib/storage.ts
const KEY = 'vtc-bonus-state';
const USER_KEY = 'vtc-bonus-user';

export type State = {
  countPrev: number; // n-1
  countNow: number;  // n
  history: Array<{ date: string; count: number }>; // pour sparkline
};

export type User = {
  firstName: string;
  lastName: string;
};

const defaultState: State = { countPrev: 0, countNow: 0, history: [] };
const defaultUser: User = { firstName: '', lastName: '' };

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

/* ---------------- User (local account) ---------------- */

export function loadUser(): User {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? { ...defaultUser, ...JSON.parse(raw) } : defaultUser;
  } catch {
    return defaultUser;
  }
}

export function saveUser(u: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(u));
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}