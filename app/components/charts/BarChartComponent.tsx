'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
    TooltipProps,
    BarProps,
    XAxisProps
} from 'recharts';
import { generateHighContrastColors } from '@/app/util/generateHighContrastColors';
import isValidColor from '@/app/util/isValidColor';

// Mutually exclusive types
type BarChartFixedColors = {
    colors: string[];
    uniformColor?: never;
};

type RequiredXAxisProps = {
    dataKey: string;
    angle: number;
    interval: number;
    tick: { fill: string };
};

type CustomXAxisProps = RequiredXAxisProps & Omit<Partial<XAxisProps>, keyof RequiredXAxisProps>;

type BarChartUniformColor = {
    colors?: never;
    uniformColor: string;
};

export type BarChartProps = {
    height?: number;
    width?: string,
    data: { name: string; rating: number }[];
    xAxisProps: CustomXAxisProps,
    barProps: BarProps,
    toolTipProps?: TooltipProps<string, string>;
} & (BarChartFixedColors | BarChartUniformColor);

/**
 * BarChartComponent
 *
 * A customizable bar chart using Recharts with support for:
 * - Manually defined or auto-generated high contrast bar colors
 * - Optionally assign unique color to biggest/smallest bar
 * - Uniform color setting to use a single color for all bars
 * - Tooltip styling via toolTipProps
 *
 * ## Features
 * - Responsive layout via Recharts ResponsiveContainer
 * - Validates color count matches data length if colors[] is passed
 * - Validates color string validity for override props
 * - Uniform color mode disables individual color overrides
 *
 * ## Props
 * - `height?: number` — Container height
 * - `width?: string` — Container width
 * - `data: { name: string; value: number }[]` — Dataset
 * - `colors?: string[]` — Optional fixed colors, one per bar
 * - `xAxisProps: CustomXAxisProps` — Props passed to `<XAxis>`
 * - `uniformColor?: string` — If passed then used as color for all bars
 * - `toolTipProps` — Props passed to `<Tooltip>`
 * - `barChartProps` — Props passed to `<BarChart>`
 *
 * ## Example:
 * ```tsx
 * <BarChartComponent
 *   height="400px"
 *   uniformColor="#3b82f6"
 *   data={[{ name: "RPG", value: 30 }, { name: "FPS", value: 20 }]}
 *   toolTipProps={{ contentStyle: { backgroundColor: 'black', border: 'none', color: 'white' } }}
 * />
 * ```
 */

export const BarChartComponent = (props: BarChartProps) => {
    const {
        height,
        data,
        toolTipProps,
        colors,
        uniformColor,
        width,
        xAxisProps,
        barProps
    } = props;



    let barColors: string[] = [];

    // Enforce validation
    if (uniformColor && colors)
        throw new Error("Cannot use 'colors' when 'uniformColor' is set");

    if (!uniformColor && !colors)
        barColors = generateHighContrastColors(data.length)

    if (uniformColor && !isValidColor(uniformColor))
        throw new Error("uniformColor must be a valid color when 'uniformColor'");



    if (colors) {
        if (colors.length < data.length)
            throw new Error('Number of colors passed is less than data entries');

        barColors = [...colors];
    }


    return (
        <ResponsiveContainer width={width || "100%"} height={height || 400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}  >
                <CartesianGrid stroke="#30363d" />
                <XAxis {...xAxisProps} />
                <YAxis tick={{ fill: '#c9d1d9' }} />
                <Tooltip {...toolTipProps} />
                <Bar  {...barProps}>
                    {data.map((_, i) => (
                        <Cell key={i} fill={uniformColor || barColors[i]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer >
    );
};
