import { SetStateAction } from "react";
import {
  Activity,
  Checklist,
  DateType,
  LabelsType,
  ListType,
} from "../../../types/types";

export interface WorkstreamProps {
  showModal: (
    e: React.MouseEvent<HTMLElement>,
    cdName: string,
    id: string,
    description: string | undefined | null,
    activity: Activity[] | [],
    labels: LabelsType[] | [],
    checklist: Checklist[] | [],
    complete: boolean,
    dueDate: string,
    startDate: string,
    showDue?: boolean,
    showStart?: boolean
  ) => void;
  cardName: string;
  id: string;
  desc: string | null | undefined;
  activity: Activity[] | [];
  labels: LabelsType[] | [];
  checklist: Checklist[] | [];
  complete: boolean;
  dueDate: string;
  startDate: string;
  date: {
    dueDate: DateType;
    startDate: DateType;
  };
}

export interface WorkstreamModalProps {
  prevTA: (e: React.MouseEvent) => void;
  handleEdit: (e: React.MouseEvent) => void;
  cardName: string;
  setList: React.Dispatch<SetStateAction<ListType[]>>;
  cardId: string;
  setEdit: React.Dispatch<SetStateAction<boolean>>;
  activities: number;
  openTask: (e: React.MouseEvent<HTMLElement>) => void;
}
