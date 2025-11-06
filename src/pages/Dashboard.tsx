import React from 'react';
import Sparkline from '../components/charts/Sparkline';
import { loadState } from '../lib/storage';


export default function Dashboard() {
const { history } = loadState();
return (
<div className="grid">
<div className="card">
<h2>Historique des courses (30 jours)</h2>
<Sparkline data={history} />
<div className="sub" style={{marginTop:8}}>Les points sont ajoutés automatiquement chaque jour où vous modifiez le compteur n.</div>
</div>
</div>
);
}