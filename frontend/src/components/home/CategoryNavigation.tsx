import { categories, topCategories } from '../../constants/categories';

import Container from '../common/Container';
import Carousel from '../common/carousel/Carousel';
import CategoryItem from './CategoryItem';

function CategoryNavigation() {
  return (
    <section className="border-b border-border bg-white">
      <Container>
        {/* ================= Desktop Top Categories ================= */}
        <div
          className="
            hidden
            h-[46px]
            items-center
            justify-center
            gap-8
            border-b
            border-border
            lg:flex
          "
        >
          {topCategories.map((category) => (
            <button
              key={category}
              className="
                whitespace-nowrap
                text-[16px]
                font-medium
                text-heading
                transition-colors
                hover:text-primary
                transition-transform
        duration-300
        hover:scale-108
              "
            >
              {category}
            </button>
          ))}
        </div>

        {/* ================= Desktop Categories ================= */}
        <div className="hidden items-center justify-between py-3 lg:flex">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>

        {/* ================= Mobile Categories ================= */}
        <div className="py-5 lg:hidden">
          <Carousel>
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}

export default CategoryNavigation;
