import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function RankBadge({ rank, color }: { rank: string; color?: string; }) {
  const ring = color || '#16a34a';
  return (
    <span className="badge" style={{ borderColor: ring, background: '#f0fdf4' }}>
      <FaCheckCircle color={ring} />
      <b>{rank}</b> Vérifié
    </span>
  );
}