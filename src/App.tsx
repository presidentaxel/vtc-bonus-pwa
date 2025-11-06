import React from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import BottomTabBar from './components/BottomTabBar';
import { loadUser } from './lib/storage';

function useHashRoute() {
  const [route, setRoute] = React.useState(window.location.hash.replace('#', '') || '/');
  React.useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return [route] as const;
}

export default function App() {
  const [route] = useHashRoute();
  const user = loadUser();
  const displayName = user.firstName || user.lastName ? `${user.firstName} ${user.lastName}`.trim() : 'Invité';

  return (
    <div className="app">
      {/* Header léger : nom + (la page place le badge de rang) */}
      <header className="app-header">
        <h1 style={{ margin: 0, color: 'var(--accent)' }}>VTC Bonus</h1>
        <div style={{ fontWeight: 600 }}>{displayName}</div>
      </header>

      <main>
        {route === '/' && <Home />}
        {route === '/dashboard' && <Dashboard />}
        {route === '/profile' && <Profile />}
      </main>

      <BottomTabBar />
    </div>
  );
}