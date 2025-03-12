import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ListCardProps {
  addNew: (listname: string) => void;
  handleClickAdd: () => void;
}
export default function List({ addNew, handleClickAdd }: ListCardProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [listName, setListName] = useState("");

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height dynamically
    }
  }, [listName]);

  const handleClickNew = () => {
    addNew(listName);
  };
  return (
    <div className="flex flex-col bg-cyan-950 p-2 rounded-lg w-72">
      <textarea
        ref={textareaRef}
        className="border border-white rounded-md bg-[#5b666e] text-white p-2 resize-none overflow-hidden"
        rows={1} // Minimum row count
        style={{ minHeight: "40px", maxHeight: "300px" }} // Prevents excessive growth
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <div className="mt-2 flex items-center gap-2">
        <button
          className="bg-cyan-200 p-2 px-3 rounded-md text-sm"
          onClick={handleClickNew}
        >
          Add list
        </button>
        <button onClick={handleClickAdd} className="text-white text-2xl">
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}
