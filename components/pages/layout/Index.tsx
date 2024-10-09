import React from 'react';
import AppBar from '@/components/layout/AppBar';
import HeroSection from './HeroSection';
import Footer from '@/components/layout/Footer';
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import GetStartedSection from './GetStarted';
import SubscribeSection from './SubscribeSection';
import CategoriesSection from './CategoriesSection';
import PartnersSection from './PartnerSection';

const Index = () => {
  return (
    <div>
      <AppBar />

      <main>
        <HeroSection />
        <PartnersSection/>
        <CategoriesSection />
        <GetStartedSection />
        <SubscribeSection />
  
      </main>

      <Footer 
        sections={[
            {
              title: "BreachWatchers",
              links: [
                { name: "Explore", href: "/explore" },
                { name: "About", href: "/about" },
              ],
            },
            {
              title: "My Account",
              links: [
                { name: "Dashboard", href: "/dashboard" },
                { name: "Watchlist", href: "/watchlist" },
                { name: "Settings", href: "/settings" },
              ],
            },
            {
              title: "Resources",
              links: [
                { name: "Platform Status", href: "/status" },
                { name: "Partners", href: "/partners" },
                { name: "Newsletter", href: "/newsletter" },
              ],
            },
            {
              title: "Community",
              links: [
                { name: "Help Center", href: "/help-center" },
                { name: "Suggest Feature", href: "/suggest-feature" },
                { name: "Subscribe", href: "/subscribe" },
              ],
            },
          ]}
          socialLinks={[
            { icon: <FaTwitter />, href: "https://twitter.com" },
            { icon: <FaInstagram />, href: "https://instagram.com" },
            { icon: <FaLinkedin />, href: "https://linkedin.com" },
          ]}
          copyrightText="© BreachWatchers, Inc © All Rights Reserved"
          termsLink="/terms"
          privacyPolicyLink="/privacy-policy"
      />
    </div>
  );
};

export default Index;
