'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, PieProps, TooltipProps } from 'recharts';
import { generateHighContrastColors } from '@/app/util/generateHighContrastColors';
import isValidColor from '@/app/util/isValidColor';

type PieChartFixedColors = {
    colors: string[],
}

type PieChartGeneratedColors = {
    colors?: never,
}

export type PieChartProps = {
    height?: number,
    width?: string,
    biggestPieColor?: string,
    smallestPieColor?: string,
    pieProps: PieProps & { data: { name: string, value: number }[] },
    toolTipProps?: TooltipProps<string, string>,
} & (PieChartFixedColors | PieChartGeneratedColors)


/**
 * PieChartComponent
 *
 * A reusable and customizable pie chart component built with Recharts.
 * It supports both manually defined colors and auto-generated high-contrast palettes,
 * and optionally allows highlighting the largest and/or smallest slices with specific colors.
 *
 * ## Features
 * - Uses `ResponsiveContainer` for responsive layout.
 * - Accepts either a `colors` array or a `baseColor` to generate distinct slice colors.
 * - Allows optional override of the biggest and smallest slice colors via `biggestPieColor` and `smallestPieColor`.
 * - Displays tooltips with customizable styling via `toolTipProps`.
 * - verifies that biggest slice / smallest slice color is an actual color and throws an error if it is not
 * - if colors explicity passed, it verifies that number of colors is equal to data entires otherwise it throws an error
 *
 * ## Props
*  - `height?: number` — Container height
 * - `width?: string` — Container width
 * - `pieProps: PieProps` — Recharts Pie props, must include `data: { name: string; value: number }[]`.
 * - `toolTipProps: TooltipProps` — Props passed directly to the Recharts `<Tooltip>` component.
 * - `colors?: string[]` — Fixed color set to use for slices. Mutually exclusive with `baseColor`.
 * - `baseColor?: string` — A single base color used to generate a distinct palette.
 * - `biggestPieColor?: string` — If provided, overrides the color of the slice with the highest value.
 * - `smallestPieColor?: string` — If provided, overrides the color of the slice with the lowest value.
 *
 * ## Performance Note
 * When `biggestPieColor` or `smallestPieColor` is used,
 * the component performs a full loop through `pieProps.data` to determine the max and min values.
 * While this has negligible impact on small datasets, it may introduce minor performance costs with large datasets.
 *
 * ## Example Usage:
 * ```tsx
 * <PieChartComponent
 *   height="400px"
 *   baseColor="#3b82f6"
 *   biggestPieColor="#ef4444"
 *   smallestPieColor="#6b7280"
 *   pieProps={{ data: [{ name: "RPG", value: 30 }, { name: "FPS", value: 20 }] }}
 *   toolTipProps={{
 *     contentStyle: {
 *       backgroundColor: 'black',
 *       border: 'none',
 *       color: 'white',
 *     },
 *   }}
 * />
 * ```
 */

export const PieChartComponent = (props: PieChartProps) => {
    const { pieProps, toolTipProps, colors, biggestPieColor, smallestPieColor, height, width } = props;


    if (colors && (colors?.length < pieProps.data.length)) throw new Error('Number of colors passed is less than data entries')

    const pieColors: string[] = colors
        ? [...colors]
        : generateHighContrastColors(pieProps.data.length);

    // probably should be validating colors array if passed, but probably will have performance implication, will think about it later, just wanted to point out that i know it exists

    if (biggestPieColor || smallestPieColor) {

        if (biggestPieColor && !isValidColor(biggestPieColor)) throw new Error('Biggest Pie Color is not a valid color')
        if (smallestPieColor && !isValidColor(smallestPieColor)) throw new Error('Smallest Pie Color is not a valid color')


        let minIndex = 0;
        let maxIndex = 0;

        pieProps.data.forEach((d, i) => {
            if (d.value < pieProps.data[minIndex].value) minIndex = i;
            if (d.value > pieProps.data[maxIndex].value) maxIndex = i;
        });

        if (biggestPieColor) pieColors[maxIndex] = biggestPieColor;
        if (smallestPieColor) pieColors[minIndex] = smallestPieColor;
    }


    return (
        <ResponsiveContainer width={width || "100%"} height={height || 400}>
            <PieChart>
                <Pie
                    dataKey="value"
                    nameKey="name"
                    outerRadius={150}
                    fill="#8884d8"
                    label={{ fill: '#c9d1d9' }}
                    {...pieProps}
                >
                    {pieProps.data.map((_, index: number) => (
                        <Cell key={index} fill={pieColors[index]} />
                    ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'black', border: 'none', color: 'white' }}  {...toolTipProps} />
            </PieChart>
        </ResponsiveContainer>
    );
}
