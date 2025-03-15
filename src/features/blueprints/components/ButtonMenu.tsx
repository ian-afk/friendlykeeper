import { HiOutlineDotsVertical } from "react-icons/hi";

type ButtonProps = {
  showMenu: () => void;
  menu: boolean;
};

export default function ButtonMenu({ showMenu, menu }: ButtonProps) {
  return (
    <button
      onClick={showMenu}
      className={`${menu ? " bg-white text-black rounded-md" : ""}`}
    >
      <HiOutlineDotsVertical />
    </button>
  );
}
