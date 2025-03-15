import ListProvider from "../context/CoreContext";
import Board from "../features/boards/Board";

export default function BoardPage() {
  return (
    <ListProvider>
      <Board />
    </ListProvider>
  );
}
