import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import WhyChoose from "../components/WhyChoose";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import DashboardPreview from "../components/DashboardPreview";
import Architecture from "../components/Architecture";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TechStack />
      <WhyChoose />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <Architecture />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;