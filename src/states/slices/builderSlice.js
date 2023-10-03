import { createSlice } from "@reduxjs/toolkit";

const n = localStorage.getItem("nodes");
const e = localStorage.getItem("edges");
const nodes = n
  ? JSON.parse(n)
  : [
      {
        id: "root",
        position: { x: 0, y: 60 },
        draggable: true,
        type: "answerNode",
        data: { parentNode: "hello", height: 170 },
      },
    ];
const edges = e ? JSON.parse(e) : [];

const BuilderSlice = createSlice({
  name: "builder",
  initialState: {
    nodes: nodes,
    edges: edges,
  },
  reducers: {
    deleteEdgesofBuilder(state, action) {
      const filterdEdges = state.edges.filter(
        (item) => item.source !== action.payload
      );
      state.edges = filterdEdges;
    },
    deleteNodesofBuilder(state, action) {
      const filterdNodes = state.nodes.filter(
        (item) =>
          item.id !== action.payload && item.parentNode !== action.payload
      );
      state.nodes = filterdNodes;
    },
    updateNodesOfBuilder(state, action) {
      state.nodes = action.payload;
    },
    updateEdgesofBuilder(state, action) {
      state.edges = action.payload;
    },
    updatePostionOfchildNodes(state, action) {
      const arrayofsiblingQuestions = state.nodes.filter(
        (item) => item.parentNode === action.payload.parentId
      );
      let flag = false;
      arrayofsiblingQuestions.forEach((item) => {
        if (item.id === action.payload.id) {
          flag = true;
        }
        if (flag) {
          state.nodes.forEach((nodeitem) => {
            if (nodeitem.id === item.id) {
              nodeitem.position.y = nodeitem.position.y - 60;
            }
          });
        }
      });
    },
    updateHeightOfAnswerNode(state, action) {
      if (action.payload.type === "increase") {
        state.nodes.forEach((item) => {
          if (item.id === action.payload.id) {
            item.data.height = item.data.height + 60;
          }
        });
      } else if (action.payload.type === "decrese") {
        state.nodes.forEach((item) => {
          if (item.id === action.payload.id) {
            item.data.height = item.data.height - 60;
          }
        });
      }
    },
  },
});

export default BuilderSlice;
export const {
  updateEdgesofBuilder,
  updateNodesOfBuilder,
  deleteEdgesofBuilder,
  deleteNodesofBuilder,
  updatePostionOfchildNodes,
  updateHeightOfAnswerNode,
} = BuilderSlice.actions;