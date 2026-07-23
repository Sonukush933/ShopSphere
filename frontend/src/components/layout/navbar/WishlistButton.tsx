import { Heart } from "lucide-react";

function WishlistButton() {
  return (
    <button
      className="
      flex
      h-[50px]
      w-[50px]
      items-center
      justify-center
      rounded-full
      bg-primary
      text-white
      transition-all
      hover:bg-primary-hover
      "
    >
      <Heart size={22} />
    </button>
  );
}

export default WishlistButton;