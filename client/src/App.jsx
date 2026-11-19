import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ShowcaseSection, { MODELS } from './components/Showcase3D/ShowcaseSection';
import AboutSection from './components/AboutSection';
import MdMessageSection from './components/MdMessageSection';
import ProductsCatalogSection from './components/ProductsCatalogSection';
import ClientsSection from './components/ClientsSection';
import PartnersSection from './components/PartnersSection';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import { initGA, logPageView } from './analytics';

export default function App() {
  const [quoteModalState, setQuoteModalState] = useState({
    isOpen: false,
    itemName: '',
    category: ''
  });

  useEffect(() => {
    initGA();
    logPageView(window.location.pathname);
  }, []);

  const openQuoteModal = (itemName, category) => {
    setQuoteModalState({
      isOpen: true,
      itemName,
      category
    });
  };

  const closeQuoteModal = () => {
    setQuoteModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // Structured Data Schema for Local Business + Products
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Jahid Office Equipment (JOE)',
    legalName: 'Jahid Office Equipment',
    foundingDate: '1990',
    telephone: ['+8801713093300', '+8801922117201'],
    url: 'https://www.jahidoffice.com',
    description:
      'Official distributor of Toshiba Photocopiers, Office Automation, Genuine Spare Parts, Toner, and High-Speed Scanning Solutions in Bangladesh since 1990.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Motijheel / Paltan Commercial Area',
      addressLocality: 'Dhaka',
      postalCode: '1000',
      addressCountry: 'BD'
    },
    currenciesAccepted: 'BDT',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, Cheque',
    priceRange: '৳4,200 - ৳795,000',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Toshiba Office Copiers and Spare Parts',
      itemListElement: MODELS.map((m) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: m.fullName,
          description: `${m.speed} Monochrome A3 Multifunction Photocopier with e-BRIDGE Next controller.`,
          image: `https://www.jahidoffice.com/images/machine-full-configured.png`,
          brand: {
            '@type': 'Brand',
            name: 'Toshiba'
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'BDT',
            price: m.priceNum,
            availability: 'https://schema.org/InStock'
          }
        }
      }))
    }
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#0066CC] selection:text-white">
        <Helmet>
          <title>JAHID OFFICE EQUIPMENT (JOE) | Toshiba Photocopiers &amp; Spare Parts</title>
          <meta
            name="description"
            content="Official distributor of Toshiba Photocopiers, Office Automation, Spare Parts, Toner, and High-Speed Scanning Solutions in Bangladesh since 1990."
          />
          <meta
            name="keywords"
            content="Toshiba photocopier Bangladesh, photocopier price in Bangladesh, e-STUDIO2528A, e-STUDIO3028A, e-STUDIO6528A, Jahid Office Equipment, JOE, photocopy spare parts, toner cartridge BDT"
          />
          {/* OpenGraph */}
          <meta property="og:title" content="JAHID OFFICE EQUIPMENT (JOE) | Toshiba Photocopiers" />
          <meta
            property="og:description"
            content="Interactive 3D Exploded-View Photocopier Showcase &amp; Genuine Spare Parts with Instant BDT Quotations."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.jahidoffice.com" />
          <meta property="og:image" content="https://www.jahidoffice.com/images/machine-full-configured.png" />
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="JAHID OFFICE EQUIPMENT (JOE) - Toshiba 3D Showcase" />
          <meta
            name="twitter:description"
            content="Explore Toshiba e-STUDIO photocopiers and modular spare parts in real-time 3D exploded view."
          />
          {/* JSON-LD Structured Data */}
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>

        {/* Global Navigation Header */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-grow">
          <HeroSection />
          <ShowcaseSection />
          <AboutSection />
          <MdMessageSection />
          <ProductsCatalogSection onOpenQuote={openQuoteModal} />
          <ClientsSection />
          <PartnersSection />
          <ServicesSection />
          <GallerySection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* General Quote Modal */}
        <QuoteModal
          isOpen={quoteModalState.isOpen}
          onClose={closeQuoteModal}
          initialItemName={quoteModalState.itemName}
          category={quoteModalState.category}
        />
      </div>
    </HelmetProvider>
  );
}
