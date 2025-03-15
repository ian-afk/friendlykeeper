import { BiEdit } from "react-icons/bi";

type ButtonEditProps = {
  edit: (e: React.MouseEvent) => void;
};

export default function ButtonEdit({ edit }: ButtonEditProps) {
  return (
    <div className="absolute top-2 right-2">
      <button className="hover:cursor-pointer" onClick={edit}>
        <BiEdit />
      </button>
    </div>
  );
}
