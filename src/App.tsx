import "./App.css";
import Navbar from "./components/Navbar";
import Board from "./pages/BoardPage";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <div className="mt-20">
          <Board />
        </div>
      </div>
    </>
  );
}

export default App;
