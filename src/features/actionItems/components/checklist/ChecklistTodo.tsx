import { ChecklistItem } from "../../../../types/types";
import CheckTodoItem from "./CheckTodoItem";
import CheckTodoProgress from "./CheckTodoProgress";

interface ChecklistTodoProps {
  checklist: ChecklistItem[];
}

export default function ChecklistTodo({ checklist }: ChecklistTodoProps) {
  return (
    <>
      <CheckTodoProgress checklist={checklist} />
      <div>
        <ul>
          {checklist.map((check, _, arr) => (
            <CheckTodoItem
              key={check.id}
              clTitle={check.clTitle}
              done={check.done}
              id={check.id}
              arrLength={arr.length}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
