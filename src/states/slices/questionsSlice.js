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
          followUp: [],
          statusMarker:false ,
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
      state.questions[action.payload.queId]?.data.followUp.push({
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
      ]?.data.followUp.filter((item) => item.queId !== action.payload.queNodeId);
      if(state.questions[action.payload.queId])
      state.questions[action.payload.queId].data.followUp = updatedFollowups;
    },
    updateStatusMarker(state , action){
      state.questions[action.payload.id].data.statusMarker = action.payload.status ;
    },
    replaceQuestionContent(state , action){
        const obj = state.questions[action.payload.replaceWith]
        console.log(obj) ;
        state.questions[action.payload.replace] = {...obj} ;
    }
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
  updateStatusMarker,
  replaceQuestionContent,
} = QuestionsSlice.actions;
