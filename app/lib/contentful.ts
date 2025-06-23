import { createClient } from 'contentful';

export const contenfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});
