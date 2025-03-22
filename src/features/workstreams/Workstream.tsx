import { useState } from "react";

import { FaRegCircle } from "react-icons/fa";
import { BsActivity, BsTextLeft } from "react-icons/bs";
import WorkstreamModal from "./WorkstreamModal";
import { useList } from "../../context/CoreContext";
import ButtonEdit from "./components/ButtonEdit";
import { WorkstreamProps } from "./types/type";
import { getContrastColor } from "../../utils/globalFunc";
import { LuListTodo } from "react-icons/lu";

export default function Workstream({
  showModal,
  cardName,
  id,
  desc,
  activity,
  labels,
  checklist,
}: WorkstreamProps) {
  const { setList, list } = useList();
  const [showEdit, setShowEdit] = useState(false);
  const [edit, setEdit] = useState(false);
  const activities = activity ? activity.length - 1 : 0;
  const checklists = list.flatMap((list) => ({
    ...list,
    items: list.items.map((item) => ({
      ...item,
      checklist: item.checklist.map((check) => ({
        ...check,
        checklist: check.checklist.filter((check) => check.done === true),
      })),
    })),
  })).length;
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
    showModal(e, cardName, id, desc, activity, labels);
  };

  const handleOpenTask2 = (e: React.MouseEvent<HTMLElement>) => {
    showModal(e, cardName, id, desc, activity, labels);
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
      {showEdit ? <ButtonEdit edit={handleEdit} /> : <></>}

      <div>
        <ul className="flex flex-wrap space-x-1 space-y-1">
          {labels
            .filter((label) => label.show === true && label.color !== "")
            .map((label) => (
              <li
                key={label.id}
                style={{
                  backgroundColor: label.color,
                  color: getContrastColor(label.color),
                }}
                className="rounded-sm px-2 text-sm"
              >
                {label.label}
              </li>
            ))}
        </ul>
      </div>
      {/* TODO add a functionality of the button to have checkmark if done */}
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

        {checklists ? (
          <div className="flex items-center">
            <LuListTodo />
            <span>{checklists}</span>
          </div>
        ) : (
          <></>
        )}
      </div>

      {edit && (
        <WorkstreamModal
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
