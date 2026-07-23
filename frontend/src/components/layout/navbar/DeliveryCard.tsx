import { MapPin } from "lucide-react";

function DeliveryCard() {
  return (
    <button className="flex h-12 items-center gap-2 rounded-lg bg-primary px-4 text-white">
      <MapPin className="size-5" />

      <div className="text-left">
        <p className="text-[10px]">
          Deliver To
        </p>

        <p className="text-xs font-medium">
          Undefined, null
        </p>
      </div>
    </button>
  );
}

export default DeliveryCard;