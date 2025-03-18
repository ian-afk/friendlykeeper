import { SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface LabelNewProps {
  setNew: React.Dispatch<SetStateAction<boolean>>;
}

export default function LabelNew({ setNew }: LabelNewProps) {
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
    setNew(false);
  };

  const handleSetColor = (color: string) => {
    setColor(color);
  };

  return (
    <div>
      <div className="h-20 bg-[#424a50] flex items-center justify-center">
        <div style={{ backgroundColor: color }} className="px-2 py-1 w-64 h-7">
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
          <button className="bg-[#6b7681] w-full py-1 rounded-sm flex items-center justify-center gap-2">
            <span className="text-md">
              <IoMdClose />
            </span>
            Remove color
          </button>
        </div>
        <hr />
        <div>
          <button
            className="bg-[#00dcff] text-white px-2 py-1 rounded-md"
            onClick={createNewLabel}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
