import { SetStateAction, useState } from "react";
import ButtonEditDel from "./ButtonEditDel";
import UserIcon from "../../../components/UserIcon";
import AddNewForm from "../../../components/AddNewForm";
import TextArea from "../../../components/forms/TextArea";
import ButtonSave from "../../../components/buttons/ButtonSave";
import { useList } from "../../../context/CoreContext";
import { CardInfoProps } from "../../../types/types";

interface LogItemsProps {
  date: string;
  comment: string | undefined;
  deleteLog: (id: string) => void;
  id: string;
  icon: string | React.ReactNode;
  setCardInfo: React.Dispatch<SetStateAction<CardInfoProps>>;
}
export default function LogItems({
  comment,
  date,
  deleteLog,
  id,
  icon,
  setCardInfo,
}: LogItemsProps) {
  const { setList } = useList();
  const [activityInput, setActivity] = useState(comment);
  const [addActivity, setAddActivity] = useState(false);
  const [editComment, setEditComment] = useState(false);

  const edit = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(id);
    setEditComment(!editComment);
  };

  const handleSaveLog = () => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => ({
          ...item,
          activity: item.activity.map((activity) => {
            if (activity.id === id) {
              const newAct = { ...activity, comment: activityInput };
              return newAct;
            }
            return activity;
          }),
        })),
      }))
    );

    //  Keeps all activities but updates the matching one
    setCardInfo((prev) => ({
      ...prev,
      activity: prev.activity.map((act) =>
        act.id === id ? { ...act, comment: activityInput } : act
      ),
    }));

    setEditComment(false);
  };
  return (
    <>
      <UserIcon icon={icon} />
      <div className="flex flex-col w-full">
        <span className="w-max">{date}</span>
        {editComment ? (
          //   <AddNewForm />
          <>
            <TextArea
              inputValue={activityInput}
              addInput={addActivity}
              setAddInput={setAddActivity}
              setInput={setActivity}
              name="activity"
            />
            <ButtonSave cancel={edit} save={handleSaveLog} />
          </>
        ) : (
          <div className="bg-gray-600 text-white py-2 px-2 rounded-md w-full">
            <p className="text-sm">{comment}</p>
          </div>
        )}
        {/* to edit add edit and delete functionality*/}
        {!editComment ? (
          <ButtonEditDel
            deleteLog={deleteLog}
            edit={setEditComment}
            editComment={editComment}
            id={id}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
