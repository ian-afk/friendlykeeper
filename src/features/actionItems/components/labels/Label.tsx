import { useState } from "react";
import { useList } from "../../../../context/CoreContext";
import LabelNew from "./LabelNew";
import { LabelsType } from "../../../../types/types";
import LabelItems from "./LabelItems";

type LabelProps = {
  itemId: string;
  labels: LabelsType[] | [];
};

export default function Label({ itemId, labels }: LabelProps) {
  const { setList } = useList();
  const [newLabel, setNewLabel] = useState(false);
  const handleNewLabel = () => {
    // setLabels((prev) => [...prev, { id: crypto.randomUUID(), label: "" }]);
    setNewLabel(!newLabel);
  };
  return (
    <div>
      {newLabel ? (
        <LabelNew setNew={setNewLabel} back={handleNewLabel} itemId={itemId} />
      ) : (
        <>
          <div className="text-center p-2">Labels</div>
          <div className="p-4">
            <div>
              <span>Labels</span>
            </div>
            {labels ? (
              <ul className="flex space-y-1 flex-col my-2">
                {labels.map((item) => (
                  <LabelItems
                    key={item.id}
                    show={item.show}
                    color={item.color}
                    id={item.id}
                    label={item.label}
                  />
                ))}
              </ul>
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
        </>
      )}
    </div>
  );
}
