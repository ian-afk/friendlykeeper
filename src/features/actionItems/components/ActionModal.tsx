import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
interface ActionModalProps {
  parentRef: HTMLLIElement | null;
  closeModal: () => void;
  acname: string;
  children: React.ReactNode;
}

const ActionModal: React.FC<ActionModalProps> = ({
  parentRef,
  closeModal,
  acname,
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
      className="fixed bg-[#64696d] p-4 rounded-lg shadow-xl border-1 border-gray-500 z-50 mt-2 w-[18rem]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onClick={closeModal}
    >
      <div className="relative">
        <h3 className="font-semibold text-center">{acname}</h3>
        <button
          className="text-white absolute top-0 right-0"
          onClick={closeModal}
        >
          <IoMdClose />
        </button>
      </div>
      {children}
    </div>
  );
};

export default ActionModal;
