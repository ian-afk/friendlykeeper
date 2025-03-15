import { SetStateAction } from "react";

export type Activity = {
  id: string;
  comment: string | undefined;
  date: string;
};

export type Item = {
  cardName: string;
  description?: string | undefined | null;
  id: string;
  activity: Activity[] | [];
};

export type ListType = {
  listName: string;
  id: string;
  items: Item[];
};

export type TextAreaProps = {
  inputValue: string | undefined;
  addInput: boolean;
  setAddInput: React.Dispatch<SetStateAction<boolean>>;
  setInput: React.Dispatch<SetStateAction<string | undefined>>;
  placeHolder: string;
  name: string;
};

export interface UpdatedActType {
  comment: string | undefined;
  id: string;
  date: string;
}

export interface CardInfoProps {
  id: string;
  cName: string;
  description: string | undefined | null;
  activity: Activity[] | [];
}
