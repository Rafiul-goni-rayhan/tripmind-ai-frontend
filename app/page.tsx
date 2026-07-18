import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Features from './../components/landing/Features';
import Stats from './../components/landing/Stats';
import HowItWorks from './../components/landing/HowItWorks';
import PopularDestinations from './../components/landing/PopularDestinations';
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Newsletter from './../components/landing/Newsletter';
import Footer from "@/components/layout/Footer";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <PopularDestinations />
      <Testimonials/>
      <FAQ/>
      <Newsletter/>
      <Footer/>
      
    </main>
  );
}