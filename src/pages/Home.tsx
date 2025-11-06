import React from 'react';
import InputNumber from '../components/InputNumber';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import { useBonus } from '../hooks/useBonus';
import { COLORS } from '../lib/constants';


export default function Home() {
const { countPrev, setPrev, countNow, setNow, statsPrev, statsNow } = useBonus();


const nextLabelPrev = statsPrev.next ? `${statsPrev.next.remaining} courses pour ${statsPrev.next.name}` : 'Max atteint';
const nextLabelNow = statsNow.next ? `${statsNow.next.remaining} restantes pour ${statsNow.next.name}` : 'Max atteint';
const nextMaxNow = statsNow.next ? countNow + statsNow.next.remaining : countNow;


return (
<div className="grid">
<div className="card">
<h2>Entrées</h2>
<InputNumber label="Courses à n-1" value={countPrev} onChange={setPrev} />
<InputNumber label="Courses à n (mois actuel)" value={countNow} onChange={setNow} />
</div>


<div className="card">
<h2>Statut pour n+1 (selon n)</h2>
<div style={{display:'flex', gap:8, alignItems:'center', marginBottom:8}}>
<Badge text={`Statut: ${statsNow.rank}`} color={COLORS[statsNow.rank]} />
<Badge text={`Bonus: +${statsNow.perRide}€/course`} />
</div>
<div className="sub">{nextLabelNow}</div>
<div style={{marginTop:8}}>
<ProgressBar value={countNow} max={Math.max(1, nextMaxNow)} />
</div>
</div>


<div className="stats">
<StatCard title="Courses (n)" value={countNow} />
<StatCard title="Bonus total (n)" value={`${statsNow.total} €`} />
<StatCard title="Statut (n)" value={statsNow.rank} />
<StatCard title="Par course" value={`+${statsNow.perRide} €`} />
</div>


<div className="card">
<h2>Référence n-1 → statut de départ n</h2>
<div style={{display:'flex', gap:8, alignItems:'center', marginBottom:8}}>
<Badge text={`Statut: ${statsPrev.rank}`} color={COLORS[statsPrev.rank]} />
<Badge text={`+${statsPrev.perRide}€/course`} />
</div>
<div className="sub">{nextLabelPrev}</div>
</div>
</div>
);
}