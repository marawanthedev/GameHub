/* eslint-disable @typescript-eslint/no-explicit-any */
export function transformSheetData(data: unknown[][]): { [key: string]: any }[] {
    if (!Array.isArray(data) || data.length < 2) return [];

    const [headers, ...rows] = data as [string[], ...unknown[][]];

    return rows.map(row =>
        (headers as string[]).reduce((acc, header, i) => {
            acc[header] = row[i];
            return acc;
        }, {} as { [key: string]: any })
    );
}
