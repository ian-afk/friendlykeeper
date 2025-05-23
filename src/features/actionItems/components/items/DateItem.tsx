import { format, isToday, isValid, parse } from "date-fns";
import { FaChevronDown } from "react-icons/fa";
import { DateType } from "../../../../types/types";

interface DateItemProps {
  complete: boolean;
  date: {
    dueDate: DateType | undefined;
    startDate: DateType | undefined;
  };
}
export default function DateItem({ date, complete }: DateItemProps) {
  const currDate = new Date();

  const dueRaw = date?.dueDate?.date;
  const startRaw = date?.startDate?.date;

  const due = dueRaw
    ? parse(dueRaw, "MMM dd, yyyy hh:mm a", new Date())
    : currDate;
  const start = startRaw
    ? parse(startRaw, "MMM dd, yyyy hh:mm a", new Date())
    : currDate;

  const showBoth = date?.dueDate?.show && date?.startDate?.show;
  const showStart = !date?.dueDate?.show && date?.startDate?.show;
  const isDueSoon = isValid(due) && isToday(due) && currDate < due;
  return (
    <div>
      <label>
        {showBoth ? "Dates" : showStart ? "Start date" : "Due date"}
      </label>
      <div className="px-2 py-2 bg-gray-500 rounded-md text-white flex items-center space-x-1">
        {showBoth ? (
          <span>{`${format(start, "MMM dd")} - ${format(
            due,
            "MMM dd, hh:mm a"
          )}`}</span>
        ) : showStart ? (
          <span>{`${format(start, "MMM dd")}`}</span>
        ) : (
          <>
            <span>{`${format(due, "MMM dd, hh:mm a")}`}</span>
            <span
              className="px-1 rounded-sm text-sm text-black"
              style={{
                backgroundColor: complete
                  ? "#57CE6A"
                  : currDate >= due
                  ? "#d33b3b"
                  : isDueSoon
                  ? "#f0B000"
                  : "",
                border: complete ? "#57CE6A" : "",
              }}
            >
              {complete
                ? "Complete"
                : currDate >= due
                ? "Overdue"
                : isDueSoon
                ? "Due soon"
                : ""}
            </span>
          </>
        )}

        <span className="text-sm">
          <FaChevronDown />
        </span>
      </div>
    </div>
  );
}
