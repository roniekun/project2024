import {  Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./component/navbar";
import Home from "./pages/home";
import Pricing from "./pages/pricing";
import Gallery from "./pages/gallery";
import Contact from "./pages/contact";
import Notfound from "./pages/Notfound";
import Lenis from '@studio-freight/lenis'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function App() {
  const location = useLocation();
  const lenis = new Lenis()

  gsap.registerPlugin(ScrollTrigger)
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
  
  return (
        <main className="bg-gray-100 flex flex-col box-border">
          <Navbar />
          <AnimatePresence mode="wait">
          <Routes location={location} key={location.key}>
            <Route key="home" exact path="/" element={<Home />} />
            <Route key="pricing" exact path="/pricing" element={<Pricing />} />
            <Route key="gallery" exact path="/gallery" element={<Gallery />} />
            <Route key="contact" exact path="/info" element={<Contact />} />
            <Route key="Notfound" path="*" element={<Notfound/>} />
          </Routes>
        </AnimatePresence>
        </main>
  );
}

export default App;
