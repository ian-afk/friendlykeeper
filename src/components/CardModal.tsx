import { FaRegCircle, FaList } from "react-icons/fa";
import { BsTextLeft } from "react-icons/bs";
import React, { act, useEffect, useState } from "react";
import { format, getTime, parse } from "date-fns";
import { Activity, Item, ListType } from "../utils/types";
import { LuDot } from "react-icons/lu";

type CardInfo = {
  id: string;
  cName: string;
  description: string | undefined | null;
  activity: Activity[] | [];
};

type ModalProps = {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;

  custName: string;
  id: string;
  setList: React.Dispatch<React.SetStateAction<ListType[]>>;
  desc: string | undefined | null;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
  activity: Activity[] | [];
};

export default function CardModal({
  showModal,
  custName,
  id,
  setList,
  desc,
  setCardInfo,
  activity,
}: // items,
ModalProps) {
  const [activityInput, setActivity] = useState<string>("");
  const [description, setDescription] = useState<string | undefined>(
    desc ?? ""
  );

  const [addDesc, setAddDesc] = useState(false);
  const [addActivity, setAddActivity] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [editActivity, setEditActivity] = useState(false);
  const [editComment, setEditComment] = useState(false);

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

  const handleSaveActivity = () => {
    let updatedActivity: { comment: string; id: string; date: string }[] = [];
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

  const handleCancelDesc = () => {
    setAddDesc(false);
    setEditDesc(false);
  };

  const handleDeleteBacklog = (activityId: string) => {
    console.log("activityid", activityId);
    console.log("cardid", id);
    let updatedActivity: { comment: string; id: string; date: string }[] = [];
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
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-10"
      onClick={() => showModal(false)}
    >
      {/* Modal Content */}
      <div
        className="bg-[#5b666e] p-6 rounded-lg shadow-lg w-[40rem] h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <button className="text-xl">
            <FaRegCircle className="text-xl" />
          </button>
          <span className="text-[]">{custName}</span>
        </h2>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                <BsTextLeft />
              </span>
              <p className="text-xl font-semibold">Description</p>
            </div>
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
              <textarea
                className="resize-none border-1 rounded-sm w-full p-2 focus:outline-0"
                name="description"
                placeholder="Add a detailed description"
                id="desc"
                value={description}
                rows={addDesc ? 10 : 2}
                onClick={() => setAddDesc(true)}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            )}

            {addDesc && (
              <div className="flex gap-4">
                <button
                  className="mt-4 px-4 py-2 bg-[#2d64b0] text-white rounded-lg hover:bg-[#1f4a87] transition-colors duration-200 hover:cursor-pointer"
                  onClick={handleSaveDescription}
                >
                  Save
                </button>
                <button
                  className="text-white py-2 px-4 mt-4 hover:cursor-pointer hover:bg-[#b3b2b2] transition-colors duration-200"
                  onClick={handleCancelDesc}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              <FaList />
            </span>
            <p className="text-xl font-semibold">Activity</p>
          </div>
          <div>
            <textarea
              className="resize-none border-1 rounded-sm w-full p-2 focus:outline-0"
              name="activity"
              placeholder="Write a backlog"
              id="desc"
              value={activityInput}
              rows={addActivity ? 8 : 1}
              onClick={() => setAddActivity(true)}
              onChange={(e) => setActivity(e.target.value)}
            ></textarea>
            {addActivity && (
              <div className="flex gap-4">
                <button
                  className="mt-4 px-4 py-2 bg-[#2d64b0] text-white rounded-lg hover:bg-[#1f4a87] transition-colors duration-200 hover:cursor-pointer"
                  onClick={handleSaveActivity}
                >
                  Save
                </button>
                <button
                  className="text-white py-2 px-4 mt-4 hover:cursor-pointer hover:bg-[#b3b2b2] transition-colors duration-200"
                  onClick={() => setAddActivity(false)}
                >
                  Cancel
                </button>
              </div>
            )}

            <div className="space-y-4 mt-4">
              {activity ? (
                [...activity]
                  .sort((a, b) => {
                    const formatString = "MMM dd, yyyy - hh:mm:ss a";
                    const dateA = getTime(
                      parse(a.date, formatString, new Date())
                    );
                    const dateB = getTime(
                      parse(b.date, formatString, new Date())
                    );
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
                            <div className="space-x-2 flex items-center">
                              <button>Edit</button>
                              <span>-</span>
                              <button
                                onClick={() => handleDeleteBacklog(item.id)}
                              >
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
              {/* <div className="flex gap-2 items-start">
                <div className="rounded-full bg-gray-500 h-10 w-10 aspect-square flex justify-center items-center">
                  STFU
                </div>
                <div className="flex flex-col w-full">
                  <p className="w-max">{activity[0].comment}</p>
                  <p>{activity ? activity[0].date : <></>}</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
