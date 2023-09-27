import { createSlice } from "@reduxjs/toolkit";

const ChatBotSlice = createSlice({
  name: "chatbot",
  initialState: {
    nodes: [
      {
        id:'810801380',
        data:{msg:'hello how are you' , isDone:false , followUp:['1321314' , '3252525' , '1235151']},
        position:{x:0 , y:100},
        dragging:true ,
        type:'textUpdater'
    } 
     
    ],
    edges: [],
  },
  reducers: {
    updateNodes(state, action) {
      state.nodes = action.payload;
    },
    updateEdges(state, action) {
      state.edges = action.payload;
    },
  },
});

export default ChatBotSlice;
export const { updateEdges, updateNodes } = ChatBotSlice.actions;
