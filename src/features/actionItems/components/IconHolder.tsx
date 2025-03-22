import { IconHolderProps } from "../types/types";

export default function IconHolder({ icon, title }: IconHolderProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl">{icon}</span>
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
}
