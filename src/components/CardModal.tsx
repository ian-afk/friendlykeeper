import { FaRegCircle, FaList } from "react-icons/fa";
import { BsTextLeft } from "react-icons/bs";
import { useState } from "react";
type ModalProps = {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  custName: string;
};

export default function CardModal({
  showModal,
  message,
  custName,
}: ModalProps) {
  const [addDesc, setAddDesc] = useState(false);
  const [addActivity, setAddActivity] = useState(false);
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-10"
      onClick={() => showModal(false)}
    >
      {/* Modal Content */}
      <div
        className="bg-[#5b666e] p-6 rounded-lg shadow-lg w-[40rem]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <button className="text-xl">
            <FaRegCircle className="text-xl" />
          </button>
          <span className="text-[]">{custName}</span>
        </h2>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              <BsTextLeft />
            </span>
            <p className="text-xl font-semibold">Description</p>
          </div>
          <div className="mt-2">
            <textarea
              className="resize-none border-1 rounded-sm w-full p-2 focus:outline-0"
              name="description"
              placeholder="Add a detailed description"
              id="desc"
              rows={addDesc ? 10 : 2}
              onClick={() => setAddDesc(true)}
            ></textarea>
            {addDesc && (
              <div className="flex gap-4">
                <button className="mt-4 px-4 py-2 bg-[#2d64b0] text-white rounded-lg hover:bg-[#1f4a87] transition-colors duration-200 hover:cursor-pointer">
                  Save
                </button>
                <button
                  className="text-white py-2 px-4 mt-4 hover:cursor-pointer hover:bg-[#b3b2b2] transition-colors duration-200"
                  onClick={() => setAddDesc(false)}
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
              placeholder="Write a comment"
              id="desc"
              rows={addActivity ? 8 : 1}
              onClick={() => setAddActivity(true)}
            ></textarea>
            {addActivity && (
              <div className="flex gap-4">
                <button className="mt-4 px-4 py-2 bg-[#2d64b0] text-white rounded-lg hover:bg-[#1f4a87] transition-colors duration-200 hover:cursor-pointer">
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
          </div>
        </div>
      </div>
    </div>
  );
}
