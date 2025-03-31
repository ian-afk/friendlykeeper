import { format } from "date-fns";
import { SetStateAction, useState } from "react";

import { useList } from "../../../../context/CoreContext";
import { DateType } from "../../../../types/types";
import DateHeader from "./DateHeader";
import Calendar from "../../../../components/Calendar";
import DateInputs from "./DateInputs";
import DateButtons from "./DateButtons";

interface DueDateProps {
  itemId: string;
  ddDate: DateType;
  closeCl: React.Dispatch<SetStateAction<string | null>>;
}
export default function DueDate({ itemId, closeCl, ddDate }: DueDateProps) {
  const { setList } = useList();
  const [currMonth, setCurrMonth] = useState(
    format(new Date(ddDate.date), "MMMM yyyy")
  );
  const [dueDate, setDueDate] = useState(
    ddDate?.date ? format(ddDate.date, "yyyy-MM-dd") : ""
  );
  const [time, setTime] = useState(
    ddDate?.date ? format(ddDate.date, "hh:mm a") : "0:00 AM"
  );
  const [showDate, setShowDate] = useState(ddDate?.show);

  const handleSetDueDate = (date: string) => {
    setDueDate(date);
  };

  const handleSaveDueDate = () => {
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/;

    const formatDate = format(
      `${dueDate} ${timeRegex.test(time) ? time : "00:00 AM"}`,
      "MMM dd, yyyy hh:mm a"
    );
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                date: {
                  ...item.date,
                  dueDate: {
                    date: formatDate,
                    show: showDate,
                  },
                },
              }
            : item
        ),
      }))
    );

    closeCl(null);
  };

  const handleDeleteDueDate = () => {
    closeCl(null);
  };
  return (
    <div>
      <DateHeader
        currDate={currMonth}
        setCurrDate={setCurrMonth}
        label="Due Date"
      />
      <div className="p-2">
        <Calendar
          date={currMonth}
          sdDate={dueDate}
          setDate={handleSetDueDate}
        />
      </div>
      <DateInputs
        date={dueDate}
        setDate={setDueDate}
        setTime={setTime}
        time={time}
        labelName="Due Date"
        show={showDate}
        setShowDate={setShowDate}
        startTime={false}
      />
      <DateButtons
        remove={handleDeleteDueDate}
        handleSaveDate={handleSaveDueDate}
      />
    </div>
  );
}
