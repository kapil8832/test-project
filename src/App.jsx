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
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ActionProvider from "./chat-bot-utills/ActionProvider";
import MessageParser from "./chat-bot-utills/MessageParser";
import config from "./chat-bot-utills/config";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/commission" element={<Commison />}></Route>
          <Route path="/list" element={<DraggableList />}></Route>
          <Route path="/print" element={<PrintDetails />}></Route>
          <Route path="/plumb" element={<JsPlumbExample />}></Route>
          <Route path="/flow" element={<Flow />}></Route>
          <Route path="/" element={<Builder />}></Route>
          <Route
            path="/chatbot"
            element={
              <Chatbot
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
