import { useRef, useState } from "react";
import { useList } from "../../../../context/CoreContext";
import TextArea from "../../../../components/forms/TextArea";
import ButtonSave from "../../../../components/buttons/ButtonSave";
import { FaRegClock } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import ActionModal from "../ActionModal";

interface ChehcktodoItemProps {
  done: boolean;
  clTitle: string | undefined;
  id: string;
  arrLength: number;
}
export default function CheckTodoItem({
  done,
  clTitle,
  id,
}: ChehcktodoItemProps) {
  const { setList } = useList();
  const [title, setTitle] = useState<string | undefined>(clTitle);

  const [edit, setEdit] = useState(false);
  const [faTitle, setfaTitle] = useState(false); //focusAdd todo

  const [activeAction, setActiveAction] = useState<string | null>(null);
  const actionRefs = useRef<{
    [key: string]: HTMLLIElement | HTMLDivElement | null;
  }>({});

  const setRef =
    (name: string) => (el: HTMLLIElement | HTMLDivElement | null) => {
      actionRefs.current[name] = el;
    };

  const handleDone = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => ({
          ...item,
          checklist: item.checklist.map((check) => ({
            ...check,
            checklist: check.checklist.map((check) =>
              check.id === id
                ? {
                    ...check,
                    done: e.target.checked,
                  }
                : check
            ),
          })),
        })),
      }))
    );
  };

  const handleSave = () => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => ({
          ...item,
          checklist: item.checklist.map((check) => ({
            ...check,
            checklist: check.checklist.map((check) =>
              check.id === id
                ? {
                    ...check,
                    clTitle: title,
                  }
                : check
            ),
          })),
        })),
      }))
    );
    setEdit(false);
  };

  const handleDelete = (id: string) => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => ({
          ...item,
          checklist: item.checklist.map((check) => ({
            ...check,
            checklist: check.checklist.filter((check) => check.id !== id),
          })),
        })),
      }))
    );
    setEdit(false);
  };

  const handleCancel = () => {
    setEdit(false);
  };
  return (
    <li className="flex gap-2">
      <input
        type="checkbox"
        className="w-4 self-center"
        checked={done}
        onChange={(e) => handleDone(e, id)}
      />
      {edit ? (
        <div className="flex flex-col gap-1 w-full bg-[#717A81] p-2 rounded-md">
          <TextArea
            addInput={faTitle}
            setAddInput={setfaTitle}
            inputValue={title}
            setInput={setTitle}
            placeHolder="Add todo"
            name="todo"
            maxRow={2}
          />
          <div className="flex justify-between items-center">
            <ButtonSave
              cancel={handleCancel}
              save={handleSave}
              btnName="Save"
            />
            <div className="flex gap-2 text-sm">
              {/* <button className="px-2 py-1 hover:bg-[#aeb6bd] rounded-sm">
                Assign
              </button> */}
              <div ref={setRef(`due-${id}`)}>
                <button
                  className="px-2 py-1 hover:bg-[#aeb6bd] rounded-sm flex gap-2 items-center"
                  onClick={() =>
                    setActiveAction(
                      activeAction === `due-${id}` ? null : `due-${id}`
                    )
                  }
                >
                  <span className="font-bold text-lg">
                    <FaRegClock />
                  </span>
                  Due date
                </button>
                {activeAction === `due-${id}` &&
                  actionRefs.current[`due-${id}`] && (
                    <ActionModal
                      parentRef={actionRefs.current[`due-${id}`]!}
                      closeModal={() => setActiveAction(null)}
                    >
                      <div className="flex flex-col p-2">
                        <div className="text-center mb-4">
                          <label htmlFor="" className="font-semibold">
                            {`⚠`} UNDER CONSTRUCTION {`⚠`}
                          </label>
                        </div>
                        <div className="text-sm flex flex-col px-2">
                          <span className="italic">
                            Oops! This feature isn't ready yet, but we're
                            working on it!
                          </span>
                        </div>
                      </div>
                    </ActionModal>
                  )}
              </div>
              {/* <button className="px-2 py-1 hover:bg-[#aeb6bd] rounded-sm">
                <BsThreeDotsVertical />
              </button> */}
              <div ref={setRef(id)}>
                <button
                  className="px-2 py-1 hover:bg-[#aeb6bd] rounded-sm text-lg hover:text-red-500"
                  onClick={() =>
                    setActiveAction(activeAction === id ? null : id)
                  }
                >
                  <MdDeleteOutline />
                </button>
                {activeAction === id && actionRefs.current[id] && (
                  <ActionModal
                    parentRef={actionRefs.current[id]!}
                    closeModal={() => setActiveAction(null)}
                  >
                    <div className="flex flex-col p-2">
                      <div className="text-center mb-4">
                        <label htmlFor="">Delete {title}</label>
                      </div>
                      <div className="text-sm flex flex-col px-2">
                        <span>Deleting todo is permanent</span>
                        <span>Are you sure you want to delete?</span>
                      </div>
                      <div className="flex">
                        <button
                          className="w-full py-1 bg-red-400 text-black text-sm rounded-sm mt-2"
                          onClick={() => handleDelete(id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </ActionModal>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="hover:bg-[#717A81] w-full px-2 py-1 rounded-lg"
          onClick={() => setEdit(true)}
        >
          <span>{clTitle}</span>
        </div>
      )}
    </li>
  );
}
