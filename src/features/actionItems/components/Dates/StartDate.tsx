import { SetStateAction, useState } from "react";
import Calendar from "../../../../components/Calendar";
import DateButtons from "./DateButtons";
import DateHeader from "./DateHeader";
import DateInputs from "./DateInputs";
import { format, subDays } from "date-fns";
import { useList } from "../../../../context/CoreContext";
import { DateType } from "../../../../types/types";

interface StartDateProps {
  itemId: string;
  sdDate: DateType;
  closeCl: React.Dispatch<SetStateAction<string | null>>;
}
export default function StartDate({ sdDate, closeCl, itemId }: StartDateProps) {
  const { setList } = useList();
  const [currMonth, setCurrMonth] = useState(
    format(new Date(Date.now()), "MMMM yyyy")
  );
  const currDate = format(new Date(Date.now()), "MM dd yyyy");

  const [startDate, setStartDate] = useState(
    sdDate?.date
      ? format(sdDate?.date, "yyyy-MM-dd")
      : format(subDays(currDate, 3), "yyyy-MM-dd")
  );

  const [time, setTime] = useState(
    sdDate?.date ? format(sdDate?.date, "hh:mm a") : "0:00 AM"
  );

  const [showDate, setShowDate] = useState(sdDate.show);
  const handleSetStartDate = (date: string) => {
    setStartDate(date);
  };

  const [remove, setRemove] = useState(false);
  const handleClose = () => {
    closeCl(null);
  };

  const handleSaveStartDate = () => {
    if (startDate === null || startDate === "") {
      return alert("Please input start date");
    } else {
      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/;

      const formatDate = format(
        `${startDate} ${timeRegex.test(time) ? time : "00:00 AM"}`,
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
                    startDate: {
                      date: formatDate,
                      show: showDate,
                    },
                  },
                }
              : item
          ),
        }))
      );
    }

    closeCl(null);
  };

  const handleRemove = () => {
    setRemove(!remove);
  };
  const handleDeleteStartDate = () => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                date: {
                  ...item.date,
                  startDate: {
                    ...item.date.startDate,
                    show: false,
                  },
                },
              }
            : item
        ),
      }))
    );
    closeCl(null);
  };
  return (
    <div>
      <DateHeader currDate={currMonth} setCurrDate={setCurrMonth} />
      <div className="p-2">
        <Calendar
          date={currMonth}
          setDate={handleSetStartDate}
          sdDate={startDate}
        />
      </div>
      {/* input fields */}
      <DateInputs
        date={startDate}
        setDate={setStartDate}
        setTime={setTime}
        time={time}
        labelName="Start Date"
        show={showDate}
        setShowDate={setShowDate}
        startTime={true}
      />
      {/* buttons */}
      <DateButtons
        remove={handleDeleteStartDate}
        handleSaveDate={handleSaveStartDate}
      />
    </div>
  );
}
