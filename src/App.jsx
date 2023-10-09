import Commison from "./components/Commison";
import DraggableList from "./components/DragableList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JsPlumbExample from "./components/Plumb";
import PrintDetails from "./components/Page";
import Flow from "./components/Flow";
import CustomNode from "./components/CustomNode";
import useFlowStore from "./components/useFlowStore";
import Builder from "./components/Builder";
import { useSelector } from "react-redux";


const App = () => {
  const eges = useSelector(state=>state.builder.edges) ;
  console.log(eges)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/commission" element={<Commison/>}></Route>
          <Route path="/list" element={<DraggableList/>}></Route>
          <Route path="/print" element={<PrintDetails/>}></Route>
          <Route path="/plumb" element={<JsPlumbExample/>}></Route>
          <Route path="/flow" element={<Flow/>}></Route>
          <Route path="/" element={<Builder/>}></Route>
       
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;



