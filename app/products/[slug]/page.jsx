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

  const collectionSlug = product.collection || product.category;
  const collectionName = product.collectionLabel || product.categoryLabel;

  return (
    <div className="min-h-screen bg-white text-[#161616] flex flex-col font-sans selection:bg-[#B8892D]/30 selection:text-[#161616]">
      {/* Header */}
      <Header />

      <main className="flex-1 w-full pt-24 sm:pt-28 pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6 sm:space-y-8 animate-fade-in">
          
          {/* Breadcrumb Navigation (Restrained, Muted, Clean) */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-[11px] font-sans text-[#777777]">
            <Link href="/" className="hover:text-[#161616] transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/collections/all" className="hover:text-[#161616] transition-colors">COLLECTIONS</Link>
            <span>/</span>
            <Link href={`/collections/${collectionSlug}`} className="hover:text-[#161616] transition-colors uppercase">
              {collectionName}
            </Link>
            <span>/</span>
            <span className="text-[#161616] font-medium truncate max-w-[240px]">{product.name}</span>
          </nav>

          {/* Main PDP Layout: ~60% Left Visual Gallery / ~40% Right Product Information */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Column: Product Gallery (~60%) */}
            <div className="lg:col-span-7">
              <ProductGallery product={product} />
            </div>

            {/* Right Column: Product Information (~40%, sits directly on white page) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Product Info Header */}
              <div className="space-y-2">
                {/* 1. COLLECTION */}
                <span className="text-[10px] font-sans tracking-[0.14em] uppercase text-[#777777] font-medium block">
                  {collectionName}
                </span>

                {/* 2. Product Name (Cormorant Garamond 42–50px max desktop, 30–36px mobile) */}
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-light text-[#161616] leading-tight tracking-tight">
                  {product.name}
                </h1>

                {/* 3. One-line verified descriptor */}
                <p className="text-xs text-[#555555] font-light leading-relaxed pt-0.5">
                  {product.story || product.specs}
                </p>

                {/* 4. Price (Plus Jakarta Sans, clear but understated) */}
                <div className="pt-1 font-sans text-xl sm:text-2xl font-medium text-[#161616]">
                  {product.price}
                </div>
              </div>

              {/* Thin Hairline Divider */}
              <div className="border-b border-[#EAEAEA] pt-1" />

              {/* 5-8. Variant Selection, Quantity, ADD TO BAG & Wishlist */}
              <ProductClientActions product={product} />

              {/* 9. Product Details Accordion */}
              <ProductAccordion product={product} />

              {/* 10. Product Intelligence — The Piece at a Glance */}
              <ProductIntelligence product={product} />

              {/* 11. Monogramming Preview (if supported) */}
              <MonogramPreview product={product} />
            </div>

          </div>

        </div>

        {/* You May Also Explore Cross-Sells (Exact PLP Product Cards on White Canvas) */}
        <div className="mt-8 sm:mt-12">
          <RelatedProducts currentProductId={product.id} products={PRODUCTS_CATALOG} />
        </div>
      </main>

      {/* Footer */}
      <MinimalLuxuryFooter />
    </div>
  );
}
