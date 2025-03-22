import React, { useState } from "react";
import TextArea from "../../../../components/forms/TextArea";
import ButtonSave from "../../../../components/buttons/ButtonSave";
import { useList } from "../../../../context/CoreContext";
import { format } from "date-fns";

interface AddTodoCheckListProps {
  clId: string;
}

export default function AddTodoCheckList({ clId }: AddTodoCheckListProps) {
  const { setList } = useList();
  const [todo, setTodo] = useState<string | undefined>("");

  const [addTodo, setAddTodo] = useState(false);
  const [faTodo, setfaTodo] = useState(false); //focusAdd todo

  const handleCancel = () => {
    setAddTodo(false);
  };

  const handleSave = () => {
    const date = new Date(Date.now());
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => ({
          ...item,
          checklist: (item.checklist || []).map((check) =>
            check.id === clId
              ? {
                  ...check,
                  checklist: [
                    ...(check.checklist || []),
                    {
                      id: crypto.randomUUID(),
                      done: false,
                      clTitle: todo,
                      dueDate: format(date, "MMM dd, yyyy hh:mm a"),
                    },
                  ],
                }
              : check
          ),
        })),
      }))
    );
    setAddTodo(false);
  };
  return (
    <>
      {addTodo ? (
        <>
          <TextArea
            addInput={faTodo}
            setAddInput={setfaTodo}
            inputValue={todo}
            setInput={setTodo}
            placeHolder="Add todo"
            name="todo"
            maxRow={3}
          />
          <ButtonSave cancel={handleCancel} save={handleSave} btnName="Add" />
        </>
      ) : (
        <button
          className="px-2 py-1 text-sm bg-[#4A5565] rounded-md font-semibold"
          onClick={() => setAddTodo(true)}
        >
          Add todo
        </button>
      )}
    </>
  );
}
