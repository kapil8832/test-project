import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Handle, Position } from "reactflow";
import CustomHandle from "./CustomHandle";
import "./tooltip.css";
import {
  deleteFollowup,
  deleteQuestion,
  updateFollowup,
  updateStatusMarker,
} from "../states/slices/questionsSlice";
import {
  Delete,
  CheckCircle,
  CheckCircleOutline,
  Edit,
  Save,
} from "@mui/icons-material";
import {
  deleteEdgesofBuilder,
  deleteNodesofBuilder,
  setStatusMarker,
  updateHeightOfAnswerNode,
  updateInputValueOfNode,
  updatePostionOfchildNodes,
} from "../states/slices/builderSlice";
import { IconButton } from "@mui/material";

export default function QuetionNode({
  data,
  isConnectable,
  id,
  isConnectableStart,
}) {
  const [preview, setPreview] = useState("preview");

  const [deleteButtonVisibility, setDeleteButtonVisibility] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const nodes = useSelector((state) => state.builder.nodes);

  const questions = useSelector((state) => state.questions.questions);

  const dispatch = useDispatch();
  useEffect(() => {
    setInputValue(data.inputValue ? data.inputValue : "");

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
    dispatch(updateInputValueOfNode({ id: id, inputValue: inputValue }));
    const parentId = data.parentNode;

    const node = nodes.find((item) => item.id === parentId);
    console.log(node)

    node.data.parentNode.forEach((itm) => {
      dispatch(
        updateFollowup({
          queId: itm,
          queNodeId: id,
          queText: inputValue,
        })
      );
    });
  }

  function deleteQuestionHandler() {
    const parentId = data.parentNode;
    const node = nodes.find((item) => item.id === parentId);
    dispatch(updatePostionOfchildNodes({ parentId: parentId, id: id }));
    dispatch(deleteNodesofBuilder(id));
    dispatch(deleteEdgesofBuilder(id));
    node.data.parentNode.forEach(item=>{
      dispatch(
        deleteFollowup({
          queId: item,
          queNodeId: id,
        })
      );
    })
    
    dispatch(deleteQuestion(id));
    dispatch(updateHeightOfAnswerNode({ id: parentId, type: "decrese" }));
  }

  useEffect(() => {
    if (questions[id]?.data.followUp.length === 0) {
      setDeleteButtonVisibility(true);
    } else {
      setDeleteButtonVisibility(false);
    }
  }, [questions]);

  function statusChangeHandler(status) {
    dispatch(setStatusMarker({ id: id, status: status }));
    dispatch(updateStatusMarker({ id: id, status: status }));
  }
  console.log(data.maxConnections);
  return (
    <div
      className="text-updater-node m-4 nodrag w-full"
      style={{ border: "1px solid #c0902c" }}
    >
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center w-full">
          <div className="tooltip nodrag w-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Type your question ..."
              disabled={preview === "preview"}
            />
          </div>

          <div className="text-center mx-2 flex pr-2">
            <IconButton
              onClick={() => {
                statusChangeHandler(!data.statusMarker);
              }}
            >
              {data.statusMarker ? (
                <CheckCircle sx={{ color: "green" }}></CheckCircle>
              ) : (
                <CheckCircleOutline sx={{ color: "gray" }}></CheckCircleOutline>
              )}
            </IconButton>
            <IconButton className="ml-2" onClick={saveClickHandler}>
              {preview === "edit" ? (
                <Save sx={{ color: "green" }}></Save>
              ) : (
                <Edit sx={{ color: "blue" }}></Edit>
              )}
            </IconButton>
            {deleteButtonVisibility && (
              <IconButton
                className="ml-2"
                onClick={() => deleteQuestionHandler()}
              >
                <Delete sx={{ color: "red" }}></Delete>
              </IconButton>
            )}
          </div>
        </div>
      </div>
      <CustomHandle
        position={Position.Right}
        isConnectable={isConnectable}
        maxConnections={data.maxConnections}
      />
    </div>
  );
}

