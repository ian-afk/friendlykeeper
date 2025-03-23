import DragScrollContainer from "../components/DragScrollContainer";
import ListProvider from "../context/CoreContext";
import Board from "../features/boards/Board";

export default function BoardPage() {
  return (
    <DragScrollContainer>
      <ListProvider>
        <Board />
      </ListProvider>
    </DragScrollContainer>
  );
}
