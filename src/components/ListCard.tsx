import { FaPlus } from "react-icons/fa6";
import { Item, ListType } from "../utils/types";
import { FaRegCircle } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BsTextLeft } from "react-icons/bs";

import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import AddNew from "./AddNew";
import CardModal from "./CardModal";
interface ListCardProps {
  listName: string;
  items: Item[];
  id: string;
  deleteList: (id: string) => void;
  setList: React.Dispatch<React.SetStateAction<ListType[]>>;
}

export default function ListCard({
  listName,
  items,
  id,
  deleteList,
  setList,
}: ListCardProps) {
  const [addNew, setAddNew] = useState(false);
  const [menu, setMenu] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [cName, setCname] = useState("");
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        setMenu(false);
        setAddNew(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);
  const handleAddItem = () => {
    setAddNew(!addNew);
  };

  const handleShowModal = (cdName: string) => {
    setCname(cdName);
    setShowModal(true);
  };

  const handleSubmitItem = (cardName: string) => {
    setList((prev) =>
      prev.map((list) =>
        list.id === id
          ? {
              ...list,
              items: [...list.items, { cardName, id: crypto.randomUUID() }],
            }
          : list
      )
    );
  };
  const handleShowMenu = () => {
    setMenu(!menu);
  };
  const handleDeleteList = (id: string) => {
    deleteList(id);
  };
  return (
    <div
      className="space-y-2 flex flex-col bg-cyan-950 p-2 rounded-lg w-72 text-gray-300 flex-shrink-0"
      ref={divRef}
    >
      <div className="flex justify-between relative px-2">
        <label htmlFor="">{listName}</label>
        <button
          onClick={handleShowMenu}
          className={`${menu ? " bg-white text-black rounded-md" : ""}`}
        >
          <HiOutlineDotsVertical />
        </button>
        {menu && (
          <div className="absolute -right-66 top-8 bg-[#5b666e] p-2 rounded-lg border-1 border-gray-500 flex flex-col w-72">
            <div className="relative text-center">
              <p className="font-semibold">List of actions</p>
              <button
                className={`absolute top-0 right-0 $`}
                onClick={handleShowMenu}
              >
                <IoMdClose />
              </button>
            </div>
            <ul className="self-start">
              <li>Move</li>
              <li onClick={() => handleDeleteList(id)}>Delete</li>
            </ul>
          </div>
        )}
      </div>
      {items.length > 0 ? (
        <div className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <div
              key={`item-${index}`}
              className="bg-[#5b666e] p-2 rounded-lg "
              onClick={() => handleShowModal(item.cardName)}
            >
              <div className="flex items-center gap-2">
                <button>
                  <FaRegCircle />
                </button>
                <label>{item.cardName}</label>
              </div>
              <div>{item.description ? <BsTextLeft /> : ""}</div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      {/* {addNew && <List addNew, handleClickAdd/>} */}
      {addNew ? (
        <AddNew
          handleClickAdd={handleAddItem}
          button="a card"
          addNew={handleSubmitItem}
        />
      ) : (
        <div>
          <button
            className="flex items-center gap-2 text-sm"
            onClick={() => {
              handleAddItem();
              setMenu(false);
            }}
          >
            <span className="">
              <FaPlus />
            </span>
            Add a card
          </button>
        </div>
      )}
      {showModal && (
        <CardModal custName={cName} message="test" showModal={setShowModal} />
      )}
    </div>
  );
}
