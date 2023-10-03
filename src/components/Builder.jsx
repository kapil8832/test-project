import { useCallback, useState } from "react";
import ReactFlow, {
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
  updateEdgesofBuilder,
  updateNodesOfBuilder,
} from "../states/slices/builderSlice";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const nodeTypes = { answerNode: AnswerNode, quetionNode: QuetionNode };
const edgeTypes = { step: StepEdge, smoothstep: SmoothStepEdge };
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
    (changes) => disptach(updateEdgesofBuilder(addEdge(changes, edges))),
    [edges]
  );

  return (
    <div className="h-[100vh] w-[100vw]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        style={rfStyle}
      />
    </div>
  );
}

export default Builder;
