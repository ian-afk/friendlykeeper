import { ChecklistItem } from "../../../../types/types";

interface ChecklistTodoProps {
  checklist: ChecklistItem[];
}
export default function CheckTodoProgress({ checklist }: ChecklistTodoProps) {
  const totalItems = checklist.length;
  const completedItems = checklist.filter((item) => item.done).length;

  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="flex items-center gap-4 w-full">
      <span className="w-4 text-[11px]">
        {progress ? Math.round(progress) : 0}%
      </span>
      <div className="relative w-full h-2 bg-[#717A81] rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-500 rounded-full transition-all duration-300"
          style={{
            width: `${progress ? progress : 0}%`,
            backgroundColor: progress === 100 ? "#56ce6a" : "",
          }}
        ></div>
      </div>
    </div>
  );
}
