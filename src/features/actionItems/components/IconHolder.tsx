import { IconHolderProps } from "../types/types";

export default function IconHolder({ icon, title }: IconHolderProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl">{icon}</span>
      <p className="text-xl font-semibold">{title}</p>
    </div>
  );
}
