import { useRef, useState } from "react";
import { Checklist } from "../../../../types/types";
import IconHolder from "../IconHolder";
import { LuListTodo } from "react-icons/lu";
import ActionModal from "../ActionModal";
import AddTodoCheckList from "./AddTodoCheckList";
import { useList } from "../../../../context/CoreContext";
import ChecklistTodo from "./ChecklistTodo";

interface ActionCheckListProps {
  checklist: Checklist[];
}
export default function ActionCheckList({ checklist }: ActionCheckListProps) {
  const { setList } = useList();
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const actionRefs = useRef<{
    [key: string]: HTMLLIElement | HTMLDivElement | null;
  }>({});

  const setRef =
    (name: string) => (el: HTMLLIElement | HTMLDivElement | null) => {
      actionRefs.current[name] = el;
    };

  const handleDeleteCL = (id: string) => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => ({
          ...item,
          checklist: item.checklist.filter((check) => check.id !== id),
        })),
      }))
    );
    setActiveAction(activeAction === id ? null : id);
  };
  return (
    <>
      {checklist.map((check) => (
        <div key={check.id}>
          <div className="flex justify-between">
            <IconHolder icon={<LuListTodo />} title={check.title} />
            <div className="relative" ref={setRef(check.id)}>
              <button
                className="bg-gray-600 text-white py-1 px-4 rounded-md"
                onClick={() =>
                  setActiveAction(activeAction === check.id ? null : check.id)
                }
              >
                Delete
              </button>
              {activeAction === check.id && actionRefs.current[check.id] && (
                <ActionModal
                  parentRef={actionRefs.current[check.id]!}
                  closeModal={() => setActiveAction(null)}
                >
                  <div className="flex flex-col p-2">
                    <div className="text-center mb-4">
                      <label htmlFor="">Delete {check.title}</label>
                    </div>
                    <div className="text-sm">
                      <span>Deleting checklist is permanent</span>
                      <span>Are you sure you want to delete?</span>
                    </div>
                    <div className="flex">
                      <button
                        className="w-full py-1 bg-red-400 text-black text-sm rounded-sm mt-2"
                        onClick={() => handleDeleteCL(check.id)}
                      >
                        Delete Checklist
                      </button>
                    </div>
                  </div>
                </ActionModal>
              )}
            </div>
          </div>
          <ChecklistTodo checklist={check.checklist} />

          <div className="ml-7">
            <AddTodoCheckList clId={check.id} />
          </div>
        </div>
      ))}
    </>
  );
}
