import AllProductsSection from "./components/AllProductsSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import PriceDecreaseSection from "./components/PriceDecreaseSection";
import PriceIncreaseSection from "./components/PriceIncreaseSection";

export const instant = false

export default function Home() {
  return (
    <>
     <Hero/>
     <PriceIncreaseSection/>
     <PriceDecreaseSection/>
     <AllProductsSection/>
     <Footer/>
    </>
  );
}
