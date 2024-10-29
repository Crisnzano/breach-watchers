import React from 'react';
import AppBar from '@/components/layout/AppBar';
import HeroSection from './HeroSection';
import Footer from '@/components/layout/Footer';
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import GetStartedSection from './GetStarted';
import SubscribeSection from './SubscribeSection';
import CarouselDemo from './CategoriesSection';
import PartnersSection from './PartnerSection';

const Index = () => {
  return (
    <div>
      <AppBar />

      <main>
        <HeroSection />
        <PartnersSection/>
        <CarouselDemo/>
        <GetStartedSection />
        <SubscribeSection />
  
      </main>

      <Footer 
        sections={[
            {
              title: "BreachWatchers",
              links: [
                { name: "Explore", href: "/" },
                { name: "About", href: "/" },
              ],
            },
            {
              title: "My Account",
              links: [
                { name: "Dashboard", href: "/dashboard" },
                { name: "Watchlist", href: "/"},
                { name: "Settings", href: "/" },
              ],
            },
            {
              title: "Resources",
              links: [
                { name: "Platform Status", href: "/" },
                { name: "Partners", href: "/" },
                { name: "Newsletter", href: "/" },
              ],
            },
            {
              title: "Community",
              links: [
                { name: "Help Center", href: "/" },
                { name: "Suggest Feature", href: "/" },
                { name: "Subscribe", href: "/" },
              ],
            },
          ]}
          socialLinks={[
            { icon: <FaTwitter />, href: "https://twitter.com" },
            { icon: <FaInstagram />, href: "https://instagram.com" },
            { icon: <FaLinkedin />, href: "https://linkedin.com" },
          ]}
          copyrightText="© BreachWatchers, Inc © All Rights Reserved"
          termsLink="/"
          privacyPolicyLink="/"
      />
    </div>
  );
};

export default Index;
