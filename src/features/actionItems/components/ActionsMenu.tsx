import { useState, useRef } from "react";
import ActionModal from "./ActionModal";
import { BiCalendarAlt, BiLabel } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import Label from "./labels/Label";
import { LabelsType } from "../../../types/types";
import Checklist from "./checklist/Checklist";
import DueDate from "./Dates/DueDate";

type ActionMenuProps = {
  itemId: string;
  labels: LabelsType[] | [];
  dueDate: string;
};

const ActionMenu = ({ itemId, labels, dueDate }: ActionMenuProps) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const actionRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const setRef = (name: string) => (el: HTMLLIElement | null) => {
    actionRefs.current[name] = el;
  };
  const [showLabel, setShowLabel] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showDue, setShowDue] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const actions = [
    {
      name: "Labels",
      fn: "label",
      icon: <BiLabel />,
      fnc: showActionModal,
      show: showLabel,
      children: <Label itemId={itemId} labels={labels} />,
    },
    {
      name: "Checklist",
      fn: "cl",
      icon: <GoChecklist />,
      fnc: showActionModal,
      show: showChecklist,
      children: <Checklist itemId={itemId} closeCl={setActiveAction} />,
    },
    {
      name: "Due Date",
      fn: "dd",
      icon: <BiCalendarAlt />,
      fnc: showActionModal,
      show: showDue,
      children: (
        <DueDate itemId={itemId} closeCl={setActiveAction} ddDate={dueDate} />
      ),
    },
    {
      name: "Start Date",
      fn: "sd",
      icon: <BiCalendarAlt />,
      fnc: showActionModal,
      show: showStart,
      children: <></>,
    },
  ];

  function showActionModal(fn: string) {
    if (fn === "label") {
      setShowLabel(!showLabel);
      setShowChecklist(false);
      setShowDue(false);
      setShowStart(false);
    }
    if (fn === "cl") {
      setShowLabel(false);
      setShowChecklist(!showChecklist);
      setShowDue(false);
      setShowStart(false);
    }
    if (fn === "dd") {
      setShowLabel(false);
      setShowChecklist(false);
      setShowStart(false);
      setShowDue(!showDue);
    }
    if (fn === "sd") {
      setShowStart(!showStart);
      setShowLabel(false);
      setShowChecklist(false);
      setShowDue(false);
    }
  }
  return (
    <ul className="font-semibold space-y-2 relative">
      {actions.map((item) => (
        <li
          key={item.name}
          className="bg-[#727a81] px-2 py-1 text-sm rounded-md relative"
          ref={setRef(item.name)}
        >
          <button
            className="flex gap-1 items-center"
            onClick={() =>
              setActiveAction(activeAction === item.name ? null : item.name)
            }
          >
            <span>{item.icon}</span>
            {item.name}
          </button>

          {activeAction === item.name && actionRefs.current[item.name] && (
            <ActionModal
              parentRef={actionRefs.current[item.name]!}
              closeModal={() => setActiveAction(null)}
            >
              {item.children}
            </ActionModal>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ActionMenu;
