const questions = JSON.parse(localStorage.getItem('questions'))




class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleJavascriptList = (id) => {
      if(questions?.[id].data.statusMarker){
         console.log(" status marked as done ")
      }
      const message = this.createChatBotMessage(
        questions?.[id].data.ansText,
        {
          widget: "followups",
          payload:id
        },
      );
      
      this.updateChatbotState(message);
    };
  
    updateChatbotState(message) {
      // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.
  
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }
  
  export default ActionProvider;