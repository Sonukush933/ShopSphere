import { features } from "../../constants/features";
import Container from "../common/Container";
import FeatureItem from "./FeatureItem";

function FeatureCard() {
  return (
    <div className="absolute bottom-0 left-1/2 z-20 hidden w-full -translate-x-1/2 translate-y-1/2 lg:block">
      <Container>
        <div
          className="
            mx-auto
            flex
            h-[92px]
            w-full
            max-w-[1180px]
            items-center
            justify-between
            rounded-[12px]
            bg-white
            px-10
            shadow-[0_12px_35px_rgba(0,0,0,0.12)]
          "
        >
          {features.map((feature) => (
            <FeatureItem
              key={feature.id}
              title={feature.title}
              icon={feature.icon}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default FeatureCard;