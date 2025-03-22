import { TextAreaProps } from "../../types/types";

export default function TextArea({
  inputValue,
  addInput,
  setAddInput,
  setInput,
  name,
  placeHolder,
  maxRow = 10,
}: TextAreaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  return (
    <>
      <textarea
        className="resize-none border-1 rounded-sm w-full p-2 focus:outline-0"
        name={name}
        placeholder={placeHolder}
        id={name}
        value={inputValue}
        rows={addInput ? maxRow : 2}
        onClick={() => setAddInput(true)}
        onChange={handleChange}
      ></textarea>
    </>
  );
}
