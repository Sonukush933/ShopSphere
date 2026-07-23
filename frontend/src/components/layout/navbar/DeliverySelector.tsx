import { ChevronDown, MapPin } from "lucide-react";

type DeliverySelectorProps = {
  mobile?: boolean;
};

function DeliverySelector({
  mobile = false,
}: DeliverySelectorProps) {
  return (
    <button
      className={`
        flex
        items-center
        justify-between
        rounded-lg
        bg-primary
        text-white
        transition-all
        hover:bg-primary-hover
        ${
          mobile
            ? "h-[46px] w-full px-3"
            : "h-[50px] w-[175px] px-2"
        }
      `}
    >
      <div className="flex items-center gap-2">
        <MapPin size={mobile ? 18 : 22} />

        <div className="text-left leading-tight">
          <p className={mobile ? "text-[11px]" : "text-[14px]"}>
            Deliver TO
          </p>

          <p className={mobile ? "text-[11px]" : "text-[14px]"}>
            Undefined, null
          </p>
        </div>
      </div>

      <ChevronDown size={mobile ? 18 : 22} />
    </button>
  );
}

export default DeliverySelector;