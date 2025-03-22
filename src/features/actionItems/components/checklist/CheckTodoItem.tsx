import { useState } from "react";
import { useList } from "../../../../context/CoreContext";
import TextArea from "../../../../components/forms/TextArea";
import ButtonSave from "../../../../components/buttons/ButtonSave";
import { FaRegClock } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
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
              <button className="px-2 py-1 hover:bg-[#aeb6bd] rounded-sm flex gap-2 items-center">
                <span className="font-bold text-lg">
                  <FaRegClock />
                </span>{" "}
                Due date
              </button>
              <button className="px-2 py-1 hover:bg-[#aeb6bd] rounded-sm">
                <BsThreeDotsVertical />
              </button>
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
