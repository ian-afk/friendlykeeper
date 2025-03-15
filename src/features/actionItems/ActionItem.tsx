import { useEffect, useState } from "react";
import { BsTextLeft } from "react-icons/bs";
import { FaList, FaRegCircle } from "react-icons/fa";
import { useList } from "../../context/CoreContext";
import { Activity, CardInfoProps } from "../../types/types";
import Modal from "../../components/Modal";
import IconHolder from "./components/IconHolder";
import ButtonSaveCancel from "./components/ButtonSaveCancel";
import TextArea from "../../components/forms/TextArea";
import ProgressLog from "../progressLog/ProgressLog";

type ActionItemProps = {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  custName: string;
  id: string;
  desc: string | undefined | null;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfoProps>>;
  activity: Activity[] | [];
};

export default function ActionItem({
  showModal,
  custName,
  id,
  desc,
  setCardInfo,
  activity,
}: ActionItemProps) {
  const { setList } = useList();

  const [description, setDescription] = useState<string | undefined>(
    desc ?? ""
  );

  const [addDesc, setAddDesc] = useState(false);

  const [editDesc, setEditDesc] = useState(false);

  useEffect(() => {
    setDescription(desc ?? "");
  }, [desc]);

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
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <button className="text-xl">
          <FaRegCircle className="text-xl" />
        </button>
        <span className="text-[]">{custName}</span>
      </h2>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-2 justify-between">
          <IconHolder icon={<BsTextLeft />} title="Description" />

          {desc && (
            <div>
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded-md"
                onClick={() => setEditDesc(!editDesc)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        {/* DESCRIPTION */}
        <div className="mt-2">
          {desc && !editDesc ? (
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
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <IconHolder icon={<FaList />} title="Activity" />

        <ProgressLog activity={activity} id={id} setCardInfo={setCardInfo} />
      </div>
    </Modal>
  );
}
