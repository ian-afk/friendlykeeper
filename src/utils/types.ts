export type Item = {
  cardName: string;
  description?: string;
  id: string;
};

export type ListType = {
  listName: string;
  id: string;
  items: Item[];
};
