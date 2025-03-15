import { SetStateAction } from "react";

interface ButtonSaveCancelProps {
  save: () => void;
  setAdd: React.Dispatch<SetStateAction<boolean>> | (() => void);
}

export default function ButtonSaveCancel({
  save,
  setAdd,
}: ButtonSaveCancelProps) {
  return (
    <div className="flex gap-4">
      <button
        className="mt-4 px-4 py-2 bg-[#2d64b0] text-white rounded-lg hover:bg-[#1f4a87] transition-colors duration-200 hover:cursor-pointer"
        onClick={save}
      >
        Save
      </button>
      <button
        className="text-white py-2 px-4 mt-4 hover:cursor-pointer hover:bg-[#b3b2b2] transition-colors duration-200"
        onClick={() => setAdd(false)}
      >
        Cancel
      </button>
    </div>
  );
}
