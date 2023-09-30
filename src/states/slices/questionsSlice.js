import { createSlice } from "@reduxjs/toolkit";

const QuestionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: {
      hello: {
        ansId: "root",
        data: {
          ansText: "hello how are you",
          isDone: false,
          followUp: [], //{ queId: "", queText: "" } array item .
        },
      },
    },
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
      state.questions[action.payload.queId].data.ansText = action.payload.ansText;
    },
    deleteQuestion(state, action) {},
    addFollowup(state, action) {
      state.questions[action.payload.queId].data.followUp.push({
        queId: action.payload.newQueId,
        queText: "",
      });
    },
    updateFollowup(state, action) {
      console.log(action.payload)
      state.questions[action.payload.queId].data.followUp.forEach(item=>{
        if(item.queId === action.payload.queNodeId ){
            item.queText = action.payload.queText ;
        }
      })
    },
    deleteFollowup(state, action) {},
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
