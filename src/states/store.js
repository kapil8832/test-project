import { configureStore } from "@reduxjs/toolkit";
import ChatBotSlice from "./slices/chatbotSlice";
import BuilderSlice from "./slices/builderSlice";
import QuestionsSlice from "./slices/questionsSlice";
const store = configureStore({
    reducer:{chatbot:ChatBotSlice.reducer , builder:BuilderSlice.reducer , questions:QuestionsSlice.reducer}
})

export default store