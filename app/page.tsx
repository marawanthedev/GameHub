// app/page.tsx

import { HomepageSkeleton } from "./types/contentful"
import { contenfulClient } from './lib/contentful';

export default async function Home() {
  const { items } = await contenfulClient.getEntries<HomepageSkeleton>({
    content_type: 'homepage',
    // locale: 'en'
  });

  console.log(items)

  const data = items[0].fields;

  return (
    <main className="min-h-screen bg-[#0d1117] text-white font-sans px-4 pt-16 pb-20">
      <section className="max-w-7xl mx-auto text-center py-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">{data.heroTitle}</h1>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">{data.description}</p>
        <a
          href={data.ctaLink}
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          {data.ctaLabel}
        </a>
      </section>
    </main>
  );
}
