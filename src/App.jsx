import Commison from "./components/Commison";
import DraggableList from "./components/DragableList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrintDetails from "./components/Page";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/commission" element={<Commison/>}></Route>
          <Route path="/list" element={<DraggableList/>}></Route>
          <Route path="/print" element={<PrintDetails/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
