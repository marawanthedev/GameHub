'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, PieProps, TooltipProps } from 'recharts';
import { generateHighContrastColors } from '@/app/util/generateHighContrastColors';
import isValidColor from '@/app/util/isValidColor';
import { NumericKey } from "../../types/util"

type PieChartFixedColors = {
    colors: string[],
}

type PieChartGeneratedColors = {
    colors?: never,
}

export type PieChartProps<T extends object> = {
    height?: number,
    width?: string,
    biggestPieColor?: string,
    smallestPieColor?: string,
    pieProps: PieProps & { data: T[]; dataKey: NumericKey<T>; nameKey?: keyof T },
    toolTipProps?: TooltipProps<string, string>,
} & (PieChartFixedColors | PieChartGeneratedColors);


/**
 * PieChartComponent
 *
 * A reusable and customizable pie chart component built with Recharts.
 * It supports both manually defined colors and auto-generated high-contrast palettes,
 * and optionally allows highlighting the largest and/or smallest slices with specific colors.
 *
 * ## Features
 * - 📐 Uses `ResponsiveContainer` for responsive layout
 * - 🎨 Accepts either a `colors` array or generates high-contrast colors automatically
 * - 🔺 Supports custom highlight colors for biggest/smallest slices
 * - 💬 Displays tooltips with customizable styling via `toolTipProps`
 * - 🔒 **Strongly typed**: ensures `dataKey` points to a `number` field of your data
 * - ❌ Throws runtime errors for invalid color values or data binding issues
 *
 * ## Props
 * - `height?: number` — Container height (default: 400)
 * - `width?: string` — Container width (default: `"100%"`)
 * - `pieProps: PieProps & { data: T[]; dataKey: NumericKey<T>; nameKey?: keyof T }`  
 *   - `data`: Dataset to visualize  
 *   - `dataKey`: Must be a key of `T` whose value is a `number`  
 *   - `nameKey`: Optional key of `T` to use as the name label for the pie slices
 * - `toolTipProps?: TooltipProps<string, string>` — Optional tooltip customization
 * - `colors?: string[]` — Optional array of per-slice colors (must match or exceed data length)
 * - `biggestPieColor?: string` — Optional color override for the largest slice
 * - `smallestPieColor?: string` — Optional color override for the smallest slice
 *
 * ## Type Safety
 * - ✅ `dataKey` **must refer to a numeric property** on the type `T`
 * - If not, TypeScript will throw a helpful type error:
 *   ```
 *   Type '"name"' is not assignable to type "❌ Error: 'dataKey' must refer to a property of type number"
 *   ```
 *
 * ## Example Usage:
 * ```tsx
 * type GenreData = { genre: string; value: number };
 *
 * <PieChartComponent<GenreData>
 *   height={400}
 *   pieProps={{
 *     data: [
 *       { genre: 'RPG', value: 30 },
 *       { genre: 'FPS', value: 20 },
 *     ],
 *     dataKey: 'value',
 *     nameKey: 'genre'
 *   }}
 *   biggestPieColor="#ef4444"
 *   smallestPieColor="#6b7280"
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


export const PieChartComponent = <T extends object>(props: PieChartProps<T>) => {
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
        <ResponsiveContainer width={width || '100%'} height={height || 400}>
            <PieChart>
                <Pie
                    nameKey={pieProps.nameKey as string}
                    outerRadius={150}
                    fill="#8884d8"
                    label={{ fill: '#c9d1d9' }}
                    {...pieProps}
                >
                    {pieProps.data.map((_, index: number) => (
                        <Cell key={index} fill={pieColors[index]} />
                    ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'black', border: 'none', color: 'white' }} {...toolTipProps} />
            </PieChart>
        </ResponsiveContainer>
    );
}
