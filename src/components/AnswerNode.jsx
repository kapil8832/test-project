import { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import MDEditor from "@uiw/react-md-editor";

import {
  deleteEdgesofBuilder,
  deleteNodesofBuilder,
  makeNodeConnactable,
  updateEdgesofBuilder,
  updateHeightOfAnswerNode,
  updateInputValueOfNode,
  updateNodesOfBuilder,
} from "../states/slices/builderSlice";
import {
  addFollowup,
  addQuestion,
  updateQuestion,
} from "../states/slices/questionsSlice";
import { Delete, Edit, Save } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import "./tooltip.css";

const handleStyle = {
  backgroundColor: "transparent",
  height: "0px",
  width: "0px",
  borderTop: "12px solid transparent",
  borderBottom: "12px solid transparent",
  borderLeft: "9px solid #c0902c",
};

export default function AnswerNode({ data, isConnectable, id, parentNode }) {
  const [preview, setPreview] = useState("preview");
  const [inputValue, setInputValue] = useState("");
  const dispatchh = useDispatch();
  const nodes = useSelector((state) => state.builder.nodes);
  const edges = useSelector((state) => state.builder.edges);
  const questions = useSelector((state) => state.questions.questions);
  const [deleteButtonVisibility, setDeleteButtonVisibility] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    let flag;
    data.parentNode.forEach((item) => {
      if (questions[item]?.data.followUp.length === 0) {
        flag = true;
      }
    });
    if (flag) {
      setDeleteButtonVisibility(true);
    } else {
      setDeleteButtonVisibility(false);
    }
  }, [questions]);

  useEffect(() => {
    setInputValue(data.inputValue ? data.inputValue : "");

    // inputref.current.value = data.inputValue ? data.inputValue : "";
    if (data.inputValue) {
      setPreview("preview");
    } else {
      setPreview("edit");
    }
  }, []);

  function saveClickHandler() {
    if (inputValue)
      setPreview((pre) => {
        return pre === "preview" ? "edit" : "preview";
      });

    dispatchh(updateInputValueOfNode({ id: id, inputValue: inputValue }));
    data.parentNode.forEach((id) => {
      dispatchh(
        updateQuestion({
          queId: id,
          ansText: inputValue,
        })
      );
    });
  }

  function createFollowupsHandler() {
    let pos = 0;
    nodes.forEach((item) => {
      if (item?.parentNode === id) {
        if (item.position.y > pos) {
          pos = item.position.y;
        }
      }
    });

    if (pos === 0) {
      pos = 100;
    }

    const newQuestionNode = {
      id: Date.now().toString(),
      position: { x: 0, y: pos + 60 },
      draggable: false,
      isConnectable: false,
      isConnectableStart: false,
      type: "quetionNode",
      parentNode: id,
      data: { parentNode: id, inputValue: "", statusMarker: false , maxConnections:1 },
      extent: "parent",
      style: { width: "450px" },
    };

    const newAnswerNode = {
      id: Date.now().toString() + "1",
      parentNode: newQuestionNode.id,
      position: { x: 600, y: pos - 60 },
      draggable: true,
      type: "answerNode",
      isConnectable: true,
      data: { parentNode: [newQuestionNode.id], height: 190, inputValue: "" },
      style: { border: "1px solid #c0902c", borderRadius: "5px" },
    };

    const newEdge = {
      id: Date.now().toString(),
      source: newQuestionNode.id,
      target: newAnswerNode.id,
      type: "smoothstep",
      style: {
        strokeWidth: 2,
        stroke: "#c0902c",
      },
    };

    dispatchh(updateEdgesofBuilder([...edges, newEdge]));
    dispatchh(updateNodesOfBuilder([...nodes, newQuestionNode, newAnswerNode]));
    dispatchh(
      addQuestion({ queId: newQuestionNode.id, ansId: newAnswerNode.id })
    );
    data.parentNode.forEach((id) => {
      dispatchh(addFollowup({ queId: id, newQueId: newQuestionNode.id }));
    });

    dispatchh(updateHeightOfAnswerNode({ id: id, type: "increase" }));
  }

  const divStyle = {
    width: "500px",
    height: `${data.height}px`,
    backgroundColor:'white',
    borderRadius:'5px'
  };
  const customToolbarConfig = {
    options: ["bold", "italic", "underline"], // Include only the buttons you want
  };

  function deleteClickHandler() {
    dispatchh(deleteNodesofBuilder(id));
    dispatchh(deleteEdgesofBuilder(data.parentNode+""));
    dispatchh(makeNodeConnactable({id:data.parentNode[0]}))
  }

  return (
    <div style={divStyle}>
      
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          style={handleStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered && deleteButtonVisibility ? (
            <IconButton
              onClick={deleteClickHandler}
              style={{
                position: "relative",
                top: "-22px",
                left: "-25px",
                zIndex: "2",
              }}
            >
              <Delete sx={{ color: "red" }}></Delete>
            </IconButton>
          ) : (
            ""
          )}
        </Handle>
 
      <div className="max-w-md mx-auto bg-white pt-2 rounded-lg  w-full">
        <div className="flex items-center">
          <div data-color-mode="light" className="mb-2 tooltip nodrag w-full">
            <MDEditor
              value={inputValue}
              onChange={(val) => {
                setInputValue(val);
              }}
              height={100}
              preview={preview}
              extraCommands={[]}
              visibleDragbar={false}
              config={customToolbarConfig}
              placeholder="type your answer"
              overflow={false}
            ></MDEditor>

            <div className="tooltip-text">
              <MDEditor.Markdown
                source={inputValue}
                style={{ whiteSpace: "pre-wrap"}}
              />
            </div>
          </div>

          <div className="text-center mx-2 ">
            <IconButton onClick={saveClickHandler}>
              {preview === "edit" ? (
                <Save sx={{ color: "green" }}></Save>
              ) : (
                <Edit sx={{ color: "blue" }}></Edit>
              )}
            </IconButton>
          </div>
        </div>
        <button
          onClick={createFollowupsHandler}
          style={{ backgroundColor: "#c0902c" }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        >
          Create followups +
        </button>
      </div>
    </div>
  );
}
