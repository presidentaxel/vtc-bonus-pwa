import React from 'react';


export default function ProgressBar({ value, max }: { value: number; max: number; }) {
const pct = Math.max(0, Math.min(100, (value / max) * 100));
    return (
    <div className="progress" aria-valuenow={value} aria-valuemax={max} role="progressbar">
        <div style={{ width: `${pct}%` }} />
    </div>
    );
}