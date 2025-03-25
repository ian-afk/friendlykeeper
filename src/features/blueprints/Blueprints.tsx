import { Activity, Checklist, LabelsType, ListType } from "../../types/types";

import { useEffect, useRef, useState } from "react";

import AddNewForm from "../../components/AddNewForm";
import { format } from "date-fns";

import Actions from "./components/Actions";
import { useList } from "../../context/CoreContext";
import Workstream from "../workstreams/Workstream";
import ButtonMenu from "./components/ButtonMenu";
import ButtonAdd from "./components/ButtonAdd";
import ActionItem from "../actionItems/ActionItem";

type CardInfo = {
  id: string;
  cName: string;
  description: string | undefined | null;
  activity: Activity[] | [];
  labels: LabelsType[] | [];
  checklist: Checklist[] | [];
};
export default function Blueprint({ listName, items, id }: ListType) {
  const { handleDeleteListCard, setList } = useList();
  const [addNew, setAddNew] = useState(false);
  const [menu, setMenu] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    id: "",
    cName: "",
    description: "",
    activity: [],
    labels: [],
    checklist: [],
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
    activity: Activity[] | [],
    labels: LabelsType[] | [],
    checklist: Checklist[] | []
  ) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest("div")) {
      setCardInfo({
        cName: cdName,
        id,
        description,
        activity: activity,
        labels: labels,
        checklist: checklist,
      });
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
                  labels: [],
                  complete: false,
                  checklist: [],
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

  const handleAddWorkstream = () => {
    handleAddItem();
    setMenu(false);
  };

  return (
    <div
      className="space-y-2 flex flex-col bg-cyan-950 p-2 rounded-lg w-72 text-gray-300 flex-shrink-0"
      ref={divRef}
    >
      {/* LIST or BLUEPRINT HEADER */}
      <div className="flex justify-between relative px-2">
        <label htmlFor="">{listName}</label>
        <ButtonMenu showMenu={handleShowMenu} menu={menu} />
        {menu && (
          <Actions
            deleteListCard={handleDeleteListCard}
            id={id}
            showMenu={handleShowMenu}
          />
        )}
      </div>
      {/* END OF HEADER */}
      {items.length > 0 ? (
        <div className="flex flex-col space-y-2">
          {items.map((item, _) => (
            <Workstream
              key={item.id}
              showModal={handleShowModal}
              cardName={item.cardName}
              id={item.id}
              desc={item.description}
              activity={item.activity}
              labels={item.labels}
              checklist={item.checklist}
              complete={item.complete}
            />
          ))}
        </div>
      ) : (
        <></>
      )}

      {addNew ? (
        <AddNewForm
          handleClickAdd={handleAddItem}
          button="a card"
          addNew={handleSubmitItem}
        />
      ) : (
        <ButtonAdd addWstream={handleAddWorkstream} />
      )}
      {showModal && <ActionItem id={cardInfo.id} showModal={setShowModal} />}
    </div>
  );
}
