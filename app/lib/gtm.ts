import { getTimeOfDay, TimeOfDay } from "./time";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
export const pageview = (url: string) => {
    window.dataLayer?.push({
        event: 'pageview',
        page: url,
    });
};

export const GTM_EVENTS = {
    GAME_VIEWED: 'game_viewed',
    ADD_TO_CART: 'add_to_cart',
    CHECKOUT_STARTED: 'checkout_started',
    LOGIN_ATTEMPT: 'login_attempt',
    LOGIN_SUCCESS: 'login_success',
    LOGIN_FAILURE: 'login_failure',
    SIGNUP_ATTEMPT: 'signup_attempt',
    SIGNUP_SUCCESS: 'signup_success',
    SIGNUP_FAILURE: 'signup_failure',
} as const;

export const GTM_EVENTS_CATEGORIES = {
    ENGAGEMENT: 'engagement',
    ECOMMERCE: 'ecommerce',
    AUTHENTICATION: 'authentication',
    USER_ACTIONS: 'user_actions',
    NAVIGATION: 'navigation',
    ERROR: 'error',
} as const;

export type GTMEvent = (typeof GTM_EVENTS)[keyof typeof GTM_EVENTS];
export type GTMCategory = (typeof GTM_EVENTS_CATEGORIES)[keyof typeof GTM_EVENTS_CATEGORIES];

export const trackEvent = ({
    event,
    category,
    label,
    value,
    productName,
}: {
    event: GTMEvent;
    category: GTMCategory;
    label?: string;
    value?: number;
    productName?: string;
}) => {
    window.dataLayer?.push({
        event,
        value,
        event_category: category,
        event_label: label,
        product_name: productName,
        timeOfDay: getTimeOfDay()
    });
};
