import Hero from "./components/Hero";
import MarqueeScroller from "./components/MarqueeScroller";
import WhatWeDo from "./components/WhatWeDo";
import Packs from "./components/Packs";
import Addons from "./components/Addons";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#f9fafb] px-3 sm:px-4 md:px-8 py-6 md:py-10">
      <Hero />
      <MarqueeScroller />
      <WhatWeDo />
      <Packs />
      <Addons />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}
