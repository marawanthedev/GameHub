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
    XAxisProps,
    YAxisProps
} from 'recharts';
import { generateHighContrastColors } from '@/app/util/generateHighContrastColors';
import isValidColor from '@/app/util/isValidColor';
import renderMultilineTick from '@/app/util/renderMultiTick';

type BarChartFixedColors = {
    colors: string[];
    uniformColor?: never;
};

type RequiredXAxisProps<T> = {
    dataKey: Extract<keyof T, string>;
    angle: number;
};

type CustomXAxisProps<T> = RequiredXAxisProps<T> &
    Omit<Partial<XAxisProps>, keyof RequiredXAxisProps<T>>;

type BarChartUniformColor = {
    colors?: never;
    uniformColor: string;
};



export type BarChartProps<T extends object> = {
    data: T[];

    xAxisProps: CustomXAxisProps<T>;

    barProps: BarProps & {
        dataKey: keyof T;
    };

    height?: number;
    width?: string;
    yAxisProps?: YAxisProps;
    toolTipProps?: TooltipProps<string, string>;
} & (BarChartFixedColors | BarChartUniformColor);

/**
 * BarChartComponent
 *
 * A flexible and accessible bar chart built with Recharts. It supports both uniform and per-bar coloring,
 * customizable axes, and tooltips.
 *
 * ## Features
 * - **Generic support**: pass your own data type to ensure strict typing of axis and bar `dataKey` values.
 * - **Responsive layout** using `<ResponsiveContainer>`
 * - **High-contrast color generation** when no color props are provided
 * - **Mutually exclusive coloring modes**: either `colors[]` (per-bar) or `uniformColor` (same color for all bars)
 * - **Customizable X-axis** with enforced readability settings
 * - **Tooltip customization** via `toolTipProps`
 *
 * ## Generic Type
 * - `<T extends object>` — You must pass a data type for the chart, e.g.:
 *   ```ts
 *   type GameData = { name: string; rating: number }
 *   ```
 *
 * ## Props
 * - `data: T[]` — Required dataset to render. Each object must match your generic type.
 * - `xAxisProps: { dataKey: keyof T; angle: number } & Partial<Omit<XAxisProps, 'dataKey' | 'angle'>>`
 *     - Controls how the x-axis is rendered.
 *     - `dataKey` must be a valid key of your data object.
 *     - `angle` is required to define label tilt.
 * - `barProps: BarProps & { dataKey: keyof T }`
 *     - Props forwarded to the `<Bar>` component, including which value to visualize.
 * - `toolTipProps?: TooltipProps<string, string>` — Optional tooltip customization.
 * - `yAxisProps?: YAxisProps` — Props forwarded to `<YAxis>`.
 * - `height?: number` — Chart height in pixels (default: 400).
 * - `width?: string` — Chart width (default: "100%").
 *
 * ### Color Modes (mutually exclusive)
 * - `colors?: string[]` — Array of bar colors (one per data point).
 * - `uniformColor?: string` — Single color for all bars.
 * - **If neither is provided**, a high-contrast palette will be generated automatically.
 *
 * ## Example
 * ```tsx
 * type GameData = { name: string; rating: number };
 *
 * <BarChartComponent<GameData>
 *   height={300}
 *   width="100%"
 *   data={[
 *     { name: "RPG", rating: 45 },
 *     { name: "FPS", rating: 30 },
 *   ]}
 *   xAxisProps={{
 *     dataKey: "name",
 *     angle: -15,
 *     interval: 0,
 *     tick: { fill: "#c9d1d9" }
 *   }}
 *   toolTipProps={{
 *     contentStyle: {
 *       backgroundColor: "black",
 *       border: "none",
 *       color: "white"
 *     }
 *   }}
 *   barProps={{
 *     dataKey: "rating",
 *     barSize: 40,
 *     radius: [4, 4, 0, 0]
 *   }}
 * />
 * ```
 */


export function BarChartComponent<T extends object>(props: BarChartProps<T>) {
    const {
        height,
        data,
        toolTipProps,
        colors,
        uniformColor,
        width,
        xAxisProps,
        barProps,
        yAxisProps
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
        <ResponsiveContainer width={width || "100%"} height={height || "100%"}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }} >
                <CartesianGrid stroke="#30363d" />
                <XAxis width={"100%"} tickMargin={10} tick={renderMultilineTick} {...xAxisProps} />
                <YAxis tick={{ fill: '#c9d1d9' }}  {...yAxisProps} />
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
