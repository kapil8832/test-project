import { configureStore } from "@reduxjs/toolkit";
import ChatBotSlice from "./slices/chatbotSlice";
import BuilderSlice from "./slices/builderSlice";
import QuestionsSlice from "./slices/questionsSlice";
import ConfigSlice from "./slices/chatbotConfig";
const store = configureStore({
  reducer: {
    chatbot: ChatBotSlice.reducer,
    builder: BuilderSlice.reducer,
    questions: QuestionsSlice.reducer,
    config: ConfigSlice.reducer,
  },
});

export default store;
