import { FaPlus } from "react-icons/fa6";

type ButtonAddProp = {
  addWstream: () => void;
};

export default function ButtonAdd({ addWstream }: ButtonAddProp) {
  return (
    <div>
      <button className="flex items-center gap-2 text-sm" onClick={addWstream}>
        <span className="">
          <FaPlus />
        </span>
        Add a card
      </button>
    </div>
  );
}
