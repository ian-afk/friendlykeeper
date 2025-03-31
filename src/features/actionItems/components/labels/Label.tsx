import { useState } from "react";
import LabelNew from "./LabelNew";
import { LabelsType } from "../../../../types/types";
import LabelItems from "./LabelItems";
import LabelEdit from "./LabelEdit";

type LabelProps = {
  itemId: string;
  labels: LabelsType[] | [];
};

type EditLabel = {
  id: string;
  label: string;
  color: string;
};

export default function Label({ itemId, labels }: LabelProps) {
  const [label, setLabel] = useState<EditLabel>({
    id: "",
    label: "",
    color: "",
  });

  const [newLabel, setNewLabel] = useState(false);
  const [editLabel, setEditLabel] = useState(false);
  const handleNewLabel = () => {
    setNewLabel(!newLabel);
  };
  const handleEditLabel = (id: string, label: string, color: string) => {
    setLabel({ id, label, color });
    setEditLabel(!editLabel);
  };
  return (
    <div>
      {editLabel ? (
        <LabelEdit setEdit={setEditLabel} editLabel={label} />
      ) : (
        <>
          {newLabel ? (
            <LabelNew
              setNew={setNewLabel}
              back={handleNewLabel}
              itemId={itemId}
            />
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
                        edit={handleEditLabel}
                      />
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
                <div>
                  <button
                    className="bg-[#6b7681] w-full py-1 rounded-sm hover:cursor-pointer"
                    onClick={handleNewLabel}
                  >
                    Create a new label
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
