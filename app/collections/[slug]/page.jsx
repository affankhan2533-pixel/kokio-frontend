import { notFound } from 'next/navigation';
import Header from '@components/navigation/Header';
import MinimalLuxuryFooter from '@components/common/MinimalLuxuryFooter';
import ProductListingPage from '@components/plp/ProductListingPage';
import { PRODUCTS_CATALOG, CATEGORY_METADATA } from '@lib/catalogData';

export function generateStaticParams() {
  return Object.keys(CATEGORY_METADATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || 'all';
  const meta = CATEGORY_METADATA[slug];

  if (!meta) {
    return { title: 'Collection Not Found | KOKIO' };
  }

  return {
    title: `KOKIO | ${meta.title} • Premium Luggage & Travel Gear`,
    description: meta.subtitle,
  };
}

export default async function CollectionPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || 'all';
  const meta = CATEGORY_METADATA[slug];

  if (!meta) {
    notFound();
  }

  // Filter products by category or collection slug
  const initialProducts = slug === 'all'
    ? PRODUCTS_CATALOG
    : PRODUCTS_CATALOG.filter((p) => {
        return (
          p.category === slug ||
          p.collection === slug ||
          (slug === 'luggage' && (p.category === 'carry-on' || p.category === 'trunks' || p.category === 'luggage')) ||
          (slug === 'bags' && (p.category === 'bags' || p.category === 'duffels')) ||
          (slug === 'carry-on' && p.category === 'carry-on')
        );
      });

  return (
    <div className="min-h-screen bg-white text-[#161616] flex flex-col font-sans selection:bg-[#B8892D]/30 selection:text-[#161616]">
      <Header />
      <div className="flex-1 w-full bg-white">
        <ProductListingPage meta={meta} initialProducts={initialProducts} />
      </div>
      <MinimalLuxuryFooter />
    </div>
  );
}
