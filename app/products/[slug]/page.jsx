import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@components/navigation/Header';
import MinimalLuxuryFooter from '@components/common/MinimalLuxuryFooter';
import ProductGallery from '@components/pdp/ProductGallery';
import ProductClientActions from '@components/pdp/ProductClientActions';
import ProductAccordion from '@components/pdp/ProductAccordion';
import ProductIntelligence from '@components/pdp/ProductIntelligence';
import MonogramPreview from '@components/pdp/MonogramPreview';
import RelatedProducts from '@components/pdp/RelatedProducts';
import { PRODUCTS_CATALOG } from '@lib/catalogData';

export function generateStaticParams() {
  return PRODUCTS_CATALOG.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const product = PRODUCTS_CATALOG.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return { title: 'Product Not Found | KOKIO' };
  }

  return {
    title: `KOKIO | ${product.name} • ${product.categoryLabel}`,
    description: product.story,
    openGraph: {
      title: product.name,
      description: product.story,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const product = PRODUCTS_CATALOG.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#161616] flex flex-col font-sans selection:bg-[#B8892D]/30 selection:text-[#161616]">
      {/* Integrated Header */}
      <Header />

      <main className="flex-1 w-full pt-28 pb-28 sm:pb-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-sans tracking-widest text-[#777777] uppercase">
            <Link href="/" className="hover:text-[#B8892D] transition-colors">HOME</Link>
            <span>/</span>
            <Link href={`/collections/${product.category}`} className="hover:text-[#B8892D] transition-colors">{product.categoryLabel}</Link>
            <span>/</span>
            <span className="text-[#161616] font-semibold truncate max-w-[200px]">{product.name}</span>
          </nav>

          {/* 2-Column Desktop / Responsive Mobile PDP Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-7">
              <ProductGallery product={product} />
            </div>

            {/* Right Column: Commerce Purchase Panel */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Product Info Header */}
              <div className="space-y-2 border-b border-black/8 pb-6">
                <span className="text-xs font-sans tracking-[0.3em] font-semibold text-[#B8892D] uppercase block">
                  {product.tag || product.categoryLabel}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#161616] leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
                  {product.specs}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-sans text-2xl sm:text-3xl font-semibold text-[#161616]">
                    {product.price}
                  </span>
                  <span className="text-[10px] font-sans text-[#B8892D] tracking-widest uppercase font-bold px-2.5 py-1 bg-[#B8892D]/10 rounded-md border border-[#B8892D]/30">
                    IN STOCK • READY FOR TRANSIT
                  </span>
                </div>
              </div>

              {/* Interactive Variant Selection, Quantity & Add To Bag */}
              <ProductClientActions product={product} />

              {/* Bespoke Monogramming Preview (if supported) */}
              <MonogramPreview product={product} />

              {/* Editorial Accordion Information Stack */}
              <ProductAccordion product={product} />

              {/* Product Intelligence — The Piece at a Glance */}
              <ProductIntelligence product={product} />
            </div>

          </div>

        </div>

        {/* You May Also Explore Cross-Sells */}
        <div className="mt-16">
          <RelatedProducts currentProductId={product.id} products={PRODUCTS_CATALOG} />
        </div>
      </main>

      {/* Footer */}
      <MinimalLuxuryFooter />
    </div>
  );
}
