import UserIcon from "../../../components/UserIcon";

interface LogItemsProps {
  comment: string | undefined;
  date: string;
  icon: string;
}

export default function LogFooter({ comment, date, icon }: LogItemsProps) {
  return (
    <div className="flex gap-2 items-start">
      <UserIcon icon={icon} />
      <div className="flex flex-col w-full">
        <p className="w-max">{comment}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}
