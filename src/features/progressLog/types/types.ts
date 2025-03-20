import { SetStateAction } from "react";
import { Activity, CardInfoProps, CardInfoType } from "../../../types/types";

export interface ProgressLogProps {
  id: string;
  setCardInfo: React.Dispatch<SetStateAction<CardInfoType>>;
  activity: Activity[] | [];
}
