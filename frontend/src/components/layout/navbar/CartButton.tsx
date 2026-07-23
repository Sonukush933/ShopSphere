import { ShoppingCart } from "lucide-react";

type CartButtonProps = {
  mobile?: boolean;
};

function CartButton({
  mobile = false,
}: CartButtonProps) {
  return (
    <button
      className={`
        flex
        items-center
        justify-center
        rounded-full
        bg-primary
        text-white
        transition-all
        hover:bg-primary-hover
        ${
          mobile
            ? "h-[46px] w-[46px]"
            : "h-[50px] w-[50px]"
        }
      `}
    >
      <ShoppingCart size={mobile ? 20 : 22} />
    </button>
  );
}

export default CartButton;