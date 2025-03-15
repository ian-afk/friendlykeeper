import { BsClock } from "react-icons/bs";
import { FaWheelchairMove } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";

interface ActionsProps {
  openTask: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Actions({ openTask }: ActionsProps) {
  const handleOpenTask = (e: React.MouseEvent<HTMLElement>) => {
    openTask(e);
  };
  const handleMove = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const handleEditDates = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const handleDelte = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const actions = [
    {
      name: "Open task",
      icon: <IoOpenOutline />,
      action: handleOpenTask,
    },
    {
      name: "Move",
      icon: <FaWheelchairMove />,
      action: handleMove,
    },
    {
      name: "Edit dates",
      icon: <BsClock />,
      action: handleEditDates,
    },
    {
      name: "Delete",
      icon: <RiDeleteBin5Line />,
      action: handleDelte,
    },
  ];

  return (
    <ul className="flex flex-col space-y-2 items-start text-sm">
      {actions.map((item) => (
        <li
          key={item.name}
          className="bg-[#424446] py-1 px-2 rounded-sm shadow-2xl w-fit whitespace-nowrap "
        >
          <button
            className="flex items-center gap-2 hover:cursor-pointer"
            onClick={item.action}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
