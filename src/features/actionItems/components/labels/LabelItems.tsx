import { BsPencil } from "react-icons/bs";
import { useList } from "../../../../context/CoreContext";
import { useState } from "react";

interface LabelItemsProps {
  id: string;
  color: string;
  label: string;
  show: boolean;
}

export default function LabelItems({
  id,
  color,
  label,
  show,
}: LabelItemsProps) {
  const { setList } = useList();

  const [check, setCheck] = useState(show);
  const showLabel = (id: string) => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => ({
          ...item,
          labels: (item.labels || []).map((label) => {
            if (label.id === id) {
              return {
                ...label,
                show: check,
              };
            }
            return label;
          }),
        })),
      }))
    );
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    console.log(id);
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
      <button className="hover:cursor-pointer">
        <BsPencil />
      </button>
    </li>
  );
}
