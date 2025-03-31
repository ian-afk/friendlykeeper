import { addMonths, addYears, format } from "date-fns";
import { SetStateAction } from "react";

interface DateHeaderProps {
  setCurrDate: React.Dispatch<SetStateAction<string>>;
  currDate: string;
}

export default function DateHeader({ setCurrDate, currDate }: DateHeaderProps) {
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
  return (
    <>
      <div className="text-center p-2">Start Date</div>
      <div className="p-4 flex justify-between">
        <button onClick={() => handleChangeDatePerYear("dec")}>{`<<`}</button>
        <button onClick={() => handleChangeDate("dec")}>{`<`}</button>
        <span>{currDate}</span>
        <button onClick={() => handleChangeDate("inc")}>{`>`}</button>
        <button onClick={() => handleChangeDatePerYear("inc")}>{`>>`}</button>
      </div>
    </>
  );
}
