import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Handle, Position } from "reactflow";
import { updateFollowup } from "../states/slices/questionsSlice";
import { Delete, Edit, Save } from "@mui/icons-material";
import { updateNodesOfBuilder } from "../states/slices/builderSlice";
const handleStyle = {
  backgroundColor: "transparent",
  height: "0px",
  width: "0px",
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderTop: "5px solid #333",
};

function QuetionNode({ data, isConnectable , id}) {
    console.log(id)
  const [visibility, setVisibility] = useState(true);
  const [inputValue, setInputvalue] = useState("");
  const nodes = useSelector(state=>state.builder.nodes) ;
  const edges = useSelector(state=>state.builder.edges) ;
  const questions = useSelector(state =>state.questions.questions) ;
  console.log(questions , "these are questions")
  console.log(edges , "these are adges");
  console.log(nodes , "these are nodes")
  const dispatch = useDispatch() ;

  

  console.log(inputValue);
  function saveClickHandler() {
    if (inputValue) setVisibility((pre) => !pre);
    const parentId = data.parentNode ;
    console.log(parentId)
    const node = nodes.find(item=>item.id === parentId) ;
    console.log(node)
    dispatch(updateFollowup({queId:node.data.parentNode ,queNodeId:id  , queText:inputValue}))

  }

  function deleteQuestionHandler(id , parent){
    dispatch(updateNodesOfBuilder(updatedNodes))
  }
  return (
    <div className="text-updater-node m-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center">
          <div>
            {visibility && (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputvalue(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Type your question ..."
              />
            )}
            {!visibility && (
              <h3 className="w-[255px] px-3 py-2 border rounded-lg text-gray-700">
                {" "}
                {inputValue}
              </h3>
            )}
          </div>

          <div className="text-center mx-2">
            <button
              onClick={saveClickHandler}
            >
              {visibility ? <Save sx={{color:'green'}}></Save> : <Edit sx={{color:'blue'}}></Edit>}
            </button>
            <button className="ml-4" onClick={()=>deleteQuestionHandler(id , data.parentNode)}>
              <Delete sx={{color:'red'}}></Delete>
            </button>
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default QuetionNode;
