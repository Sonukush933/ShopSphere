import Container from "../common/Container";
import { services } from "../../constants/services";
import ServiceCard from "./ServiceCard";

function ServiceHighlights() {
  return (
    <section className="py-0 lg:py-12">
      <Container>
        <div
          className="
            grid
            grid-cols-1
            gap-8
            md:grid-cols-2
            lg:grid-cols-4
            lg:gap-10
          "
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              subtitle={service.subtitle}
              icon={service.icon}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ServiceHighlights;