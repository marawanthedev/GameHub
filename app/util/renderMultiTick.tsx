'use client';

import { ReactElement } from "react";
import { TickItemTextProps } from "recharts/types/polar/PolarAngleAxis";

/**
 * renderMultilineTick
 *
 * A custom tick renderer for Recharts axes that wraps long labels
 * into multiple lines within a fixed character width. This prevents
 * overlapping and keeps labels within the visual space of each bar.
 *
 * @param x - X-axis tick X coordinate
 * @param y - Y-axis tick Y coordinate
 * @param payload - Tick label payload (value is the label string)
 */
export default function renderMultilineTick({ x, y, payload }: TickItemTextProps): ReactElement {
    const label = String(payload.value);
    const maxCharsPerLine = 8; // change based on available width per bar

    // Split label into chunks of maxCharsPerLine
    const words = label.match(new RegExp(`.{1,${maxCharsPerLine}}`, 'g')) || [];

    return (
        <g transform={`translate(${x},${y})`}>
            <text fill="white" fontSize={12} textAnchor="middle">
                {words.map((line, index) => (
                    <tspan key={index} x={0} dy={index === 0 ? 0 : 14}>
                        {line}
                    </tspan>
                ))}
            </text>
        </g>
    );
}
