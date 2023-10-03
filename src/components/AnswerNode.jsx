import { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import QuetionNode from "./QuetionNode";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateEdgesofBuilder, updateHeightOfAnswerNode, updateNodesOfBuilder } from "../states/slices/builderSlice";
import { addFollowup, addQuestion, updateQuestion } from "../states/slices/questionsSlice";
import { DeleteForever, DeleteForeverOutlined, Edit, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import './tooltip.css'

const handleStyle = {
    backgroundColor: "transparent",
    height: "0px",
    width: "0px",
    borderTop: "5px solid transparent",
    borderBottom: "5px solid transparent",
    borderLeft: "5px solid #333",
  };

function AnswerNode({ data, isConnectable, id , parentNode }) {
  const [visibility, setVisibility] = useState(true);
  const [inputValue, setInputvalue] = useState("");
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.builder.nodes);
  const edges = useSelector((state) => state.builder.edges);
  const quetions = useSelector(state=>state.questions.questions);


  function saveClickHandler() {
    if (inputValue) setVisibility((pre) => !pre);
    dispatch(updateQuestion({queId:data.parentNode, ansText:inputValue}))
  }

  function createFollowupsHandler() {
    let pos = 0 ; 
    nodes.forEach(item =>{
        if(item?.parentNode === id){
            if(item.position.y > pos){
                pos = item.position.y
            }
        }
    })

    if(pos === 0 ){
      pos = 80 ;
    }
  

    const newQuestionNode = {
      id: Date.now().toString(),
      position: { x: 0, y: pos+60 },
      draggable: false,
      isConnectable:false ,
      type: "quetionNode",
      parentNode: id,
      data:{parentNode: id},
      extent: "parent",
    };

    const newAnswerNode = {
        id: Date.now().toString()+'1',
        parentNode:newQuestionNode.id ,
        position: { x: 500, y:pos-80},
        draggable: true,
        type: "answerNode",
        isConnectable:false ,
        data:{ parentNode:newQuestionNode.id , height:170}
    }
    const newEdge = {
        id: Date.now().toString(),
        source:newQuestionNode.id , 
        target:newAnswerNode.id,
        type:'smoothstep'
    }

    dispatch(updateEdgesofBuilder([...edges , newEdge]))
    dispatch(updateNodesOfBuilder([...nodes , newQuestionNode ,newAnswerNode ]));
    dispatch(addQuestion({queId:newQuestionNode.id , ansId:newAnswerNode.id})) ;
    dispatch(addFollowup({queId:data.parentNode,newQueId:newQuestionNode.id }))
    dispatch(updateHeightOfAnswerNode({id:id , type:'increase'}))
  }

  const divStyle = {
    width: '400px',
    height: `${data.height}px`,
  };


 
  return (
    <div className="text-updater-node" style={divStyle}>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={handleStyle}
      />
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg  w-full">
        <div className="flex items-center">
          <div className="mb-4 tooltip">
           
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputvalue(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Type your answer ..."
                disabled={!visibility}
              />
              <span className="tooltip-text">{inputValue}</span>
            
          </div>

          <div className="text-center mx-2 mb-4">
            <button
              onClick={saveClickHandler}            >
              {visibility ? <Save sx={{color:'green'}}></Save> : <Edit sx={{color:'blue'}}></Edit>}
            </button>
          </div>
        </div>
        <button
          onClick={createFollowupsHandler}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        >
          Create followups +
        </button>
      </div>
    </div>
  );
}

export default AnswerNode ;


