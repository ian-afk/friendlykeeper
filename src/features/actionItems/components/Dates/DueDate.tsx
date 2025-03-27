import { addMonths, addYears, format } from "date-fns";
import { SetStateAction, useState } from "react";

import Calendar from "./Calendar";
import { useList } from "../../../../context/CoreContext";

interface DueDateProps {
  itemId: string;
  ddDate: string;
  closeCl: React.Dispatch<SetStateAction<string | null>>;
}
export default function DueDate({ itemId, closeCl, ddDate }: DueDateProps) {
  const { setList } = useList();
  const [currDate, setCurrDate] = useState(
    format(new Date(Date.now()), "MMMM yyyy")
  );
  const [dueDate, setDueDate] = useState(
    ddDate ? format(ddDate, "yyyy-MM-dd") : ""
  );
  const [time, setTime] = useState(
    ddDate ? format(ddDate, "hh:mm a") : "0:00 AM"
  );

  const handleChangeDate = (btn: string) => {
    setCurrDate((prev) => {
      if (btn === "dec") return format(addMonths(prev, -1), "MMMM yyyy");
      else return format(addMonths(prev, 1), "MMMM yyyy");
    });
  };
  const handleChangeDatePerYear = (btn: string) => {
    setCurrDate((prev) => {
      if (btn === "dec") return format(addYears(prev, -1), "MMMM yyyy");
      else return format(addYears(prev, 1), "MMMM yyyy");
    });
  };

  const handleSetDueDate = (date: string) => {
    setDueDate(date);
  };

  const handleSaveDueDate = (date: string, time: string) => {
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/;

    const formatDate = format(
      `${date} ${timeRegex.test(time) ? time : "00:00 AM"}`,
      "MMM dd, yyyy hh:mm a"
    );
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                dueDate: formatDate,
              }
            : item
        ),
      }))
    );

    closeCl(null);
  };
  return (
    <div>
      <div className="text-center p-2">Due Date</div>
      <div className="p-4 flex justify-between">
        <button onClick={() => handleChangeDatePerYear("dec")}>{`<<`}</button>
        <button onClick={() => handleChangeDate("dec")}>{`<`}</button>
        <span>{currDate}</span>
        <button onClick={() => handleChangeDate("inc")}>{`>`}</button>
        <button onClick={() => handleChangeDatePerYear("inc")}>{`>>`}</button>
      </div>
      <div className="p-2">
        <Calendar
          date={currDate}
          setDueDate={handleSetDueDate}
          dueDate={dueDate}
        />
      </div>
      <div className="p-4">
        <label htmlFor="due">Due Date</label>
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          <input
            type="text"
            className="border px-2 py-1 rounded-sm focus:outline-0 w-24"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <input
            type="text"
            className="border px-2 py-1 rounded-sm focus:outline-0 w-24"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <button
          className="py-1 text-black rounded-sm bg-[#00DCFF] hover:cursor-pointer"
          onClick={() => handleSaveDueDate(dueDate, time)}
        >
          Save
        </button>
        <button
          className="py-1 text-white rounded-sm bg-gray-500 hover:cursor-pointer"
          onClick={() => closeCl(null)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
