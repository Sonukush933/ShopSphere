import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

function ServiceCard({
  title,
  subtitle,
  icon: Icon,
}: ServiceCardProps) {
  return (
    <div className="flex items-center gap-4">
      <Icon
        size={38}
        strokeWidth={1.5}
        className="shrink-0 text-primary"
      />

      <div>
        <h3
          className="
            text-[18px]
            font-semibold
            uppercase
            text-heading
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-[15px]
            text-secondary
          "
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default ServiceCard;