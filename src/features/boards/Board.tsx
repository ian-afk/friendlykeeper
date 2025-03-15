import AddNewForm from "../../components/AddNewForm";
import { useList } from "../../context/CoreContext";

import Blueprint from "../blueprints/Blueprints";
import Button from "./components/Button";

export default function Board() {
  const { list, handleClickNew, addNew, handleClickAdd } = useList();
  return (
    <div>
      <div className="flex gap-4 items-start">
        <div className="flex space-x-4 items-start">
          {list.map((item, index) => (
            <Blueprint
              key={`item-${index}`}
              listName={item.listName}
              items={item.items}
              id={item.id}
            />
          ))}
        </div>
        {addNew ? (
          <div className="flex flex-col bg-cyan-950 p-2 rounded-lg w-72">
            <AddNewForm
              handleClickAdd={handleClickAdd}
              addNew={handleClickNew}
              button="list"
            />
          </div>
        ) : (
          <Button listLength={list.length} handleClickAdd={handleClickAdd} />
        )}
      </div>
    </div>
  );
}
