import { ReactNode, useRef } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

type CarouselProps = {
  children: ReactNode;
  slidesToScroll?: number;
  className?: string;
};

function Carousel({
  children,
  slidesToScroll = 1,
  className = '',
}: CarouselProps) {
  const autoplay = useRef(
    Autoplay({
      delay: 1500,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  );

const [emblaRef] = useEmblaCarousel(
  {
    loop: true,
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
    slidesToScroll,
  },
  [autoplay.current],
);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-2">
          {Array.isArray(children) ? (
            children.map((child, index) => (
              <div key={index} className="flex-[0_0_auto]">
                {child}
              </div>
            ))
          ) : (
            <div className="flex-[0_0_auto]">{children}</div>
          )}
        </div>
      </div>

      {/* Left Fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-white to-transparent lg:w-15" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-white to-transparent lg:w-15" />
    </div>
  );
}

export default Carousel;
