import { SetStateAction } from "react";

interface DateInputsProps {
  date: string;
  setDate: React.Dispatch<SetStateAction<string>>;
  time: string;
  setTime: React.Dispatch<SetStateAction<string>>;
  labelName: string;
  setShowDate: React.Dispatch<SetStateAction<boolean>>;
  show: boolean;
  startTime: boolean;
}

export default function DateInputs({
  date,
  setDate,
  time,
  setTime,
  labelName,
  show,
  setShowDate,
  startTime,
}: DateInputsProps) {
  return (
    <div className="p-4">
      <label htmlFor="due">{labelName}</label>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={show}
          onChange={(e) => setShowDate(e.target.checked)}
        />
        {startTime ? (
          show ? (
            <input
              type="text"
              className="border px-2 py-1 rounded-sm focus:outline-0 w-24 "
              value={date}
              disabled={!show}
              onChange={(e) => setDate(e.target.value)}
            />
          ) : (
            <input
              type="text"
              disabled
              placeholder="YYYY-MM-DD"
              className="disabled:cursor-not-allowed rounded-sm bg-gray-500 px-1 py-1 w-25 text-gray-400"
              value="YYYY-MM-DD"
            />
          )
        ) : show ? (
          <>
            <input
              type="text"
              className="border px-2 py-1 rounded-sm focus:outline-0 w-24 "
              value={date}
              disabled={!show}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="text"
              className="border px-2 py-1 rounded-sm focus:outline-0 w-24 disabled:cursor-not-allowed"
              value={time}
              disabled={!show}
              onChange={(e) => setTime(e.target.value)}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              className="disabled:cursor-not-allowed rounded-sm bg-gray-500 px-1 py-1 w-25 text-gray-400"
              placeholder="YYYY-MM-DD"
              disabled
            />
            <input
              type="text"
              className="disabled:cursor-not-allowed rounded-sm bg-gray-500 px-1 py-1 w-25 text-gray-400"
              placeholder="h:mm a"
              disabled
            />
          </>
        )}
      </div>
    </div>
  );
}
