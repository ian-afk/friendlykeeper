import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface AddNewProps {
  addNew: (itemName: string) => void;
  handleClickAdd: () => void;
  button: string;
}
export default function AddNewForm({
  handleClickAdd,
  button,
  addNew,
}: AddNewProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height dynamically
    }
  }, [itemName]);

  const handleClickNew = () => {
    addNew(itemName);
    setItemName("");
  };
  return (
    <div className="flex flex-col bg-cyan-950 rounded-lg">
      <textarea
        ref={textareaRef}
        className="border border-white rounded-md bg-[#5b666e] text-white p-2 resize-none overflow-hidden"
        rows={1} // Minimum row count
        style={{ minHeight: "40px", maxHeight: "300px" }}
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <div className="mt-2 flex items-center gap-2">
        <button
          className="bg-cyan-200 p-2 px-3 rounded-md text-sm text-black gap-2"
          onClick={handleClickNew}
        >
          Add {`${button}`}
        </button>
        <button onClick={handleClickAdd} className="text-white text-2xl">
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}
