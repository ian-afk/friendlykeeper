export type Activity = {
  id: string;
  comment: string;
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
