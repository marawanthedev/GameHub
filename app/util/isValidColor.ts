import chroma from 'chroma-js';

export default function isValidColor(color: string): boolean {
    try {
        chroma(color); // will throw if invalid
        return true;
    } catch {
        return false;
    }
}
