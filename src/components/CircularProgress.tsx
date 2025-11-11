import React from 'react';

type CircularProgressProps = {
  value: number;
  max: number;
  label?: string;
  caption?: string;
};

export default function CircularProgress({ value, max, label, caption }: CircularProgressProps) {
  const safeMax = max <= 0 ? Math.max(value, 1) : max;
  const ratio = safeMax === 0 ? 0 : Math.min(1, value / safeMax);
  const angle = Math.max(0, Math.min(360, ratio * 360));
  const percent = Math.round(ratio * 100);

  return (
    <div className="xp-ring" role="presentation">
      <div
        className="xp-ring__outer"
        style={{
          background: `conic-gradient(var(--accent-gradient-start) ${angle}deg, var(--ring-muted) ${angle}deg)`,
        }}
      >
        <div className="xp-ring__inner">
          <div className="xp-ring__value">{value}</div>
          {label && <div className="xp-ring__label">{label}</div>}
          <div className="xp-ring__caption">{caption ?? `${percent}%`}</div>
        </div>
      </div>
    </div>
  );
}

