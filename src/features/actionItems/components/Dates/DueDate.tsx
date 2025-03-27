import { addMonths, addYears, format } from "date-fns";
import { SetStateAction, useState } from "react";

import Calendar from "./Calendar";

interface DueDateProps {
  closeCl: React.Dispatch<SetStateAction<string | null>>;
}
export default function DueDate({ closeCl }: DueDateProps) {
  const [currDate, setCurrDate] = useState(
    format(new Date(Date.now()), "MMMM yyyy")
  );
  const [dueDate, setDueDate] = useState("");

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
    console.log(date);
    setDueDate(date);
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
        <Calendar date={currDate} setDueDate={handleSetDueDate} />
      </div>
      <div className="p-4">
        <label htmlFor="due">Due Date</label>
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          <input
            type="text"
            className="border px-2 py-1 rounded-sm focus:outline-0"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <button
          className="py-1 text-black rounded-sm bg-[#00DCFF] hover:cursor-pointer"
          onClick={() => closeCl(null)}
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
