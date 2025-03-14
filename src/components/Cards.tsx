import { SetStateAction, useState } from "react";
import { Activity, ListType } from "../utils/types";
import { FaRegCircle } from "react-icons/fa";
import { BsActivity, BsTextLeft } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import CardEditModal from "./CardEditModal";
interface CardsProp {
  showModal: (
    e: React.MouseEvent<HTMLElement>,
    cdName: string,
    id: string,
    description: string | undefined | null,
    activity: Activity[] | []
  ) => void;
  cardName: string;
  id: string;
  desc: string | null | undefined;
  activity: Activity[] | [];
  setList: React.Dispatch<SetStateAction<ListType[]>>;
}

export default function Cards({
  showModal,
  cardName,
  id,
  desc,
  activity,
  setList,
}: CardsProp) {
  const [showEdit, setShowEdit] = useState(false);
  const [edit, setEdit] = useState(false);
  const activities = activity ? activity.length - 1 : 0;
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEdit(false);
    setEdit(!edit);
  };

  const handleOpenTask = (e: React.MouseEvent<HTMLElement>) => {
    if (edit) {
      e.stopPropagation();
      return;
    }
    showModal(e, cardName, id, desc, activity);
  };

  const handleOpenTask2 = (e: React.MouseEvent<HTMLElement>) => {
    showModal(e, cardName, id, desc, activity);
    setEdit(false);
    setShowEdit(false);
  };

  const handleTextareaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div
      key={id}
      className="bg-[#5b666e] p-2 rounded-lg relative"
      onMouseEnter={() => setShowEdit(true)}
      onMouseLeave={() => setShowEdit(false)}
      onClick={handleOpenTask}
    >
      {showEdit ? (
        <div className="absolute top-2 right-2">
          <button className="hover:cursor-pointer" onClick={handleEdit}>
            <BiEdit />
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className="flex items-center gap-2">
        <button>
          <FaRegCircle />
        </button>
        <label>{cardName}</label>
      </div>

      <div className="flex gap-2">
        {desc && (
          <div className="relative flex gap-2 items-center">
            <div className="group relative">
              <span className="absolute -bottom-6 left-0 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap w-max">
                Task has a description
              </span>
              <span className="flex items-center pointer-events-auto">
                <BsTextLeft />
              </span>
            </div>
          </div>
        )}

        {activities !== 0 && (
          <div className="relative flex gap-2">
            <div className="group relative">
              <span className="absolute -bottom-6 left-0 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Backlog
              </span>
              <span className="flex items-center gap-2 text-sm pointer-events-auto">
                <BsActivity />
                {activities}
              </span>
            </div>
          </div>
        )}
      </div>

      {edit && (
        <CardEditModal
          setList={setList}
          prevTA={handleTextareaClick}
          cardName={cardName}
          handleEdit={handleEdit}
          cardId={id}
          setEdit={setEdit}
          activities={activities}
          openTask={handleOpenTask2}
        />
      )}
    </div>
  );
}
