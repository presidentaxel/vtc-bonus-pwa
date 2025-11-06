import React from 'react';
import { FiHome, FiBarChart2, FiUser } from 'react-icons/fi';

type Tab = '/' | '/dashboard' | '/profile';

export default function BottomTabBar() {
  const [route, setRoute] = React.useState<Tab>((window.location.hash.replace('#','') as Tab) || '/');
  React.useEffect(() => {
    const onHash = () => setRoute((window.location.hash.replace('#','') as Tab) || '/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const go = (r: Tab) => (window.location.hash = r);

  return (
    <nav className="tabbar" role="navigation" aria-label="Navigation principale">
      <button className={`tabbtn ${route==='/'?'active':''}`} onClick={() => go('/')}>
        <FiHome size={22} />
        <span style={{fontSize:12}}>Accueil</span>
      </button>
      <button className={`tabbtn ${route==='/dashboard'?'active':''}`} onClick={() => go('/dashboard')}>
        <FiBarChart2 size={22} />
        <span style={{fontSize:12}}>Stats</span>
      </button>
      <button className={`tabbtn ${route==='/profile'?'active':''}`} onClick={() => go('/profile')}>
        <FiUser size={22} />
        <span style={{fontSize:12}}>Profil</span>
      </button>
    </nav>
  );
}