import React from 'react';


type Props = { label: string; value: number; onChange: (v: number) => void; min?: number; };
export default function InputNumber({ label, value, onChange, min = 0 }: Props) {
    return (
        <div className="input-row">
            <div className="label">{label}</div>
            <input
                className="input"
                type="number"
                inputMode="numeric"
                min={min}
                value={Number.isFinite(value) ? value : 0}
                onChange={(e) => onChange(Math.max(min, parseInt(e.target.value || '0', 10)))}
            />
        </div>
    );
}