import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import List from "./Lists";
import ListCard from "../components/ListCard";
import { ListType } from "../utils/types";

export default function Body() {
  const [list, setList] = useState<ListType[]>(() => {
    const items = JSON.parse(localStorage.getItem("mylist") || "[]");
    return Array.isArray(items) ? items : [];
  });

  useEffect(() => {
    localStorage.setItem("mylist", JSON.stringify(list));
  }, [list]);

  const [addNew, setAddNew] = useState(false);

  const handleClickAdd = () => {
    setAddNew(!addNew);
  };

  const handleClickNew = (listname: string) => {
    setAddNew(false);
    setList((prev) => {
      const updatedList = [
        ...prev,
        { listName: listname, items: [], id: crypto.randomUUID() },
      ];
      localStorage.setItem("mylist", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleDeleteListCard = (id: string) => {
    setList((prev) => {
      const updatedList = prev.filter((item) => item.id !== id);
      localStorage.setItem("mylist", JSON.stringify(updatedList));
      return updatedList;
    });
  };
  return (
    <div className="flex gap-4 items-start">
      <div className="flex space-x-4 items-start">
        {list.map((item, index) => (
          <ListCard
            key={`item-${index}`}
            listName={item.listName}
            items={item.items}
            deleteList={handleDeleteListCard}
            id={item.id}
            setList={setList}
          />
        ))}
      </div>
      {addNew ? (
        <List handleClickAdd={handleClickAdd} addNew={handleClickNew} />
      ) : (
        <div>
          <button
            className="flex items-center gap-2 bg-cyan-600 px-2 py-2 rounded-md text-white w-72"
            onClick={handleClickAdd}
          >
            <span className="">
              <FaPlus />
            </span>
            {list.length > 0 ? "Add another list" : "Add a list"}
          </button>
        </div>
      )}
    </div>
  );
}
