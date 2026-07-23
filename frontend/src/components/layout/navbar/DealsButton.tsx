import { BadgePercent } from "lucide-react";

type DealsButtonProps = {
  mobile?: boolean;
};

function DealsButton({ mobile = false }: DealsButtonProps) {
  return (
    <button
      className={`
        flex
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-primary
        text-white
        transition-all
        hover:bg-primary-hover
        ${
          mobile
            ? "h-[46px] w-full px-3 text-[13px]"
            : "h-[50px] px-4 text-sm font-medium"
        }
      `}
    >
      <BadgePercent size={mobile ? 18 : 20} />

      <span>Deals & Offers</span>
    </button>
  );
}

export default DealsButton;