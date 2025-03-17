import React, { SetStateAction } from "react";

type ModalProps = {
  showModal: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function Modal({ showModal, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-10"
      onClick={() => showModal(false)}
    >
      {/* Modal Content */}
      <div
        className="bg-[#5b666e] p-6 rounded-lg shadow-lg w-[50rem] h-[80vh] overflow-visible"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {children}
      </div>
    </div>
  );
}
