import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Followups from "../bot-components/Followups";


const config = {
  initialMessages: [
    createChatBotMessage("hello what would you like to visit ", {
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
