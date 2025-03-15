import { FaPlus } from "react-icons/fa6";

type ButtonProps = {
  listLength: number;
  handleClickAdd: () => void;
};

export default function Button({ listLength, handleClickAdd }: ButtonProps) {
  return (
    <div>
      <button
        className="flex items-center gap-2 bg-cyan-600 px-2 py-2 rounded-md text-white w-72"
        onClick={handleClickAdd}
      >
        <span className="">
          <FaPlus />
        </span>
        {listLength > 0 ? "Add another list" : "Add a list"}
      </button>
    </div>
  );
}
