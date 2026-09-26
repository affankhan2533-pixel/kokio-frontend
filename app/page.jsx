import SmoothScrollProvider from '@providers/SmoothScrollProvider';
import Header from '@components/navigation/Header';
import HeroCampaign from '@components/home/HeroCampaign';
import TrustStrip from '@components/home/TrustStrip';
import ShopByCategory from '@components/home/ShopByCategory';
import FeaturedProducts from '@components/home/FeaturedProducts';
import CampaignBanner from '@components/home/CampaignBanner';
import NewArrivals from '@components/home/NewArrivals';
import BrandEditorial from '@components/home/BrandEditorial';
import ExploreStrip from '@components/home/ExploreStrip';
import MinimalLuxuryFooter from '@components/common/MinimalLuxuryFooter';

export const metadata = {
  title: 'KOKIO | Les Voyages de l\'Esprit • Premium Luxury Travel & Luggage',
  description: 'Experience aerospace-grade aluminum trunks, Tuscan vachetta leather goods, and metrology craftsmanship.',
};

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#F8F6F2] text-[#161616] flex flex-col font-sans selection:bg-[#B8892D]/30 selection:text-[#161616]">
        
        {/* 01-03. Integrated Header (Includes AnnouncementBar, Navigation, MegaMenu, MobileMenu) */}
        <Header />

        {/* Commerce Homepage Flow */}
        <main className="flex-1 w-full overflow-hidden">
          {/* 04. Hero Campaign with Cinematic Video */}
          <HeroCampaign />

          {/* 05. Service / Trust Strip */}
          <TrustStrip />

          {/* 06. Shop by Category */}
          <ShopByCategory />

          {/* 07. Featured / Bestselling Products */}
          <FeaturedProducts />

          {/* 08. Large Campaign Banner */}
          <CampaignBanner />

          {/* 09. New Arrivals */}
          <NewArrivals />

          {/* 10. Concise Brand Editorial */}
          <BrandEditorial />

          {/* 11. Collection Explore Strip */}
          <ExploreStrip />
        </main>

        {/* 12. Minimal Luxury Footer (With Integrated Voyager Club Newsletter) */}
        <MinimalLuxuryFooter />

      </div>
    </SmoothScrollProvider>
  );
}
