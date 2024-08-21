import MDEditor from "@uiw/react-md-editor";

const MyCustomChatMessage = (message) => {
  console.log(message.message, "########");
  return (
    <div className="react-chatbot-kit-chat-bot-message-container" >
      <div className="react-chatbot-kit-chat-bot-message" style={{ backgroundColor: "rgb(192, 144, 44)", color: "white"}}>
        <MDEditor.Markdown
          source={message.message}
          style={{ backgroundColor: "rgb(192, 144, 44)", color: "white"}}
        />
        <div className="react-chatbot-kit-chat-bot-message-arrow" style={{borderRightColor:"rgb(192, 144, 44)"}}></div>
      </div>
    </div>
  );
};

export default MyCustomChatMessage;
