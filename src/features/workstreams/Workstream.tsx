import { useState } from "react";
import { LuClock } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { BsActivity, BsTextLeft } from "react-icons/bs";
import WorkstreamModal from "./WorkstreamModal";
import { useList } from "../../context/CoreContext";
import ButtonEdit from "./components/ButtonEdit";
import { WorkstreamProps } from "./types/type";
import { getContrastColor } from "../../utils/globalFunc";
import ChecklistStream from "./components/ChecklistStream";
import { format, isToday, isValid, parse } from "date-fns";

export default function Workstream({
  showModal,
  cardName,
  id,
  desc,
  activity,
  labels,
  checklist,
  complete,
  dueDate,
  startDate,
  date,
}: WorkstreamProps) {
  const { setList, list } = useList();
  const [showEdit, setShowEdit] = useState(false);
  const [edit, setEdit] = useState(false);
  const activities = activity ? activity.length - 1 : 0;
  const checklists = checklist;

  const [checked, setChecked] = useState(complete);

  const bothDate = date?.dueDate?.show && date?.startDate?.show;
  const showStart = date?.startDate.show;
  const showDue = date?.dueDate.show;
  const currDate = new Date();

  const dueRaw = date?.dueDate?.date;
  const startRaw = date?.startDate?.date;

  const due = dueRaw
    ? parse(dueRaw, "MMM dd, yyyy hh:mm a", new Date())
    : currDate;
  const start = startRaw
    ? parse(startRaw, "MMM dd, yyyy hh:mm a", new Date())
    : currDate;

  const isDueSoon = isValid(due) && isToday(due) && currDate < due;
  const handleComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    e.stopPropagation();
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) =>
          item.id === id
            ? {
                ...item,
                complete: e.target.checked,
              }
            : item
        ),
      }))
    );
  };

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
    showModal(
      e,
      cardName,
      id,
      desc,
      activity,
      labels,
      checklist,
      complete,
      dueDate,
      startDate
    );
  };

  const handleOpenTask2 = (e: React.MouseEvent<HTMLElement>) => {
    showModal(
      e,
      cardName,
      id,
      desc,
      activity,
      labels,
      checklist,
      complete,
      dueDate,
      startDate
    );
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

      {/* LABEL SECTION */}
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
      {/* CARD NAME */}
      <div className="flex items-center gap-2 text-white">
        <label
          className="flex items-center space-x-2 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            className="hidden peer"
            checked={checked}
            onChange={(e) => handleComplete(e)}
          />
          <div
            className="w-5 h-5 border-2 border-gray-500 rounded-full flex items-center justify-center text-[12px]"
            style={{
              backgroundColor: complete ? "#57CE6A" : "",
              border: complete ? "#57CE6A" : "",
            }}
          >
            {complete ? <FaCheck /> : <></>}
          </div>
        </label>
        <label>{cardName}</label>
      </div>

      {/* DESCRIPTION section */}
      <div className="flex gap-2 flex-wrap">
        {bothDate ? (
          <div
            className="flex items-center text-sm space-x-2 px-1 rounded-sm text-white mt-1"
            style={{
              backgroundColor: complete
                ? "#57CE6A"
                : currDate >= due
                ? "#d33b3b"
                : isDueSoon
                ? "#f0B000"
                : "",
              border: complete ? "#57CE6A" : "",
            }}
          >
            <span>
              <LuClock />
            </span>
            <span>{`${format(startDate, "MMM dd")} - ${format(
              dueDate,
              "MMM dd"
            )}`}</span>
          </div>
        ) : start ? (
          <></>
        ) : (
          <></>
        )}
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
          <div className="relative flex gap-2 items-center">
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

        {checklists.length !== 0 && (
          <div className="relative flex gap-2 items-center">
            <div className="group relative">
              <span className="absolute -bottom-7 left-0 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Todos
              </span>
              <span className="flex items-center gap-2 text-sm pointer-events-auto">
                <ChecklistStream checklist={checklists} />
              </span>
            </div>
          </div>
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
