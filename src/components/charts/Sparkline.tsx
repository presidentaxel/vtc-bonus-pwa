import React from 'react';


type Point = { date: string; count: number };
export default function Sparkline({ data = [] as Point[] }: { data?: Point[] }) {
if (!data.length) return <div className="sub">Pas encore d\'historique</div>;
const w = 300, h = 60, pad = 6;
const xs = data.map((_, i) => i);
const ys = data.map(d => d.count);
const minY = Math.min(...ys);
const maxY = Math.max(...ys);
const dx = (w - pad * 2) / Math.max(1, xs.length - 1);
const scaleY = (v: number) => h - pad - (maxY === minY ? 0 : ((v - minY) / (maxY - minY)) * (h - pad * 2));
const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${pad + x * dx} ${scaleY(ys[i])}`).join(' ');
return (
<svg width="100%" viewBox={`0 0 ${w} ${h}`} aria-label="Historique des courses">
<path d={path} fill="none" stroke="currentColor" stroke-width="2" opacity="0.9" />
</svg>
);
}