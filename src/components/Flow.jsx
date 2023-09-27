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

import "./text-updater-node.css";
import { useDispatch } from "react-redux";
import { updateEdges, updateNodes } from "../states/slices/chatbotSlice";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};


// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const edges = useSelector(state=>state.chatbot.edges)
  const nodes = useSelector(state=>state.chatbot.nodes)
  // const nodescopy = {...nodes} ;
  // const edgescopy = {...edges}
  const disptach = useDispatch() ;

  // const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes)
      console.log(updatedNodes)
      disptach(updateNodes(updatedNodes))},
    [nodes]
  );
  const onEdgesChange = useCallback(
    (changes) => disptach(updateEdges(applyEdgeChanges(changes,edges))),
    
    [edges]
  );
  const onConnect = useCallback(
    (changes) => disptach(updateEdges( addEdge(changes, edges))),
    [edges]
  );

  console.log(edges)
  console.log(nodes)
 

  return (
    <div className="h-[100vh] w-[100vw]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        style={rfStyle}
      />
    </div>
  );
}

export default Flow;
