import React from 'react';
import { FiAward, FiTrendingUp, FiZap, FiTarget } from 'react-icons/fi';
import InputNumber from '../components/InputNumber';
import FloatingBubble from '../components/FloatingBubble';
import RankBadge from '../components/RankBadge';
import CircularProgress from '../components/CircularProgress';
import Sparkline from '../components/charts/Sparkline';
import { useBonus } from '../hooks/useBonus';
import { COLORS, RANKS } from '../lib/constants';
import { loadState, loadUser } from '../lib/storage';

const XP_PAR_COURSE = 12;

function capitalise(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function computeStreak(history: Array<{ date: string; count: number }>) {
  if (!history.length) return 0;
  const ordered = [...history].sort((a, b) => a.date.localeCompare(b.date));
  let streak = 0;
  const dayMs = 86_400_000;
  for (let i = ordered.length - 1; i >= 0; i -= 1) {
    if (ordered[i].count <= 0) break;
    streak += 1;
    if (i === 0) break;
    const curr = new Date(ordered[i].date).getTime();
    const prev = new Date(ordered[i - 1].date).getTime();
    const diff = Math.round((curr - prev) / dayMs);
    if (diff !== 1) break;
  }
  return streak;
}

export default function Home() {
  const { countPrev, setPrev, countNow, setNow, statsPrev, statsNow } = useBonus();
  const user = loadUser();
  const { history } = loadState();

  const nextMaxNow = statsNow.next ? countNow + statsNow.next.remaining : countNow || 1;
  const streak = computeStreak(history);
  const deltaMonth = countNow - countPrev;

  const formatter = React.useMemo(
    () => new Intl.DateTimeFormat('fr-FR', { month: 'long' }),
    []
  );
  const today = new Date();
  const thisMonth = capitalise(formatter.format(today));
  const nextMonth = capitalise(formatter.format(new Date(today.getFullYear(), today.getMonth() + 1, 1)));
  const lastMonth = capitalise(
    formatter.format(new Date(today.getFullYear(), today.getMonth() - 1, 1))
  );

  const displayName =
    user.firstName || user.lastName ? `${user.firstName} ${user.lastName}`.trim() : 'Chauffeur Bolt';

  const rewardTrack = RANKS.map((rank) => {
    const reached = countNow >= rank.min;
    const active = statsNow.rank === rank.name;
    const remaining = rank.max === Infinity ? 0 : Math.max(0, rank.max - countNow);
    const rangeSize = rank.max === Infinity ? 1 : Math.max(1, rank.max - rank.min);
    const withinProgress = active
      ? Math.min(1, (countNow - rank.min) / rangeSize)
      : reached
        ? 1
        : 0;
    return { rank, reached, active, remaining, withinProgress };
  });

  const quests = [
    {
      title: 'Défi 48h',
      description: 'Réalise 10 courses en moins de deux jours pour conserver une activité forte.',
      reward: '+150 XP',
      status: `${Math.min(10, countNow % 10)} / 10 courses`,
    },
    {
      title: 'Série continue',
      description: 'Maintiens une série de journées actives pour grimper dans ton niveau Bolt.',
      reward: `+${streak * 40} XP`,
      status: `${streak} jours suivis`,
    },
    {
      title: 'Cap de badge',
      description: 'Atteins le prochain badge pour débloquer un niveau de récompense supérieur.',
      reward: statsNow.next ? '+250 XP' : '+400 XP',
      status: statsNow.next ? `${statsNow.next.remaining} courses restantes` : 'Badge max atteint',
    },
  ];

  const trailingHistory = history.slice(-12);
  const bonusActuel = countNow * statsPrev.perRide;

  const leaderboard = React.useMemo(() => {
    const baseLeaders = [
      { name: 'VTC_928', courses: 168, xp: 168 * XP_PAR_COURSE + 360, delta: '+180 XP' },
      { name: 'DriverParis75', courses: 152, xp: 152 * XP_PAR_COURSE + 220, delta: '+140 XP' },
      { name: 'NightShift93', courses: 139, xp: 139 * XP_PAR_COURSE + 120, delta: '+108 XP' },
    ];
    const variationXp = deltaMonth * XP_PAR_COURSE;
    const variation =
      deltaMonth === 0
        ? `Stable vs ${lastMonth}`
        : `${variationXp > 0 ? `+${variationXp}` : variationXp} XP`;
    const selfEntry = {
      name: displayName,
      courses: countNow,
      xp: countNow * XP_PAR_COURSE,
      delta: variation,
      isSelf: true,
    };
    return [...baseLeaders, selfEntry]
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 4)
      .map((entry, index) => ({ ...entry, position: index + 1 }));
  }, [countNow, deltaMonth, displayName, lastMonth]);

  return (
    <div className="home-grid">
      <section className="card hero-card">
        <div className="hero-card__header">
          <div className="chip chip--ghost">Objectif {nextMonth}</div>
          <RankBadge rank={statsNow.rank} color={COLORS[statsNow.rank]} />
        </div>

        <div className="hero-card__body">
          <div className="hero-copy">
            <div className="hero-bonus">
              <span className="hero-bonus__label">Bonus Bolt en {thisMonth}</span>
              <strong className="hero-bonus__value">+{bonusActuel} €</strong>
              <span className="hero-bonus__hint">Calculé grâce à ton badge {statsPrev.rank} obtenu en {lastMonth}</span>
            </div>
            <p className="hero-copy__hello">Bonjour {displayName},</p>
            <h2 className="hero-copy__title">
              Ton badge {statsNow.rank} active le bonus Bolt de {nextMonth}
            </h2>
            <p className="hero-copy__subtitle">
              Chaque course réalisée en {thisMonth} ajoute immédiatement{' '}
              <strong>+{statsPrev.perRide} €</strong> à ta prime du mois. Garde ce rythme pour
              décrocher un badge supérieur et booster ton bonus de {nextMonth}.
            </p>
            <div className="hero-next">
              {statsNow.next ? (
                <>
                  <FiTarget size={16} /> Encore {statsNow.next.remaining} courses pour atteindre{' '}
                  <b>{statsNow.next.name}</b>
                </>
              ) : (
                <>
                  <FiAward size={16} /> Tu es au sommet. Défends ton statut Diamant.
                </>
              )}
            </div>

            <div className="hero-sparkline">
              <div className="hero-sparkline__chart">
                <Sparkline data={trailingHistory} />
              </div>
              <div className="hero-sparkline__caption">
                <span>Rythme 30 jours</span>
                <strong>{countNow} courses</strong>
              </div>
            </div>
          </div>

          <CircularProgress
            value={countNow}
            max={nextMaxNow}
            label="courses"
            caption={statsNow.next ? `${Math.round((countNow / nextMaxNow) * 100)}%` : 'Max'}
          />
        </div>

        <div className="hero-card__footer">
          <div>
            <span>Courses {thisMonth}</span>
            <strong>{countNow}</strong>
          </div>
          <div>
            <span>Écart vs {lastMonth}</span>
            <strong className={deltaMonth >= 0 ? 'trend-up' : 'trend-down'}>
              {deltaMonth >= 0 ? `+${deltaMonth}` : deltaMonth} courses
            </strong>
          </div>
          <div>
            <span>Jours consécutifs</span>
            <strong>{streak} j</strong>
          </div>
        </div>
      </section>

      <section className="metric-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <FiTrendingUp />
          </div>
          <div className="metric-label">Rythme actuel</div>
          <div className="metric-value">{Math.max(0, countNow - (trailingHistory[0]?.count ?? 0))}</div>
          <div className="metric-subtitle">Progression des 12 dernières saisies</div>
        </div>

        <div className="metric-card">
          <div className="metric-icon metric-icon--accent">
            <FiAward />
          </div>
          <div className="metric-label">Badge obtenu en {thisMonth}</div>
          <div className="metric-value">{statsPrev.rank}</div>
          <div className="metric-subtitle">+{statsPrev.perRide} €/course</div>
        </div>

        <div className="metric-card">
          <div className="metric-icon metric-icon--energy">
            <FiZap />
          </div>
          <div className="metric-label">Prime par course</div>
          <div className="metric-value">+{statsNow.perRide} €</div>
          <div className="metric-subtitle">Valable sur {nextMonth}</div>
        </div>
      </section>

      <section className="card">
        <div className="section-heading">
          <h3>Classement chauffeurs Bolt</h3>
          <span className="chip chip--ghost">Données démo</span>
        </div>
        <div className="leaderboard">
          <div className="leaderboard__header">
            <span>Rang</span>
            <span>XP total</span>
          </div>
          <div className="leaderboard__rows">
            {leaderboard.map((entry) => (
              <div
                key={`${entry.name}-${entry.position}`}
                className={`leaderboard__row ${entry.isSelf ? 'is-self' : ''}`}
              >
                <span>
                  <span className="leaderboard__rank">{entry.position}</span>
                  {entry.isSelf ? 'Vous' : entry.name}
                </span>
                <div className="leaderboard__chips">
                  <span>{entry.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card reward-track">
        <div className="section-heading">
          <h3>Trajectoire de badges</h3>
          <span className="chip chip--accent">Prochaine étape</span>
        </div>
        <div className="reward-track__list">
          {rewardTrack.map(({ rank, reached, active, withinProgress, remaining }) => (
            <div
              key={rank.name}
              className={`reward-track__item ${reached ? 'is-reached' : ''} ${
                active ? 'is-active' : ''
              }`}
            >
              <div className="reward-track__badge" style={{ color: COLORS[rank.name] }}>
                {rank.name}
              </div>
              <div className="reward-track__meta">
                <span>
                  {rank.min} → {rank.max === Infinity ? '∞' : rank.max}
                </span>
                <span>+{rank.bonusPerRide} €/course</span>
              </div>
              <div className="reward-track__progress">
                <div style={{ width: `${withinProgress * 100}%` }} />
              </div>
              <div className="reward-track__status">
                {active ? (
                  remaining > 0 ? (
                    <span className="chip chip--ghost">{remaining} restantes</span>
                  ) : (
                    <span className="chip chip--accent">Prêt à évoluer</span>
                  )
                ) : reached ? (
                  <span className="chip chip--ghost">Débloqué</span>
                ) : (
                  <span className="chip chip--ghost">{rank.min} nécessaires</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card legacy-card">
        <div className="section-heading">
          <h3>Point de départ {thisMonth}</h3>
        </div>
        <p className="legacy-card__copy">
          Grâce aux <strong>{countPrev}</strong> courses réalisées en {lastMonth}, tu entres en{' '}
          <strong>{statsPrev.rank}</strong> avec un bonus de{' '}
          <strong>+{statsPrev.perRide} €</strong> par course. Continue de pousser pour laisser une
          trace le mois prochain.
        </p>
      </section>

      <section className="card quests">
        <div className="section-heading">
          <h3>Quêtes du moment</h3>
          <span className="chip chip--pulse">Défis actifs</span>
        </div>
        <div className="quests__list">
          {quests.map((quest) => (
            <article key={quest.title} className="quest-card">
              <div>
                <h4>{quest.title}</h4>
                <p>{quest.description}</p>
              </div>
              <footer>
                <span className="quest-reward">{quest.reward}</span>
                <span className="quest-status">{quest.status}</span>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <FloatingBubble>
        <div className="control-grid">
          <InputNumber label={`Courses ${lastMonth}`} value={countPrev} onChange={setPrev} />
          <InputNumber label={`Courses ${thisMonth}`} value={countNow} onChange={setNow} />
          <button className="btn" onClick={() => (window.location.hash = '/profile')}>
            Personnaliser mon profil
          </button>
        </div>
      </FloatingBubble>
    </div>
  );
}
