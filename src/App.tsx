import React from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';


function useHashRoute() {
const [route, setRoute] = React.useState(window.location.hash.replace('#', '') || '/');
React.useEffect(() => {
const onHash = () => setRoute(window.location.hash.replace('#', '') || '/');
window.addEventListener('hashchange', onHash);
return () => window.removeEventListener('hashchange', onHash);
}, []);
return [route, (r: string) => (window.location.hash = r)] as const;
}


export default function App() {
    const [route, nav] = useHashRoute();
    return (
        <div className="app">
            <header className="app-header">
            <h1>VTC Bonus</h1>
            <nav>
                <button onClick={() => nav('/')}>Accueil</button>
                <button onClick={() => nav('/dashboard')}>Dashboard</button>
            </nav>
            </header>
            <main>
                {route === '/' && <Home />}
                {route === '/dashboard' && <Dashboard />}
            </main>
            <footer className="app-footer">© {new Date().getFullYear()} VTC Bonus</footer>
        </div>
    );
}