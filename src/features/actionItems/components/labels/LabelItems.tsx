import { BsPencil } from "react-icons/bs";
import { useList } from "../../../../context/CoreContext";
import { SetStateAction, useState } from "react";

type EditLabel = {
  id: string;
  label: string;
  color: string;
};

interface LabelItemsProps {
  id: string;
  color: string;
  label: string;
  show: boolean;
  edit: (id: string, label: string, color: string) => void;
}

export default function LabelItems({
  id,
  color,
  label,
  show,
  edit,
}: LabelItemsProps) {
  const { setList } = useList();

  const [check, setCheck] = useState(show);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setCheck(e.target.checked);
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => ({
          ...item,
          labels: (item.labels || []).map((label) => {
            if (label.id === id) {
              return {
                ...label,
                show: e.target.checked,
              };
            }
            return label;
          }),
        })),
      }))
    );
  };
  return (
    <li className="flex gap-2">
      <input
        type="checkbox"
        checked={show}
        className="hover:cursor-pointer"
        onChange={(e) => handleInput(e, id)}
      />
      <div
        style={{ backgroundColor: color }}
        className="px-3 w-64 h-8 font-semibold text-white rounded-sm flex items-center"
      >
        <span> {label}</span>
      </div>
      <button
        className="hover:cursor-pointer"
        onClick={() => edit(id, label, color)}
      >
        <BsPencil />
      </button>
    </li>
  );
}
