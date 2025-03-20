import { useState } from "react";
import { useList } from "../../../context/CoreContext";
import LabelNew from "./LabelNew";

interface Label {
  id: string;
  label: string;
}

type LabelProps = {
  itemId: string;
};

export default function Label({ itemId }: LabelProps) {
  const { setList } = useList();
  const [labels, setLabels] = useState<Label[]>([]);
  const [newLabel, setNewLabel] = useState(false);
  const handleNewLabel = () => {
    // setLabels((prev) => [...prev, { id: crypto.randomUUID(), label: "" }]);
    setNewLabel(true);
  };
  return (
    <div>
      {newLabel ? (
        <LabelNew setNew={setNewLabel} />
      ) : (
        <div className="p-4">
          <div>
            <span>Labels</span>
          </div>
          {labels ? (
            <>
              {labels.map((item) => (
                <div>TEST</div>
              ))}
            </>
          ) : (
            <></>
          )}
          <div>
            <button
              className="bg-[#6b7681] w-full py-1 rounded-sm"
              onClick={handleNewLabel}
            >
              Create a new label
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
