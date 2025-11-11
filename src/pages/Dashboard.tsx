import React from 'react';
import Sparkline from '../components/charts/Sparkline';
import { loadState } from '../lib/storage';

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' });

function analyseHistory() {
  const { history } = loadState();
  if (!history.length) {
    return {
      history,
      total: 0,
      bestDay: 0,
      bestDayLabel: '—',
      averageLastWeek: 0,
      lastCheckpoint: 0,
    };
  }

  const ordered = [...history].sort((a, b) => a.date.localeCompare(b.date));
  const dailyIncrements = ordered.map((point, index) => {
    const prev = index === 0 ? 0 : ordered[index - 1].count;
    return Math.max(0, point.count - prev);
  });

  const total = ordered[ordered.length - 1].count;
  let bestDay = 0;
  let bestDayLabel = '—';
  dailyIncrements.forEach((gain, idx) => {
    if (gain >= bestDay && gain > 0) {
      bestDay = gain;
      bestDayLabel = dateFormatter.format(new Date(ordered[idx].date));
    }
  });

  const lastWeek = dailyIncrements.slice(-7);
  const averageLastWeek = lastWeek.length
    ? Math.round(lastWeek.reduce((sum, val) => sum + val, 0) / lastWeek.length)
    : 0;

  const lastCheckpoint =
    dailyIncrements[dailyIncrements.length - 1] ?? ordered[ordered.length - 1].count;

  return { history: ordered, total, bestDay, bestDayLabel, averageLastWeek, lastCheckpoint };
}

export default function Dashboard() {
  const { history, total, bestDay, bestDayLabel, averageLastWeek, lastCheckpoint } =
    React.useMemo(() => analyseHistory(), []);

  return (
    <div className="grid">
      <section className="card">
        <div className="section-heading">
          <h3>Historique des courses</h3>
          <span className="chip chip--ghost">30 jours</span>
        </div>
        <div className="dashboard-chart">
          <Sparkline data={history} />
        </div>
        <div className="dashboard-quick">
          <div>
            <span>Total actuel</span>
            <strong>{total}</strong>
          </div>
          <div>
            <span>Meilleure journée</span>
            <strong>
              {bestDay > 0 ? `+${bestDay} courses` : '—'} <small>{bestDayLabel}</small>
            </strong>
          </div>
          <div>
            <span>Rythme 7 derniers jours</span>
            <strong>~{averageLastWeek} / jour</strong>
          </div>
          <div>
            <span>Dernier checkpoint</span>
            <strong>+{lastCheckpoint}</strong>
          </div>
        </div>
        <p className="dashboard-note">
          Les checkpoints se mettent à jour à chaque fois que tu ajustes ton compteur depuis
          l’accueil. Garder un rythme constant augmente tes chances de badge supérieur.
        </p>
      </section>
    </div>
  );
}