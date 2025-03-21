import { SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useList } from "../../../../context/CoreContext";

type EditLabel = {
  id: string;
  label: string;
  color: string;
};

interface LabelEditProps {
  setEdit: React.Dispatch<SetStateAction<boolean>>;
  itemId: string;
  editLabel: EditLabel;
}

export default function LabelEdit({
  setEdit,
  itemId,
  editLabel,
}: LabelEditProps) {
  const { setList } = useList();
  const [color, setColor] = useState(editLabel.color);
  const [title, setTitle] = useState(editLabel.label);

  const [del, setDel] = useState(false);
  const colors = [
    "#FF5733", // Red-Orange
    "#33FF57", // Green
    "#5733FF", // Blue-Violet
    "#FFD700", // Gold
    "#FF33A8", // Pink
    "#33A8FF", // Sky Blue
    "#A833FF", // Purple
    "#FF8C33", // Orange
    "#33FFD7", // Aqua
    "#D733FF", // Magenta
  ];

  const handSave = (id: string) => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => ({
          ...item,
          labels: (item.labels || []).map((label) => {
            if (label.id === id) {
              return {
                ...label,
                color,
                label: title,
              };
            }
            return label;
          }),
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
          labels: (item.labels || []).filter((label) => label.id !== id),
        })),
      }))
    );
    setEdit(false);
  };
  const handleSetColor = (color: string) => {
    setColor(color);
  };
  const handleRemoveColor = () => {
    setColor("");
  };

  return (
    <div>
      <div className="p-2 flex justify-center">
        <button
          className="mr-auto hover:cursor-pointer"
          onClick={() => setEdit(false)}
        >
          {"<"}
        </button>
        <div className="mr-auto">
          <label htmlFor="">{del ? "Delete" : "Edit"} Label</label>
        </div>
      </div>
      {del ? (
        <div className="flex flex-col p-2">
          <div>
            <p>Are you sure you want to delete this label? There is no undo.</p>
          </div>
          <div className="flex justify-center text-black py-1">
            <button
              className="bg-red-400 w-full rounded-sm py-1"
              onClick={() => handleDelete(editLabel.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="h-20 bg-[#424a50] flex items-center justify-center">
            <div
              style={{ backgroundColor: color }}
              className="px-3 w-64 h-8 font-semibold text-white rounded-sm flex items-center"
            >
              {title}
            </div>
          </div>
          <div className="space-y-2 p-4">
            <div className="flex flex-col space-y-2">
              <span>Title</span>
              <input
                type="text"
                className="border-1 px-2 py-1 rounded-sm"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <ul className="flex flex-wrap justify-between gap-2">
              {colors.map((color) => (
                <li
                  key={color}
                  className="w-12 h-8 rounded-md"
                  style={{ backgroundColor: color }}
                  onClick={() => handleSetColor(color)}
                ></li>
              ))}
            </ul>
            <div>
              <button
                className={`w-full py-1 rounded-sm flex items-center justify-center gap-2
    ${
      color === ""
        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
        : "bg-[#6b7681] hover:bg-[#5a636b] cursor-pointer"
    }
  `}
                disabled={color === ""}
                onClick={handleRemoveColor}
              >
                <span className="text-md">
                  <IoMdClose />
                </span>
                Remove color
              </button>
            </div>
            <hr />
            <div className="flex justify-between">
              <button
                className="bg-[#00dcff] text-black px-2 py-1 rounded-md hover:cursor-pointer"
                onClick={() => handSave(editLabel.id)}
              >
                Save
              </button>
              <button
                className="bg-red-400 text-black px-2 py-1 rounded-md hover:cursor-pointer"
                onClick={() => setDel(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
