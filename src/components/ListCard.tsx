import { FaPlus } from "react-icons/fa6";
import { Activity, Item, ListType } from "../utils/types";

import { HiOutlineDotsVertical } from "react-icons/hi";

import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import AddNew from "./AddNew";
import CardModal from "./CardModal";
import { format } from "date-fns";

import Cards from "./Cards";
interface ListCardProps {
  listName: string;
  items: Item[];
  id: string;
  deleteList: (id: string) => void;
  setList: React.Dispatch<React.SetStateAction<ListType[]>>;
}

type CardInfo = {
  id: string;
  cName: string;
  description: string | undefined | null;
  activity: Activity[] | [];
};
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
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    id: "",
    cName: "",
    description: "",
    activity: [],
  });

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

  const handleShowModal = (
    e: React.MouseEvent<HTMLElement>,
    cdName: string,
    id: string,
    description: string | undefined | null,
    activity: Activity[] | []
  ) => {
    console.log("gotclicked");
    const target = e.target as HTMLElement | null;
    console.log(target?.closest("div"));
    if (target?.closest("div")) {
      setCardInfo({ cName: cdName, id, description, activity: activity });
      setShowModal(true);
    }
  };

  const handleSubmitItem = (cardName: string) => {
    const date = new Date();
    setList((prev) =>
      prev.map((list) =>
        list.id === id
          ? {
              ...list,
              items: [
                ...list.items,
                {
                  cardName,
                  id: crypto.randomUUID(),
                  activity: [
                    {
                      id: crypto.randomUUID(),
                      comment: `added this task to ${list.listName}`,
                      date: format(date, "MMM dd, yyyy - hh:mm:ss a"),
                    },
                  ],
                },
              ],
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
            <Cards
              setList={setList}
              showModal={handleShowModal}
              cardName={item.cardName}
              id={item.id}
              desc={item.description}
              activity={item.activity}
            />
          ))}
        </div>
      ) : (
        <></>
      )}

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
        <CardModal
          custName={cardInfo.cName}
          id={cardInfo.id}
          showModal={setShowModal}
          setList={setList}
          desc={cardInfo.description}
          setCardInfo={setCardInfo}
          activity={cardInfo.activity}
        />
      )}
    </div>
  );
}
