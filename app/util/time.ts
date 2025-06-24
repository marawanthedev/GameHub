export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export const getTimeOfDay = (): TimeOfDay => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
        return 'morning';
    } else if (hours >= 12 && hours < 17) {
        return 'afternoon';
    } else if (hours >= 17 && hours < 21) {
        return 'evening';
    } else {
        return 'night';
    }
};
