import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ListType } from "../types/types";

type ListContextType = {
  list: ListType[];
  handleClickNew: (listname: string) => void;
  addNew: boolean;
  handleClickAdd: () => void;
  handleDeleteListCard: (id: string) => void;
  setList: React.Dispatch<SetStateAction<ListType[]>>;
};

type ListProviderProp = {
  children: React.ReactNode;
};

export const ListContext = createContext<ListContextType | undefined>(
  undefined
);

export function ListProvider({ children }: ListProviderProp) {
  const [list, setList] = useState<ListType[]>(() => {
    const items = JSON.parse(localStorage.getItem("mylist") || "[]");
    return Array.isArray(items) ? items : [];
  });

  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    localStorage.setItem("mylist", JSON.stringify(list));
  }, [list]);

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
  const handleClickAdd = () => {
    setAddNew(!addNew);
  };

  const handleDeleteListCard = (id: string) => {
    setList((prev) => {
      const updatedList = prev.filter((item) => item.id !== id);
      localStorage.setItem("mylist", JSON.stringify(updatedList));
      return updatedList;
    });
  };
  return (
    <ListContext.Provider
      value={{
        list,
        handleClickNew,
        handleClickAdd,
        handleDeleteListCard,
        addNew,
        setList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList must be used within a ListProvider");
  }
  return context;
};

export default ListProvider;
