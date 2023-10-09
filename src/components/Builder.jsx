import { useCallback, useState } from "react";
import DeletableNode from "./DeletableNode";
import CustomConnectionLine from "./CustomConnectionLine";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  updateEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./CustomNode";
import { useSelector } from "react-redux";
import AnswerNode from "./AnswerNode";
import QuetionNode from "./QuetionNode";
import { StepEdge } from "reactflow";
import { SmoothStepEdge } from "reactflow";


import "./text-updater-node.css";
import { useDispatch } from "react-redux";
import { updateEdges, updateNodes } from "../states/slices/chatbotSlice";
import {
  addNewParent,
  updateEdgesofBuilder,
  updateNodesOfBuilder,
} from "../states/slices/builderSlice";
import { replaceQuestionContent } from "../states/slices/questionsSlice";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const nodeTypes = { answerNode: AnswerNode, quetionNode: QuetionNode };
const edgeTypes = { step: StepEdge, smoothstep: SmoothStepEdge , deleteablenode: DeletableNode };
function Builder() {
  const edges = useSelector((state) => state.builder.edges);
  const nodes = useSelector((state) => state.builder.nodes);
  const questions = useSelector((state) => state.questions.questions);
  localStorage.setItem("edges", JSON.stringify(edges));
  localStorage.setItem("nodes", JSON.stringify(nodes));
  localStorage.setItem("questions", JSON.stringify(questions));

  const disptach = useDispatch();

  const onNodesChange = useCallback(
    (changes) => {
      if (changes[0].type !== "position") {
        return;
      }
      const updatedNodes = applyNodeChanges(changes, nodes);
      disptach(updateNodesOfBuilder(updatedNodes));
    },
    [nodes]
  );
  const onEdgesChange = useCallback(
    (changes) =>
      disptach(updateEdgesofBuilder(applyEdgeChanges(changes, edges))),

    [edges]
  );
  const onConnect = useCallback(
    (changes) => {
      const addStyle = {
        ...changes,
        id: Date.now().toString(),
        style: {
          strokeWidth: 2,
          stroke: "#c0902c",
        },
        type: "deleteablenode",
      };
      const targetNode = nodes.find((item)=> item.id === changes.target ) 
      const targetParentId = targetNode.parentNode ;
      disptach(updateEdgesofBuilder(addEdge(addStyle, edges)));
      disptach(replaceQuestionContent({replace:changes.source , replaceWith:targetParentId}))
      disptach(addNewParent({node:changes.target , parent: changes.source}))
    },
    [edges]
  );

  return (
    <div className="h-[100vh] w-[100vw] bg-white relative">
      <div className="absolute bottom-40 right-12 z-10">
        <button
          // onClick={createFollowupsHandler}
          style={{ backgroundColor: "#c0902c" }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        >
          Save Chat
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineComponent={CustomConnectionLine}
        style={rfStyle}
      >
        <Background style={{ backgroundColor: "white" }}></Background>
        <MiniMap></MiniMap>
        <Controls></Controls>
      </ReactFlow>
    </div>
  );
}

export default Builder;

