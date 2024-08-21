import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import MyCustomChatMessage from "./MyCustomChatMessage";

import Followups from "../bot-components/Followups";
const questions = JSON.parse(localStorage.getItem('questions'))


const config = {
  initialMessages: [
    createChatBotMessage(questions?.hello.data.ansText, {
      widget: "followups",
      payload:"hello"
    }),
  ],
  customComponents: {
    // Replaces the default header
   header: () => <div style={{ backgroundColor: 'red', padding: "5px", borderRadius: "3px" }}>This is the header</div>,
   botChatMessage: (props) => <MyCustomChatMessage {...props} />,
 },
  customStyles:{
    botMessageBox: {
      backgroundColor: "#c0902c",
      color:'white'
    },
  },
  widgets: [
    {
      widgetName: "followups",
      widgetFunc: (props) => <Followups {...props} /> ,
    },
  ],
};

export default config
