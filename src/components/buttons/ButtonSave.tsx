import { IoMdClose } from "react-icons/io";

interface ButtonSaveProps {
  save: () => void;
  cancel: (e: React.MouseEvent) => void;
}

export default function ButtonSave({ cancel, save }: ButtonSaveProps) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <button
        className="bg-cyan-200 p-2 px-3 rounded-md text-sm text-black gap-2 hover:cursor-pointer"
        onClick={save}
      >
        Save
      </button>
      <button
        className="text-white text-2xl hover:cursor-pointer"
        onClick={cancel}
      >
        {/* onClick={handleClickAdd} */}
        <IoMdClose />
      </button>
    </div>
  );
}
