import { features } from "../../constants/features";

import FeatureItem from "./FeatureItem";

function FeatureMarquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-white py-4 lg:hidden">
      <div className="flex w-max animate-feature-marquee">
        {[...features, ...features].map((feature, index) => (
          <div
            key={`${feature.id}-${index}`}
            className="mx-6 shrink-0"
          >
            <FeatureItem
              title={feature.title}
              icon={feature.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureMarquee;