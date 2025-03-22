import { useEffect, useState } from "react";
import { BsTextLeft } from "react-icons/bs";
import { FaList, FaRegCircle } from "react-icons/fa";
import { useList } from "../../context/CoreContext";
import { Activity, Checklist, LabelsType } from "../../types/types";
import Modal from "../../components/Modal";
import IconHolder from "./components/IconHolder";
import ButtonSaveCancel from "./components/ButtonSaveCancel";
import TextArea from "../../components/forms/TextArea";
import ProgressLog from "../progressLog/ProgressLog";
import ActionsMenu from "./components/ActionsMenu";
import { getContrastColor } from "../../utils/globalFunc";

import ActionCheckList from "./components/checklist/ActionCheckList";
type ActionItemProps = {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

type CardInfoType = {
  id: string | undefined;
  cardName: string;
  description?: string | undefined | null;
  activity: Activity[] | [];
  labels: LabelsType[] | [];
  checklist: Checklist[] | [];
};

export default function ActionItem({ showModal, id }: ActionItemProps) {
  const { setList, list } = useList();
  const [cardInfo, setCardInfo] = useState<CardInfoType>({
    id: "",
    cardName: "",
    description: "",
    activity: [],
    labels: [],
    checklist: [],
  });

  useEffect(() => {
    const listActivity = list
      .flatMap((list) => list.items)
      .find((item) => item.id === id);
    console.log(listActivity);
    if (listActivity) {
      setCardInfo(listActivity);
    }
  }, [list]);

  const [description, setDescription] = useState<string | undefined>(
    cardInfo.description ?? ""
  );

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

  const handleCancelDesc = () => {
    setAddDesc(false);
    setEditDesc(false);
  };

  return (
    <Modal showModal={showModal}>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <button className="text-xl">
              <FaRegCircle className="text-xl" />
            </button>
            <span className="text-[]">{cardInfo.cardName}</span>
          </h2>
          <div className="flex flex-col gap-2 mt-2">
            {/* LABELS */}
            <div className="ml-8 flex flex-wrap">
              {cardInfo.labels ? (
                <div>
                  <span>Labels</span>
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
                <div>
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
          <ActionsMenu itemId={id} labels={cardInfo.labels} />
        </div>
      </div>
    </Modal>
  );
}
