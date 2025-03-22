import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
interface ActionModalProps {
  parentRef: HTMLLIElement | HTMLDivElement | null;
  closeModal: () => void;
  children: React.ReactNode;
}

const ActionModal: React.FC<ActionModalProps> = ({
  parentRef,
  closeModal,
  children,
}) => {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    if (parentRef) {
      const rect = parentRef.getBoundingClientRect();
      console.log("Parent element position:", rect); // 🔥 Debugging log

      setPosition({
        top: rect.bottom, // Adjust based on needs
        left: rect.left,
      });
    } else {
      console.warn("ParentRef is null"); // Debug warning
    }
  }, [parentRef]);

  if (!position) return null; // Prevent rendering until position is set

  return (
    <div
      className="fixed bg-[#64696d] rounded-lg shadow-xl border-1 border-gray-500 z-50 mt-2 w-[20rem]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="relative">
        <button
          className="text-white absolute top-2 right-2"
          onClick={closeModal}
        >
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ActionModal;
