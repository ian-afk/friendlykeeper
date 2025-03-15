import "./App.css";
import Navbar from "./components/Navbar";
import Board from "./pages/BoardPage";

function App() {
  return (
    <>
      <div className="m-4">
        <Navbar />
        <div className="mt-24">
          <Board />
        </div>
      </div>
    </>
  );
}

export default App;
