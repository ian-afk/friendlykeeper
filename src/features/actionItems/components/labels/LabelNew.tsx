import { SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useList } from "../../../../context/CoreContext";

interface LabelNewProps {
  setNew: React.Dispatch<SetStateAction<boolean>>;
  back: () => void;
  itemId: string;
}

export default function LabelNew({ setNew, back, itemId }: LabelNewProps) {
  const { setList } = useList();
  const [color, setColor] = useState("");
  const [title, setTitle] = useState("");
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

  const createNewLabel = () => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                labels: [
                  ...(item.labels || []),
                  { id: crypto.randomUUID(), label: title, color, show: true },
                ],
              }
            : item
        ),
      }))
    );
    setNew(false);
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
        <button className="mr-auto hover:cursor-pointer" onClick={back}>
          {"<"}
        </button>
        <div className="mr-auto">
          <label htmlFor="">Create Label</label>
        </div>
      </div>
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
        <div>
          <button
            className="bg-[#00dcff] text-white px-2 py-1 rounded-md hover:cursor-pointer"
            onClick={createNewLabel}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
