interface DateButtonsProps {
  remove: () => void;
  handleSaveDate: () => void;
}

export default function DateButtons({
  remove,
  handleSaveDate,
}: DateButtonsProps) {
  return (
    <div className="flex flex-col p-2 gap-2">
      <button
        className="py-1 text-black rounded-sm bg-[#00DCFF] hover:cursor-pointer"
        onClick={handleSaveDate}
      >
        Save
      </button>
      <button
        className="py-1 text-white rounded-sm bg-gray-500 hover:cursor-pointer"
        onClick={remove}
      >
        Remove
      </button>
    </div>
  );
}
