'use client';

import { useEffect, useState } from 'react';

export const ConsentBanner = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('gtm_consent');
        if (!consent) setShowBanner(true);
    }, []);

    const handleAccept = () => {
        localStorage.setItem('gtm_consent', 'granted');
        window.location.reload();
    };

    const handleDecline = () => {
        localStorage.setItem('gtm_consent', 'denied');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 flex justify-between items-center z-50">
            <p className="text-sm">We use cookies for analytics. Do you accept?</p>
            <div className="space-x-2">
                <button onClick={handleAccept} className="bg-blue-600 px-3 py-1 rounded">Accept</button>
                <button onClick={handleDecline} className="bg-gray-600 px-3 py-1 rounded">Decline</button>
            </div>
        </div>
    );
};
