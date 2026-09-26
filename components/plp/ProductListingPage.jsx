'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CollectionHeader from '@components/plp/CollectionHeader';
import FilterBar from '@components/plp/FilterBar';
import ProductGrid from '@components/plp/ProductGrid';
import MobileFilterDrawer from '@components/plp/MobileFilterDrawer';

export default function ProductListingPage({ meta, initialProducts }) {
  const [showFilters, setShowFilters] = useState(true);
  const [sortOption, setSortOption] = useState('featured');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Multi-facet filter state
  const [filters, setFilters] = useState({
    category: [],
    material: [],
    collection: [],
    colour: [],
    price: [],
  });

  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0) || sortOption !== 'featured';

  const handleFilterChange = (sectionId, valueId) => {
    setFilters((prev) => {
      const current = prev[sectionId] || [];
      const exists = current.includes(valueId);
      const updated = exists
        ? current.filter((v) => v !== valueId)
        : [...current, valueId];

      return {
        ...prev,
        [sectionId]: updated,
      };
    });
  };

  const handleReset = () => {
    setFilters({
      category: [],
      material: [],
      collection: [],
      colour: [],
      price: [],
    });
    setSortOption('featured');
  };

  // Filter and sort catalog products
  const processedProducts = useMemo(() => {
    let result = [...initialProducts];

    // 1. Category Filter
    if (filters.category.length > 0) {
      result = result.filter((p) => {
        if (filters.category.includes(p.category)) return true;
        if (filters.category.includes('carry-on') && (p.category === 'carry-on' || p.category === 'cabin')) return true;
        if (filters.category.includes('trunks') && (p.category === 'trunks' || p.category === 'luggage')) return true;
        return false;
      });
    }

    // 2. Material Filter
    if (filters.material.length > 0) {
      result = result.filter((p) => filters.material.includes(p.materialType));
    }

    // 3. Collection Filter
    if (filters.collection.length > 0) {
      result = result.filter((p) => filters.collection.includes(p.collection));
    }

    // 4. Colour Filter
    if (filters.colour.length > 0) {
      result = result.filter((p) =>
        p.colors && p.colors.some((c) => filters.colour.includes(c))
      );
    }

    // 5. Price Range Filter
    if (filters.price.length > 0) {
      result = result.filter((p) => {
        return filters.price.some((rangeKey) => {
          if (rangeKey === 'under-50k') return p.rawPrice < 50000;
          if (rangeKey === '50k-100k') return p.rawPrice >= 50000 && p.rawPrice <= 100000;
          if (rangeKey === '100k-150k') return p.rawPrice > 100000 && p.rawPrice <= 150000;
          if (rangeKey === 'over-150k') return p.rawPrice > 150000;
          return true;
        });
      });
    }

    // 6. Sorting
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.rawPrice - b.rawPrice);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.rawPrice - a.rawPrice);
    } else if (sortOption === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [initialProducts, filters, sortOption]);

  return (
    <div className="w-full bg-white text-[#161616] min-h-screen">
      {/* 01. Minimal TUMI-style Collection Header */}
      <CollectionHeader
        meta={meta}
        totalCount={processedProducts.length}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        sortOption={sortOption}
        onSortChange={setSortOption}
        onOpenMobileFilters={() => setMobileDrawerOpen(true)}
      />

      {/* 02. Main Browsing Canvas (Sidebar + 3-Column / 4-Column Grid) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="flex gap-8 lg:gap-12 items-start">
          
          {/* Desktop Filter Sidebar (Collapsible) */}
          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block overflow-hidden sticky top-28"
              >
                <FilterBar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleReset}
                  hasActiveFilters={hasActiveFilters}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid Stage */}
          <main className="flex-1 w-full min-w-0">
            <ProductGrid
              products={processedProducts}
              showFilters={showFilters}
              onReset={handleReset}
            />
          </main>

        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        totalCount={processedProducts.length}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}
