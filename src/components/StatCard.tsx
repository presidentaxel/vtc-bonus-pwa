import React from 'react';


export default function StatCard({ title, value, subtitle }: { title: string; value: React.ReactNode; subtitle?: string; }) {
    return (
        <div className="stat">
            <div className="sub">{title}</div>
            <div className="kpi">{value}</div>
            {subtitle && <div className="sub" style={{marginTop:4}}>{subtitle}</div>}
        </div>
    );
}