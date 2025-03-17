import { SetStateAction } from "react";

interface ButtonEditDelProps {
  editComment: boolean;
  edit: React.Dispatch<SetStateAction<boolean>>;
  deleteLog: (id: string) => void;
  id: string;
}

export default function ButtonEditDel({
  editComment,
  edit,
  deleteLog,
  id,
}: ButtonEditDelProps) {
  return (
    <div className="space-x-2 flex items-center">
      <button onClick={() => edit(!editComment)}>Edit</button>
      <span>-</span>
      <button onClick={() => deleteLog(id)}>Delete</button>
    </div>
  );
}
