import chroma from 'chroma-js';

export function generateHighContrastColors(count: number): string[] {
    const colors: string[] = [];

    const chromaBase = 55;
    const luminanceBase = 70;
    const chromaVar = 15;
    const luminanceVar = 10;

    for (let i = 0; i < count; i++) {
        const hue = (360 / count) * i;
        const chromaVal = chromaBase + chromaVar * Math.sin((i / count) * Math.PI * 2);
        const luminanceVal = luminanceBase + luminanceVar * Math.cos((i / count) * Math.PI * 2);

        const color = chroma.hcl(hue, chromaVal, luminanceVal);

        colors.push(color.clipped() ? chroma.hcl(hue, 40, 60).hex() : color.hex());
    }

    return colors;
}
