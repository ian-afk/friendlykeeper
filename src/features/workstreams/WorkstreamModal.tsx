import { useEffect, useState } from "react";
import Actions from "./components/Actions";
import ButtonSaveCard from "./components/ButtonSaveCard";
import WorkstreamActivities from "./WorkstreamActivities";
import { WorkstreamModalProps } from "./types/type";

export default function WorkstreamModal({
  prevTA,
  cardName,
  handleEdit,
  setList,
  cardId,
  setEdit,
  activities,
  openTask,
}: WorkstreamModalProps) {
  const [cardNameInput, setCardName] = useState(cardName);

  useEffect(() => {
    setCardName(cardName ?? "");
  }, [cardName]);

  const handleSaveCard = () => {
    setList((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => {
          if (item.id == cardId) {
            console.log(true);
            return {
              ...item,
              cardName: cardNameInput,
            };
          }

          return item;
        }),
      }))
    );
    setEdit(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-20"
        onClick={handleEdit}
      ></div>

      {/* Modal Positioned Absolutely */}
      <div className="absolute left-0 rounded-lg z-30 top-0 ">
        <div className="flex gap-4 items-start">
          <div>
            <div className="bg-[#5b666e] p-2 rounded-lg shadow-2xl w-[17rem] ">
              <div>
                <textarea
                  className="resize-none w-full focus:outline-0"
                  name="cardname"
                  id="cardname"
                  rows={5}
                  value={cardNameInput}
                  onClick={prevTA}
                  onChange={(e) => setCardName(e.target.value)}
                ></textarea>
              </div>
              <WorkstreamActivities activities={activities} />
            </div>
            <ButtonSaveCard save={handleSaveCard} cancel={handleEdit} />
          </div>
          <div>
            <Actions openTask={openTask} />
          </div>
        </div>
      </div>
    </>
  );
}
