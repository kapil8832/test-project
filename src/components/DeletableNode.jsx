import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSmoothStepPath,
} from "reactflow";

import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  updateEdgesofBuilder,
  updateNodesOfBuilder,
  updatePostionOfchildNodes,
  updateHeightOfAnswerNode,
  deleteEdgesofBuilder,
  deleteNodesofBuilder,
  removeNodeParent,
} from "../states/slices/builderSlice";
import { deleteQuestion , deleteFollowup } from "../states/slices/questionsSlice";

export default function DeletableNode({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const edges = useSelector((state) => state.builder.edges);
  const nodes = useSelector((state) => state.builder.nodes);
  const dispacth = useDispatch();

  function deletEdgeHandler(evt) {
    evt.stopPropagation();
    const edge = edges.find((item) => item.id === id);
    const source = edge.source;
    const node = nodes.find((item) => item.id === source);
    const parentId = node.parentNode ;
    const parentNode = nodes.find((item) => item.id === parentId);
    dispacth(updatePostionOfchildNodes({ parentId: parentId, id: source }));
    dispacth(deleteEdgesofBuilder(id));
    dispacth(deleteNodesofBuilder(source));
    dispacth(deleteQuestion(source));
    dispacth(updateHeightOfAnswerNode({ id: parentId, type: "decrese" }));
    dispacth(removeNodeParent({node:edge.target , parent:edge.source}))
    parentNode.data.parentNode.forEach(item=>{
      dispacth(
        deleteFollowup({
          queId: item,
          queNodeId: source,
        })
      );
    })   
  }


  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <IconButton onClick={(e) => deletEdgeHandler(e)}>
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
