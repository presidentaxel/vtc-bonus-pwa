import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

type RankBadgeProps = {
  rank: string;
  color?: string;
};

export default function RankBadge({ rank, color }: RankBadgeProps) {
  const ring = color || '#22d3ee';
  return (
    <span className="rank-badge" style={{ '--badge-color': ring } as React.CSSProperties}>
      <FaCheckCircle size={16} />
      <strong>{rank}</strong>
      <span className="rank-badge__tag">actif</span>
    </span>
  );
}