import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Followups from "../bot-components/Followups";
const questions = JSON.parse(localStorage.getItem('questions'))


const config = {
  initialMessages: [
    createChatBotMessage(questions['hello'].data.ansText, {
      widget: "followups",
      payload:"hello"
    }),
  ],

  widgets: [
    {
      widgetName: "followups",
      widgetFunc: (props) => <Followups {...props} /> ,
    },
  ],
};

export default config
