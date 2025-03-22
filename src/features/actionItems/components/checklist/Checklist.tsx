import { SetStateAction, useState } from "react";
import { useList } from "../../../../context/CoreContext";

interface CheckListProps {
  itemId: string;
  closeCl: React.Dispatch<SetStateAction<string | null>>;
}

export default function Checklist({ itemId, closeCl }: CheckListProps) {
  const { setList } = useList();
  const [title, setTitle] = useState("");

  const createCheckList = (id: string) => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) =>
          item.id === id
            ? {
                ...item,
                checklist: [
                  ...(item.checklist || []),
                  { id: crypto.randomUUID(), title, checklist: [] },
                ],
              }
            : item
        ),
      }))
    );
    closeCl(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <>
      <div className="text-center p-2">Add checklist</div>
      <div className="p-4">
        <div className="flex flex-col">
          <label>Title</label>
          <input
            type="text"
            className="border-1 border-gray-300 px-2 py-1 rounded-sm focus:outline-none focus:ring-0"
            value={title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <button
            className="bg-[#00dcff] text-white px-2 py-1 rounded-md hover:cursor-pointer"
            onClick={() => createCheckList(itemId)}
          >
            Create
          </button>
        </div>
        {/* TODO copy items from */}
        {/* <div className="flex flex-col">
          <label>Copy items from...</label>
          <input
            type="text"
            className="border-1 border-gray-300 px-2 py-1 rounded-sm"
          />
        </div> */}
      </div>
    </>
  );
}
