import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import useFlowStore from "./useFlowStore";
import { useDispatch } from "react-redux";
import { updateNodes } from "../states/slices/chatbotSlice";
import { useSelector } from "react-redux";
import quetions from "./quetions";
const handleStyle = {
  backgroundColor: "transparent",
  height: "0px",
  width: "0px",
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderTop: "5px solid #333",
};

function TextUpdaterNode({ data, isConnectable }) {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.chatbot.nodes);
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  function yesClickHandler() {
    console.log("clecked yes from", nodes);
    
    const newNode = {
      id: Date.now().toString(),
      data: { value: "", msg: "new message here" },
      type: "textUpdater",
      position: { x: 0, y: nodes[nodes.length - 1]["position"]["y"] + 100 },
    };
    const lastObj  = {...nodes[nodes.length-1]}
    lastObj.data = {...nodes[nodes.length-1]['data'] ,isDone:true}
    const originalArray  = [...nodes]
    const newArray = originalArray.slice(0, originalArray.length - 1);
    newArray.push(lastObj) ;
    newArray.push(newNode)

    dispatch(updateNodes(newArray));
  }

  function noClickHandler() {
    console.log("clecked no from", data.value);
  }

  function quetionClickHandler(queID){
    const obj = {...quetions[queID]}
    obj.position['y']+= nodes[nodes.length -1]['position']['y']+50
    dispatch(updateNodes([...nodes , obj]));
  }

  console.log(nodes)

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={handleStyle}
      />
      <p>{data.msg}</p>
      {!data.isDone && (
        <div >
          {data.followUp.map(que=>{
            return   <button
            key={que}
            className="bg-blue-500 hover:bg-blue-700 text-white text-xs px-2 rounded block mt-2 "
            onClick={()=>quetionClickHandler(que)}
          >
            this is quetion {que}
          </button>
          })}
        
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
