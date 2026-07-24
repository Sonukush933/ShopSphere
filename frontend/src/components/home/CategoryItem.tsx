import type { Category } from '../../types/category.types';

type CategoryItemProps = {
  category: Category;
};

function CategoryItem({ category }: CategoryItemProps) {
  return (
    <button
      className="
        flex
       w-[90px]
sm:w-[100px]
md:w-[110px]
lg:w-[120px]
        shrink-0
        flex-col
        items-center
        gap-3
        py-2
        transition-transform
        duration-300
        hover:scale-108
      "
    >
      <div
        className="
          flex
         h-[52px]
w-[52px]
sm:h-[80px]
sm:w-[80px]
lg:h-[88px]
lg:w-[88px]
          items-center
          justify-center
          overflow-hidden
          rounded-full
          bg-[#F7F7F7]
        "
      >
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <span
        className="
          text-center
          text-[12px]
          font-medium
          leading-5
          text-heading
            lg:text-[18px]
        "
      >
        {category.name}
      </span>
    </button>
  );
}

export default CategoryItem;
