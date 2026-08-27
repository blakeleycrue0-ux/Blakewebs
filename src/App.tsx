import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import MarqueeScroller from "./components/MarqueeScroller";
import WhatWeDo from "./components/WhatWeDo";
import Packs from "./components/Packs";
import Addons from "./components/Addons";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import MobileTabBar from "./components/MobileTabBar";
import PrivacyPolicy from "./components/PrivacyPolicy";

export default function App() {
  if (window.location.pathname.replace(/\/+$/, "") === "/privacy-policy") {
    return <PrivacyPolicy />;
  }

  return (
    <div className="min-h-screen w-full bg-[#f9fafb] px-3 sm:px-4 md:px-8 py-6 md:py-10 pb-24 md:pb-10">
      <Hero />
      <Showcase />
      <MarqueeScroller />
      <WhatWeDo />
      <Packs />
      <Addons />
      <Process />
      <Contact />
      <Footer />
      <WhatsAppFloat />
      <MobileTabBar />
    </div>
  );
}
