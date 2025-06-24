'use client';

import { ReactNode } from 'react';
import ErrorBoundaryWrapper from '@/app/components/ErrorBoundaryWrapper';

export default function TrendsLayout({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundaryWrapper>
            {children}
        </ErrorBoundaryWrapper>
    );
}
