import { LuListTodo } from "react-icons/lu";
import { Checklist } from "../../../types/types";

interface ChecklistProps {
  checklist: Checklist[];
}

export default function ChecklistStream({ checklist }: ChecklistProps) {
  const totalTodos = checklist.flatMap((checklist) => checklist.checklist);
  const totalDone = checklist.flatMap((checklist) =>
    checklist.checklist.filter((item) => item.done)
  );
  return (
    <>
      {totalTodos.length !== 0 ? (
        <div
          className={`flex items-center gap-1 text-sm ${
            totalDone.length === totalTodos.length
              ? "bg-green-400 text-black px-2 rounded-sm"
              : ""
          }`}
        >
          <LuListTodo />
          <span>{`${totalDone.length}/${totalTodos.length}`}</span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
