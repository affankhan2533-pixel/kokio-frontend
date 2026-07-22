import SmoothScrollProvider from '@providers/SmoothScrollProvider';
import Header from '@components/navigation/Header';
import HeroVideoSection from '@sections/hero/HeroVideoSection';
import ManifestoSection from '@sections/manifesto/ManifestoSection';
import HorizontalStorySection from '@sections/horizontal/HorizontalStorySection';
import FullWidthCampaign from '@sections/editorial/FullWidthCampaign';
import InteractiveProductExp from '@sections/interactive/InteractiveProductExp';
import CraftsmanshipTimeline from '@sections/craftsmanship/CraftsmanshipTimeline';
import MaterialsShowcase from '@sections/materials/MaterialsShowcase';
import TravelLifestyleGallery from '@sections/gallery/TravelLifestyleGallery';
import AsymmetricCollections from '@sections/featured/AsymmetricCollections';
import BestSellersEditorial from '@sections/bestsellers/BestSellersEditorial';
import CustomerStories from '@sections/testimonials/CustomerStories';
import EditorialJournal from '@sections/journal/EditorialJournal';
import BespokeNewsletter from '@sections/newsletter/BespokeNewsletter';
import MinimalLuxuryFooter from '@components/common/MinimalLuxuryFooter';

export const metadata = {
  title: 'KOKIO | Les Voyages de l\'Esprit • Luxury Travel & Luggage',
  description: 'A cinematic editorial exploration of aerospace-grade aluminum luggage, bespoke Italian vachetta leather goods, and metrology craftsmanship.',
};

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#F8F6F2] text-neutral-950 flex flex-col font-sans selection:bg-amber-500/30 selection:text-neutral-950">
        
        {/* Integrated Luxury Header Navbar */}
        <Header />

        {/* 14-Step Information Architecture Narrative Flow */}
        <main className="flex-1 w-full overflow-hidden">
          {/* 1. Fullscreen Cinematic Hero with Audio Toggle */}
          <HeroVideoSection />

          {/* 2. Editorial Manifesto Section */}
          <ManifestoSection />

          {/* 3. Horizontal Storytelling Section (The 100,000 Mile Journey) */}
          <HorizontalStorySection />

          {/* 4. Full-Width Campaign Photography (Iceland Expedition) */}
          <FullWidthCampaign />

          {/* 5. Interactive 3D Product Experience */}
          <InteractiveProductExp />

          {/* 6. Craftsmanship Timeline */}
          <CraftsmanshipTimeline />

          {/* 7. Materials & Metrology Showcase */}
          <MaterialsShowcase />

          {/* 8. Travel Lifestyle Asymmetric Masonry Gallery */}
          <TravelLifestyleGallery />

          {/* 9. Featured Collections with Asymmetric Magazine Layouts */}
          <AsymmetricCollections />

          {/* 10. Voyager Best Sellers */}
          <BestSellersEditorial />

          {/* 11. Customer Stories & Testimonials */}
          <CustomerStories />

          {/* 12. Editorial Journal */}
          <EditorialJournal />

          {/* 13. Bespoke Voyager Club Newsletter */}
          <BespokeNewsletter />
        </main>

        {/* 14. Minimal Luxury Footer */}
        <MinimalLuxuryFooter />

      </div>
    </SmoothScrollProvider>
  );
}
