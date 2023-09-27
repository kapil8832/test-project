import { configureStore } from "@reduxjs/toolkit";
import ChatBotSlice from "./slices/chatbotSlice";
const store = configureStore({
    reducer:{chatbot:ChatBotSlice.reducer}
})

export default store