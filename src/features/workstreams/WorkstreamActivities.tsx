import { BsActivity, BsClock } from "react-icons/bs";

interface WSActivitiesProps {
  activities: number;
}

export default function WorkstreamActivities({
  activities,
}: WSActivitiesProps) {
  return (
    <div className="flex space-x-4">
      <div
        className={`relative text-sm bg-amber-200 text-black px-2 rounded-sm flex items-center gap-2  group`}
      >
        <span className="absolute bottom-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Due date
        </span>
        <span className="font-bold">
          <BsClock />
        </span>
        March 14
      </div>
      {activities !== 0 && (
        <div className="relative flex gap-2 items-center text-sm group">
          <span className="absolute bottom-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Backlog
          </span>
          <span>
            <BsActivity />
          </span>
          <span>{activities}</span>
        </div>
      )}
    </div>
  );
}
