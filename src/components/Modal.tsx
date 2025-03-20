import React, { SetStateAction } from "react";

type ModalProps = {
  showModal: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function Modal({ showModal, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 flex justify-center bg-black/50 backdrop-blur-xs z-10 items-start overflow-y-auto"
      // className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto"
      onClick={() => showModal(false)}
    >
      {/* Modal Content */}
      <div
        // className="bg-[#5b666e] p-6 rounded-lg shadow-lg w-[50rem] max-h-[80vh] mt-20"
        // className="bg-[#5b666e] p-6 rounded-lg shadow-lg w-[50rem] h-[80vh] mt-20"
        className="bg-[#5b666e] p-6 rounded-lg shadow-lg w-[50rem] min-h-fit my-10"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {children}
      </div>
    </div>
  );
}
