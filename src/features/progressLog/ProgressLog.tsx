import { format, getTime, parse } from "date-fns";
import TextArea from "../../components/forms/TextArea";
import ButtonSaveCancel from "../actionItems/components/ButtonSaveCancel";
import { useList } from "../../context/CoreContext";
import { UpdatedActType } from "../../types/types";
import { useState } from "react";
import { ProgressLogProps } from "./types/types";

export default function ProgressLog({
  id,
  setCardInfo,
  activity,
}: ProgressLogProps) {
  const { setList } = useList();
  const [activityInput, setActivity] = useState<string | undefined>("");

  const [addActivity, setAddActivity] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [editActivity, setEditActivity] = useState(false);
  const handleSaveActivity = () => {
    let updatedActivity: UpdatedActType[] = [];
    const date = new Date(Date.now());
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => {
          if (item.id === id) {
            const newActivity = [
              ...(item.activity || []),
              {
                comment: activityInput,
                id: crypto.randomUUID(),
                date: format(date, "MMM dd, yyyy - hh:mm:ss a"),
              },
            ];
            updatedActivity = newActivity;
            return {
              ...item,
              activity: newActivity,
            };
          }
          return item;
        }),
      }))
    );

    setCardInfo((prev) => ({ ...prev, activity: updatedActivity }));
    setAddActivity(false);
    setEditActivity(false);
    setActivity("");
  };

  const handleDeleteBacklog = (activityId: string) => {
    let updatedActivity: UpdatedActType[] = [];
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => {
          if (item.id === id) {
            const newActivity = item.activity
              ? item.activity.filter((activity) => {
                  console.log(activity.id !== activityId);
                  return activity.id !== activityId;
                })
              : [];
            updatedActivity = newActivity;
            return {
              ...item,
              activity: newActivity,
            };
          }
          return item;
        }),
      }))
    );
    setCardInfo((prev) => ({ ...prev, activity: updatedActivity }));
  };
  return (
    <div>
      <TextArea
        inputValue={activityInput}
        addInput={addActivity}
        setAddInput={setAddActivity}
        setInput={setActivity}
        placeHolder="Write a backlog"
        name="activity"
      />
      {addActivity && (
        <ButtonSaveCancel save={handleSaveActivity} setAdd={setAddActivity} />
      )}

      <div className="space-y-4 mt-4">
        {activity ? (
          [...activity]
            .sort((a, b) => {
              const formatString = "MMM dd, yyyy - hh:mm:ss a";
              const dateA = getTime(parse(a.date, formatString, new Date()));
              const dateB = getTime(parse(b.date, formatString, new Date()));
              return dateB - dateA;
            })
            .map((item, index, arr) => (
              <div key={item.id} className="flex gap-2 items-start">
                {index === arr.length - 1 ? (
                  <div className="flex gap-2 items-start">
                    <div className="rounded-full bg-gray-500 h-10 w-10 aspect-square flex justify-center items-center">
                      STFU
                    </div>
                    <div className="flex flex-col w-full">
                      <p className="w-max">{item.comment}</p>
                      <p>{item.date}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="rounded-full bg-gray-500 h-10 w-10 aspect-square flex justify-center items-center">
                      STFU
                    </div>
                    <div className="flex flex-col w-full">
                      <p className="w-max">{item.date}</p>
                      {editComment ? (
                        <textarea />
                      ) : (
                        <div className="bg-gray-600 text-white py-2 px-2 rounded-md w-full">
                          <p className="text-sm">{item.comment}</p>
                        </div>
                      )}
                      {/* to edit add edit and delete functionality*/}
                      <div className="space-x-2 flex items-center">
                        <button onClick={() => setEditComment(!editComment)}>
                          Edit
                        </button>
                        <span>-</span>
                        <button onClick={() => handleDeleteBacklog(item.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
