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
      <header className="app-header">
        <div className="app-header__brand">
          <h1>Bolt Partenaires</h1>
          <span>Programme bonus LMDC</span>
        </div>
        <div className="app-header__user">{displayName}</div>
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