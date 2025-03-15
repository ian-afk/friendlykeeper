import { SetStateAction } from "react";
import { Activity, CardInfoProps } from "../../../types/types";

export interface ProgressLogProps {
  id: string;
  setCardInfo: React.Dispatch<SetStateAction<CardInfoProps>>;
  activity: Activity[] | [];
}
