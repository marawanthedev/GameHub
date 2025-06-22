import type { Metadata } from 'next'
import rawg from '@/app/lib/rawg'

type Props = {
    children: React.ReactNode
    params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { data } = await rawg.get(`/games/${params.id}`)

    return {
        title: `${data.name} - GameHub`,
        description: data.description_raw?.slice(0, 160),
        openGraph: {
            title: `${data.name} - GameHub`,
            images: [{ url: data.background_image }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.name} - GameHub`,
            images: [data.background_image],
        },
    }
}

export default function GameDetailLayout({ children }: Props) {
    return <>{children}</>
}
