'use client';

import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

export const RadarChartComponent = ({ data }: { data: { platform: string; count: number }[] }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="platform" tick={{ fill: '#c9d1d9', fontSize: 12 }} />
                <PolarRadiusAxis tick={{ fill: '#c9d1d9' }} />
                <Radar name="Games" dataKey="count" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Tooltip contentStyle={{ backgroundColor: '#161b22', border: 'none', color: '#fff' }} />
            </RadarChart>
        </ResponsiveContainer>
    );
}
