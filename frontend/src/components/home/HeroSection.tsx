import heroBanner from "../../assets/images/main/hero-background-img.jpg"; 
import FeatureCard from "./FeatureCard";
import FeatureMarquee from "./FeatureMarquee";

function HeroSection() {
  return (
    <section className="py-5">
      {/* Desktop */}
      <div className="relative hidden px-5 lg:block">
        <img
          src={heroBanner}
          alt="Furniture Collection"
          className="
            h-[500px]
            w-full
             select-none
            object-cover
          "
        />

        <FeatureCard />
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <div className="px-5">
          <img
            src={heroBanner}
            alt="Furniture Collection"
            className="
              h-[240px]
              w-full
               select-none
              object-cover
            "
          />
        </div>

        <div className="mt-5">
          <FeatureMarquee />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;