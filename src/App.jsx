import { BrowserRouter, Route, Routes } from "react-router-dom";
import Builder from "./components/Builder";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ActionProvider from "./chat-bot-utills/ActionProvider";
import MessageParser from "./chat-bot-utills/MessageParser";
import config from "./chat-bot-utills/config";
import './App.css'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
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
