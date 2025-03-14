import React, { SetStateAction, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoOpenOutline } from "react-icons/io5";
import { FaWheelchairMove } from "react-icons/fa6";
import { BsActivity, BsClock } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ListType } from "../utils/types";
interface CardEditModalProps {
  prevTA: (e: React.MouseEvent) => void;
  handleEdit: (e: React.MouseEvent) => void;
  cardName: string;
  setList: React.Dispatch<SetStateAction<ListType[]>>;
  cardId: string;
  setEdit: React.Dispatch<SetStateAction<boolean>>;
  activities: number;
  openTask: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function CardEditModal({
  prevTA,
  cardName,
  handleEdit,
  setList,
  cardId,
  setEdit,
  activities,
  openTask,
}: CardEditModalProps) {
  const [cardNameInput, setCardName] = useState(cardName);

  useEffect(() => {
    setCardName(cardName ?? "");
  }, [cardName]);

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

  const handleSaveCard = () => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => {
          if (item.id == cardId) {
            console.log(true);
            return {
              ...item,
              cardName: cardNameInput,
            };
          }

          return item;
        }),
      }))
    );
    setEdit(false);
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
    <>
      <div
        className="fixed inset-0 bg-black/30 z-20"
        onClick={handleEdit}
      ></div>

      {/* Modal Positioned Absolutely */}
      <div className="absolute left-0 rounded-lg z-30 top-0 ">
        <div className="flex gap-4 items-start">
          <div>
            <div className="bg-[#5b666e] p-2 rounded-lg shadow-2xl w-72 ">
              <div>
                <textarea
                  className="resize-none w-full focus:outline-0"
                  name="cardname"
                  id="cardname"
                  rows={5}
                  value={cardNameInput}
                  onClick={prevTA}
                  onChange={(e) => setCardName(e.target.value)}
                ></textarea>
                <div className="flex space-x-4">
                  <div
                    className={`relative text-sm bg-amber-200 text-black px-2 rounded-sm flex items-center gap-2  group`}
                  >
                    <span className="absolute bottom-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Due date
                    </span>
                    <span className="font-bold">
                      <BsClock />
                    </span>
                    March 14
                  </div>
                  {activities !== 0 && (
                    <div className="relative flex gap-2 items-center text-sm group">
                      <span className="absolute bottom-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Backlog
                      </span>
                      <span>
                        <BsActivity />
                      </span>
                      <span>{activities}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <button
                className="bg-cyan-200 p-2 px-3 rounded-md text-sm text-black gap-2 hover:cursor-pointer"
                onClick={handleSaveCard}
              >
                Save
              </button>
              <button
                className="text-white text-2xl hover:cursor-pointer"
                onClick={handleEdit}
              >
                {/* onClick={handleClickAdd} */}
                <IoMdClose />
              </button>
            </div>
          </div>

          <div>
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
          </div>
        </div>
      </div>
    </>
  );
}
