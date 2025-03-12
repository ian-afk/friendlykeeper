import "./App.css";
import Navbar from "./components/Navbar";
import Body from "./pages/Body";

function App() {
  return (
    <>
      <div className="m-4">
        <Navbar />
        <div className="mt-18">
          <Body />
        </div>
      </div>
    </>
  );
}

export default App;
