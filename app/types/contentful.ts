import { Entry, EntrySkeletonType } from 'contentful';

export interface HomepageFields {
    description: string;
    heroTitle: string;
    ctaLabel: string;
    ctaLink: string;
}

export type HomepageSkeleton = EntrySkeletonType<HomepageFields, 'homepage'>;
export type HomepageEntry = Entry<HomepageSkeleton>;
