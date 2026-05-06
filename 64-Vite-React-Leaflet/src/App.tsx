// import "./App.css";
import { StrictMode } from "react";
import ImperativeComponent from "./components/ImperativeComponent";
import LeafletMap from "./components/LeafletMap";
import "leaflet/dist/leaflet.css";



function App() {
  return (
    <>
      <LeafletMap />
      
      {/* <h1 className="text-3xl font-bold underline text-blue-600">
        Hello React 19 + Tailwind v4!
      </h1> */}
      <ImperativeComponent />
    </>
  );
}

export default App;
