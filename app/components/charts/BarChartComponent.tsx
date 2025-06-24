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

// Mutually exclusive types
type BarChartFixedColors = {
    colors: string[];
    uniformColor?: never;
};

type RequiredXAxisProps = {
    dataKey: string;
    angle: number;
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
    yAxisProps?: YAxisProps,
    barProps: BarProps,
    toolTipProps?: TooltipProps<string, string>;
} & (BarChartFixedColors | BarChartUniformColor);

/**
 * BarChartComponent
 *
 * A flexible and accessible bar chart built with Recharts. It supports both uniform and per-bar coloring, customizable axes, and tooltips.
 *
 * ## Features
 * - **Responsive layout** using `<ResponsiveContainer>`
 * - **High-contrast color generation** when no color props are provided
 * - **Mutually exclusive coloring modes**: either `colors[]` (per-bar) or `uniformColor` (same color for all bars)
 * - **Customizable X-axis** with enforced readability settings
 * - **Tooltip customization** via `toolTipProps`
 *
 * ## Props
 * - `height?: number` — Height of the chart container in pixels (default: 400)
 * - `width?: string` — Width of the chart container (default: "100%")
 * - `data: { name: string; rating: number }[]` — Required dataset to display; each object must include `name` and `rating`
 * - `xAxisProps: CustomXAxisProps` — Required props for the `<XAxis>`. Must include:
 *   - `dataKey`: string (required)
 *   - `angle`: number (required)
 *   - All other XAxisProps are optional and allowed
 * - `barProps: BarProps` — Props forwarded to the `<Bar>` element
 * - `toolTipProps?: TooltipProps<string, string>` — Optional tooltip customization
 * - `yAxisProps?: YAxisProps` — Forwarded to `<YAxisProps> element`
 *
 * ### Color Modes (mutually exclusive)
 * - `colors?: string[]` — A fixed array of colors, one per bar. Must match or exceed the length of `data`
 * - `uniformColor?: string` — A single color to be used for all bars. Cannot be used with `colors`
 * - **If neither `colors` nor `uniformColor` is provided, a high-contrast color palette will be auto-generated**
 *
 * ## Example
 * ```tsx
 * <BarChartComponent
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
 *     barSize: 40,
 *     radius: [4, 4, 0, 0]
 *   }}
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
