'use client';

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
    error,
    params,
}: {
    error: Error & { digest?: string };
    params: { locale: string };
}) {
    useEffect(() => {
        Sentry.captureException(error, {
            tags: { locale: params.locale },
        });
    }, [error, params.locale]);

    return (
        <html lang={params.locale}>
            <body>
                <NextError statusCode={0} />
            </body>
        </html>
    );
}
