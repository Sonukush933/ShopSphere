import type { LucideIcon } from "lucide-react";

type FeatureItemProps = {
  title: string;
  icon: LucideIcon;
};

function FeatureItem({
  title,
  icon: Icon,
}: FeatureItemProps) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <Icon
        size={24}
        strokeWidth={1.8}
        className="text-primary"
      />

      <span className="text-sm lg:text-base font-medium text-heading">
        {title}
      </span>
    </div>
  );
}

export default FeatureItem;