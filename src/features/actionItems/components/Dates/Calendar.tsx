import {
  addDays,
  endOfMonth,
  format,
  getDay,
  getDaysInMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import { useState } from "react";

interface CalendarProps {
  date: string;
  setDueDate: (date: string) => void;
  dueDate: string;
}

export default function Calendar({ date, setDueDate, dueDate }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date(date);
  const firstDay = startOfMonth(date);
  // const lastDay = endOfMonth(date);
  const firstDayIndex = getDay(firstDay);

  const prevMonthLastDay = endOfMonth(subMonths(today, 1));
  const prevMonthDays = [...Array(firstDayIndex)].map((_, i) => {
    const date = new Date(
      prevMonthLastDay.getFullYear(),
      prevMonthLastDay.getMonth(),
      getDaysInMonth(prevMonthLastDay) - firstDayIndex + 1 + i
    );
    return { date, label: format(date, "d") };
  });

  const totalDaysInMonth = getDaysInMonth(today);

  const currentMonthDays = [...Array(totalDaysInMonth)].map((_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
    return { date, label: i + 1 };
  });

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const remainingDays = (firstDayIndex + totalDaysInMonth) % 7;
  //   const nextMonthDays = remainingDays ? 7 - remainingDays : 0;
  const nextMonthDaysNeeded = remainingDays ? 7 - remainingDays : 0;
  const nextMonthDays = [...Array(nextMonthDaysNeeded)].map((_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() + 1, i + 1);
    return { date, label: i + 1 };
  });

  const calendarDays = [
    ...prevMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ];

  const handleDateClick = (date: string) => {
    const ndate = new Date(addDays(date, 1));
    setSelectedDate(format(date, "yyyy-MM-dd"));
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
        {calendarDays.map(({ date, label }, index) => {
          const formattedDate = format(date, "yyyy-MM-dd");
          const isSelected = selectedDate === formattedDate;
          const isCurrentMonth = date.getMonth() === today.getMonth();

          return (
            <div
              key={index}
              className={`p-3 flex items-center justify-center rounded-md h-10 cursor-pointer 
              ${isSelected ? "bg-blue-500 text-white" : ""}
              ${dueDate === formattedDate ? "bg-blue-500 text-white" : ""} 
              ${isCurrentMonth ? "hover:border" : "text-gray-400"}`}
              onClick={() => handleDateClick(String(date))}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
