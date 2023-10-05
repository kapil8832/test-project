import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Handle, Position } from "reactflow";
import Showdown from "showdown";
import MDEditor from "@uiw/react-md-editor";
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
  const [preview, setPreview] = useState("preview");
  const inputRef = useRef();
  const [deleteButtonVisibility, setDeleteButtonVisibility] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const nodes = useSelector((state) => state.builder.nodes);
  const edges = useSelector((state) => state.builder.edges);
  const questions = useSelector((state) => state.questions.questions);

  const dispatch = useDispatch();
  const [htmlOutput, setHtmlOutput] = useState("");

  useEffect(() => {
    // inputRef.current.value = data.inputValue ? data.inputValue : "";
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
    const parentId = data.parentNode;

    const node = nodes.find((item) => item.id === parentId);

    dispatch(updateInputValueOfNode({ id: id, inputValue: inputValue }));

    dispatch(
      updateFollowup({
        queId: node.data.parentNode,
        queNodeId: id,
        queText: inputValue,
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

  function statusChangeHandler(status) {
    dispatch(setStatusMarker({ id: id, status: status }));
    dispatch(updateStatusMarker({ id: id, status: status }));
  }
  return (
    <div className="text-updater-node m-4 nodrag w-full" style={{border:'1px solid #c0902c'}}>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center w-full">
          <div className="tooltip nodrag w-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Type your question ..."
              disabled={preview ==="preview"}
            />
            {/* <MDEditor
              value={inputValue}
              onChange={(val) => {
                setInputValue(val);
              }}
              height={80}
              preview={preview}
              extraCommands={[]}
              visibleDragbar={false}
            ></MDEditor>

            <div className="tooltip-text">
              <MDEditor.Markdown
                source={inputValue}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </div> */}
          </div>

          <div className="text-center mx-2 flex pr-2">
            <button
              onClick={() => {
                statusChangeHandler(!data.statusMarker);
              }}
            >
              {data.statusMarker ? (
                <CheckCircle sx={{ color: "green" }}></CheckCircle>
              ) : (
                <CheckCircleOutline sx={{ color: "gray" }}></CheckCircleOutline>
              )}
            </button>
            <button className="ml-2" onClick={saveClickHandler}>
              {preview === "edit" ? (
                <Save sx={{ color: "green" }}></Save>
              ) : (
                <Edit sx={{ color: "blue" }}></Edit>
              )}
            </button>
            {deleteButtonVisibility && (
              <button className="ml-2" onClick={() => deleteQuestionHandler()}>
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
