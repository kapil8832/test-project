import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Handle, Position } from "reactflow";
import "./tooltip.css";
import {
  deleteFollowup,
  deleteQuestion,
  updateFollowup,
} from "../states/slices/questionsSlice";
import { Delete, Edit, Save } from "@mui/icons-material";
import {
  deleteEdgesofBuilder,
  deleteNodesofBuilder,
  updateEdgesofBuilder,
  updateHeightOfAnswerNode,
  updateInputValueOfNode,
  updateNodesOfBuilder,
  updatePostionOfchildNodes,
} from "../states/slices/builderSlice";
const handleStyle = {
  backgroundColor: "transparent",
  height: "0px",
  width: "0px",
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderTop: "5px solid #333",
};

export default function QuetionNode({ data, isConnectable, id }) {
  const [visibility, setVisibility] = useState(true);
  const inputRef = useRef();
  const [deleteButtonVisibility, setDeleteButtonVisibility] = useState(false);
  const nodes = useSelector((state) => state.builder.nodes);
  const edges = useSelector((state) => state.builder.edges);
  const questions = useSelector((state) => state.questions.questions);

  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.value = data.inputValue ? data.inputValue : "";
    if (inputRef.current.value) {
      setVisibility(false);
    }
  }, []);

  function saveClickHandler() {
    if (inputRef.current.value) {
      setVisibility((pre) => !pre);
    }
    const parentId = data.parentNode;

    const node = nodes.find((item) => item.id === parentId);

    dispatch(
      updateInputValueOfNode({ id: id, inputValue: inputRef.current.value })
    );

    dispatch(
      updateFollowup({
        queId: node.data.parentNode,
        queNodeId: id,
        queText: inputRef.current.value,
      })
    );
  }

  function deleteQuestionHandler() {
    const parentId = data.parentNode;
    const node = nodes.find((item) => item.id === parentId);
    dispatch(updatePostionOfchildNodes({ parentId: parentId, id: id }));
    dispatch(deleteNodesofBuilder(id));
    dispatch(deleteEdgesofBuilder(id));
    dispatch(
      deleteFollowup({
        queId: node.parentNode ? node.parentNode : "hello",
        queNodeId: id,
      })
    );
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
  return (
    <div className="text-updater-node m-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center">
          <div className="tooltip">
            <input
              type="text"
              ref={inputRef}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Type your question ..."
              disabled={!visibility}
            />
            <span className="tooltip-text">{inputRef.current?.value}</span>
          </div>

          <div className="text-center mx-2">
            <button onClick={saveClickHandler}>
              {visibility ? (
                <Save sx={{ color: "green" }}></Save>
              ) : (
                <Edit sx={{ color: "blue" }}></Edit>
              )}
            </button>
            {deleteButtonVisibility && (
              <button className="ml-4" onClick={() => deleteQuestionHandler()}>
                <Delete sx={{ color: "red" }}></Delete>
              </button>
            )}
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
