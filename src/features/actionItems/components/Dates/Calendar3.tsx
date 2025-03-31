import {
  addDays,
  endOfMonth,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  isFirstDayOfMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import { useState } from "react";

interface CalendarProps {
  date: string;
  setDueDate: (date: string) => void;
}

export default function Calendar({ date, setDueDate }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date(date);
  const firstDay = startOfMonth(date);
  const lastDay = endOfMonth(date);
  const firstDayIndex = getDay(firstDay);

  const prevMonthLastDay = endOfMonth(subMonths(today, 1));

  const arrLength = format(lastDay, "d");

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const totalDaysInMonth = getDaysInMonth(today);
  const remainingDays = (firstDayIndex + totalDaysInMonth) % 7;
  const nextMonthDays = remainingDays ? 7 - remainingDays : 0;

  const handleDateClick = (date: string) => {
    const ndate = new Date(addDays(date, 1));
    setSelectedDate(format(date, "yyyy-MM-dd"));
    // console.log("Clicked date:", ndate.toISOString().split("T")[0]);
    setDueDate(ndate.toISOString().split("T")[0]); // YYYY-MM-DD
  };
  return (
    <div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div key={day} className="p-2 text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {/* Previous Month Days */}
        {[...Array(firstDayIndex)].map((_, index) => {
          const prevDate = new Date(prevMonthLastDay);
          prevDate.setDate(prevDate.getDate() - (firstDayIndex - 1 - index));
          return (
            <div
              key={`prev-${index}`}
              className="p-3 text-gray-400 flex items-center justify-center hover:border hover:cursor-pointer rounded-md h-10"
              onClick={() => handleDateClick(format(prevDate, "MM dd, yyyy"))}
            >
              {format(prevDate, "d")}
            </div>
          );
        })}

        {/* Current Month Days */}
        {[...Array(Number(arrLength))].map((_, i) => {
          const currentDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            i + 1
          );
          const formattedDate = format(currentDate, "yyyy-MM-dd");
          return (
            <div
              key={i + 1}
              className={`p-3 flex items-center justify-center hover:border hover:cursor-pointer rounded-md h-10  ${
                selectedDate === formattedDate
                  ? "bg-blue-500 text-white"
                  : "hover:border"
              }`}
              onClick={() =>
                handleDateClick(format(currentDate, "MM dd, yyyy"))
              }
            >
              {i + 1}
            </div>
          );
        })}

        {/* Next Month Days */}
        {[...Array(nextMonthDays)].map((_, i) => {
          const nextDate = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            i + 1
          );
          return (
            <div
              key={`next-${i}`}
              className="p-3 text-gray-400 flex items-center justify-center hover:border hover:cursor-pointer rounded-md h-10"
              onClick={() => handleDateClick(format(nextDate, "MM dd, yyyy"))}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
