import React from 'react';
import InputNumber from '../components/InputNumber';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import RankBadge from '../components/RankBadge';
import FloatingBubble from '../components/FloatingBubble';
import { useBonus } from '../hooks/useBonus';
import { COLORS } from '../lib/constants';
import { loadUser } from '../lib/storage';

export default function Home() {
  const { countPrev, setPrev, countNow, setNow, statsPrev, statsNow } = useBonus();
  const user = loadUser();

  const nextLabelPrev = statsPrev.next ? `${statsPrev.next.remaining} courses pour ${statsPrev.next.name}` : 'Max atteint';
  const nextLabelNow = statsNow.next ? `${statsNow.next.remaining} restantes pour ${statsNow.next.name}` : 'Max atteint';
  const nextMaxNow = statsNow.next ? countNow + statsNow.next.remaining : countNow;

  // En-tête de page : nom + badge de rang (style “verifié”)
  const displayName = user.firstName || user.lastName ? `${user.firstName} ${user.lastName}`.trim() : 'Invité';

  return (
    <div className="grid">
      <div className="card" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div className="sub">Bienvenue</div>
          <h2 style={{ margin:'4px 0 0 0' }}>{displayName}</h2>
        </div>
        <RankBadge rank={statsNow.rank} color={COLORS[statsNow.rank]} />
      </div>

      <div className="card">
        <h2 style={{ color:'var(--accent)', marginTop:0 }}>Statut pour n+1</h2>
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
        <h3 style={{ marginTop:0 }}>Référence n-1 → statut de départ n</h3>
        <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:8}}>
          <Badge text={`Statut: ${statsPrev.rank}`} color={COLORS[statsPrev.rank]} />
          <Badge text={`+${statsPrev.perRide}€/course`} />
        </div>
        <div className="sub">{nextLabelPrev}</div>
      </div>

      {/* Bulle flottante qui ouvre les inputs (n-1, n) */}
      <FloatingBubble>
        <div className="grid">
          <InputNumber label="Courses à n-1" value={countPrev} onChange={setPrev} />
          <InputNumber label="Courses à n (mois actuel)" value={countNow} onChange={setNow} />
          <button className="btn" onClick={() => (window.location.hash = '/profile')}>Aller au profil</button>
        </div>
      </FloatingBubble>
    </div>
  );
}