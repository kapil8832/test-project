import { createSlice } from "@reduxjs/toolkit";
const q = localStorage.getItem("questions");
const questions = q
  ? JSON.parse(q)
  : {
      hello: {
        ansId: "root",
        data: {
          ansText: "hello how are you",
          isDone: false,
          followUp: [], //{ queId: "", queText: "" } array item .
        },
      },
    };

const QuestionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: questions,
  },
  reducers: {
    addQuestion(state, action) {
      state.questions[action.payload.queId] = {
        ansId: action.payload.ansId,
        data: {
          ansText: "",
          isDone: false,
          followUp: [],
        },
      };
    },
    updateQuestion(state, action) {
      state.questions[action.payload.queId].data.ansText =
        action.payload.ansText;
    },
    deleteQuestion(state, action) {
      delete state.questions[action.payload];
    },
    addFollowup(state, action) {
      state.questions[action.payload.queId].data.followUp.push({
        queId: action.payload.newQueId,
        queText: "",
      });
    },
    updateFollowup(state, action) {
      state.questions[action.payload.queId].data.followUp.forEach((item) => {
        if (item.queId === action.payload.queNodeId) {
          item.queText = action.payload.queText;
        }
      });
    },
    deleteFollowup(state, action) {
      const updatedFollowups = state.questions[
        action.payload.queId
      ].data.followUp.filter((item) => item.queId !== action.payload.queNodeId);
      state.questions[action.payload.queId].data.followUp = updatedFollowups;
    },
  },
});

export default QuestionsSlice;
export const {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  addFollowup,
  updateFollowup,
  deleteFollowup,
} = QuestionsSlice.actions;
