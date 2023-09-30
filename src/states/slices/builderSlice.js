import { createSlice } from "@reduxjs/toolkit";

const BuilderSlice = createSlice({
  name: "builder",
  initialState: {
    nodes: [
      {
        id: "root",
        position: { x: 0, y: 0 },
        draggable: true,
        type: "answerNode",
        data:{parentNode:'hello'},
      },
    ],
    edges: [],
  },
  reducers: {
    updateNodesOfBuilder(state, action) {
      state.nodes = action.payload;
    },
    updateEdgesofBuilder(state, action) {
      state.edges = action.payload;
    },
  },
});

export default BuilderSlice;
export const { updateEdgesofBuilder, updateNodesOfBuilder } =
  BuilderSlice.actions;
