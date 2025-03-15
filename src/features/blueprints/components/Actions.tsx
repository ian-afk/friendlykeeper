import { IoMdClose } from "react-icons/io";

type ActionsProp = {
  id: string;
  deleteListCard: (id: string) => void;
  showMenu: () => void;
};

export default function Actions({ deleteListCard, id, showMenu }: ActionsProp) {
  return (
    <div className="absolute -right-66 top-8 bg-[#5b666e] p-2 rounded-lg border-1 border-gray-500 flex flex-col w-72 z-1">
      <div className="relative text-center">
        <p className="font-semibold">List of actions</p>
        <button className={`absolute top-0 right-0 $`} onClick={showMenu}>
          <IoMdClose />
        </button>
      </div>
      <ul className="self-start">
        <li>Move</li>
        <li onClick={() => deleteListCard(id)}>Delete</li>
      </ul>
    </div>
  );
}
