import { Flame } from "lucide-react";

function OfferCard() {
  return (
    <button className="flex h-12 items-center gap-2 rounded-lg bg-primary px-4 text-white">
      <Flame className="size-5" />

      <div className="text-left">
        <p className="text-[10px]">
          Deals &
        </p>

        <p className="text-xs font-medium">
          Offers Today
        </p>
      </div>
    </button>
  );
}

export default OfferCard;