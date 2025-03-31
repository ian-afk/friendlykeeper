import { SetStateAction } from "react";

export type Activity = {
  id: string;
  comment: string | undefined;
  date: string;
};

export type LabelsType = {
  id: string;
  label: string;
  color: string;
  show: boolean;
};

export type ChecklistItem = {
  id: string;
  clTitle: string | undefined;
  dueDate: string;
  done: boolean;
};

export type Checklist = {
  id: string;
  title: string;
  checklist: ChecklistItem[] | [];
};

export type DateType = {
  show: boolean;
  date: string;
};
export type Item = {
  cardName: string;
  description?: string | undefined | null;
  id: string;
  complete: boolean;
  labels: LabelsType[] | [];
  activity: Activity[] | [];
  checklist: Checklist[] | [];
  date: {
    dueDate: DateType;
    startDate: DateType;
  };
};

export type ListType = {
  listName: string;
  id: string;
  items: Item[];
};

export type TextAreaProps = {
  inputValue: string | undefined; // useState [input, ___]
  setInput: React.Dispatch<SetStateAction<string | undefined>>; // [___, setInut]
  addInput: boolean; // to spread the textarea if focused
  setAddInput: React.Dispatch<SetStateAction<boolean>>; // state function
  placeHolder?: string;
  name: string; //text area name
  maxRow?: number;
};

export interface UpdatedActType {
  comment: string | undefined;
  id: string;
  date: string;
}

export interface CardInfoType {
  id: string | undefined;
  cardName: string;
  description?: string | undefined | null;
  complete: boolean;
  activity: Activity[] | [];
  labels: LabelsType[] | [];
  checklist: Checklist[] | [];
  date: {
    startDate: DateType;
    dueDate: DateType;
  };
}

export interface CardInfoProps {
  id: string;
  cName: string;
  description: string | undefined | null;
  activity: Activity[] | [];
  labels: LabelsType[] | [];
}
