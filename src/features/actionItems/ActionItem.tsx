import { useEffect, useState } from "react";
import { BsTextLeft } from "react-icons/bs";
import { FaList, FaCheck } from "react-icons/fa";
import { useList } from "../../context/CoreContext";
import { CardInfoType } from "../../types/types";
import Modal from "../../components/Modal";
import IconHolder from "./components/IconHolder";
import ButtonSaveCancel from "./components/ButtonSaveCancel";
import TextArea from "../../components/forms/TextArea";
import ProgressLog from "../progressLog/ProgressLog";
import ActionsMenu from "./components/ActionsMenu";
import { getContrastColor } from "../../utils/globalFunc";

import ActionCheckList from "./components/checklist/ActionCheckList";
import DateItem from "./components/items/DateItem";
type ActionItemProps = {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

export default function ActionItem({ showModal, id }: ActionItemProps) {
  const { setList, list } = useList();
  const [cardInfo, setCardInfo] = useState<CardInfoType>({
    id: "",
    cardName: "",
    description: "",
    complete: false,
    activity: [],
    labels: [],
    checklist: [],
    date: {
      startDate: {
        show: false,
        date: "",
      },
      dueDate: {
        show: false,
        date: "",
      },
    },
  });

  useEffect(() => {
    const listActivity = list
      .flatMap((list) => list.items)
      .find((item) => item.id === id);
    setCardName(listActivity?.cardName ?? "");
    setComplete(listActivity?.complete ?? false);
    if (listActivity) {
      setCardInfo(listActivity);
    }
  }, [list]);

  const [description, setDescription] = useState<string | undefined>(
    cardInfo.description ?? ""
  );
  const [cardName, setCardName] = useState<string>("");
  const [complete, setComplete] = useState<boolean>(cardInfo.complete);
  const [editBp, setEditBp] = useState(false); // edit blueprint or card name
  const [addDesc, setAddDesc] = useState(false);
  const [editDesc, setEditDesc] = useState(false);

  useEffect(() => {
    setDescription(cardInfo.description ?? "");
  }, [cardInfo.description]);

  const handleSaveDescription = () => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) =>
          item.id === id
            ? {
                ...item,
                description,
              }
            : item
        ),
      }))
    );
    setCardInfo((prev) => ({ ...prev, description }));
    setAddDesc(false);
    setEditDesc(false);
  };

  const handleComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) =>
          item.id === id ? { ...item, complete: e.target.checked } : item
        ),
      }))
    );
  };

  const handleCancelDesc = () => {
    setAddDesc(false);
    setEditDesc(false);
  };

  const handleEditCard = () => {
    setEditBp(true);
  };

  const handleSaveCardName = () => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) =>
          item.id === id
            ? {
                ...item,
                cardName: cardName,
              }
            : item
        ),
      }))
    );
    setEditBp(false);
  };

  return (
    <Modal showModal={showModal}>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-8">
          <div className="flex items-center gap-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="hidden peer"
                checked={complete}
                onChange={(e) => handleComplete(e)}
              />
              <div className="w-6 h-6 border-2 border-gray-500 rounded-full flex items-center justify-center peer-checked:bg-green-500 peer-checked:border-green-500">
                {complete ? <FaCheck /> : <></>}
              </div>
            </label>
            {editBp ? (
              <input
                type="text"
                className="px-2 py-1"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                onBlur={() => handleSaveCardName()}
              />
            ) : (
              <h2 className="text-2xl font-bold" onClick={handleEditCard}>
                <span className="text-[]">{cardInfo.cardName}</span>
              </h2>
            )}
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {/* LABELS */}
            <div className="ml-8 flex flex-wrap">
              {cardInfo.labels ? (
                <div>
                  <label>Labels</label>
                  <ul className="flex text-white space-x-2 space-y-1 flex-wrap">
                    {cardInfo.labels
                      .filter((label) => label.show !== false)
                      .map((label) => (
                        <li
                          key={label.id}
                          className="px-2 py-1 rounded-md text-sm"
                          style={{
                            backgroundColor: label.color,
                            color: getContrastColor(label.color),
                          }}
                        >
                          {label.label}
                        </li>
                      ))}
                  </ul>
                </div>
              ) : (
                <></>
              )}
              {/* FOR LATER TODO put dueDates and startDate inside a object DATE */}
              {((cardInfo.date && cardInfo.date.dueDate?.show) ||
                cardInfo.date?.startDate?.show) && (
                <DateItem complete={complete} date={cardInfo.date} />
              )}
            </div>
            {/* DESCRIPTION */}
            <div className="flex items-center gap-2 justify-between">
              <IconHolder icon={<BsTextLeft />} title="Description" />

              {cardInfo.description && (
                <div>
                  <button
                    className="bg-gray-600 text-white py-1 px-4 rounded-md"
                    onClick={() => setEditDesc(!editDesc)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className="mt-2">
              {cardInfo.description && !editDesc ? (
                <div className="flex flex-wrap break-words whitespace-normal">
                  <h3>{description}</h3>
                </div>
              ) : (
                <TextArea
                  inputValue={description}
                  addInput={addDesc}
                  setAddInput={setAddDesc}
                  setInput={setDescription}
                  placeHolder="Add a detailed description"
                  name="description"
                />
              )}

              {addDesc && (
                <ButtonSaveCancel
                  save={handleSaveDescription}
                  setAdd={handleCancelDesc}
                />
              )}
            </div>

            {/* CHECKLIST */}
            <div className="flex flex-col space-y-2">
              {cardInfo.checklist ? (
                <ActionCheckList checklist={cardInfo.checklist} />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <IconHolder icon={<FaList />} title="Activity" />

            <ProgressLog
              activity={cardInfo.activity}
              id={id}
              setCardInfo={setCardInfo}
            />
          </div>
        </div>
        <div className="col-span-2 mt-8">
          <ActionsMenu
            itemId={id}
            labels={cardInfo.labels}
            date={cardInfo.date}
          />
        </div>
      </div>
    </Modal>
  );
}
