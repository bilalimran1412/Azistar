const nodeConfigurations = {
  customNode: {
    title: "Write a message",
    fields: [
      { label: "Buttons", type: "customNode", variable: "textareaFieldData", placeholder: "text body" }
    ]
  },
  AskAQuestion: {
    title: "Ask a Question",
    fields: [
      { label: "Question text", type: "text", variable: "textareaFieldData", placeholder: "Ask anything" }
    ]
  },
  askName: {
    title: "Ask for a Name",
    fields: [
      { label: "Question text", type: "text", variable: "textareaFieldData", placeholder: "What's your name?" }
    ]
  },
  askEmail: {
    title: "Ask for an Email",
    fields: [
      { label: "Question text", type: "text", variable: "textareaFieldData", placeholder: "Enter your email" }
    ]
  },
  askPhone: {
    title: "Ask for a Phone Number",
    fields: [
      { label: "Question text", type: "text", variable: "textareaFieldData", placeholder: "Enter your phone number" }
    ]
  },
  askNumber: {
    title: "Ask for a Number",
    fields: [
      { label: "Question text", type: "text", variable: "textareaFieldData", placeholder: "Type a number, please" }
    ]
  },
  askFile: {
    title: "Ask for a file",
    fields: [
      { label: "Question text", type: "text", variable: "textareaFieldData", placeholder: "File Upload" }
    ]
  },
  autoComplete: {
    title: "Autocomplete",
    fields: [
      { label: "Question text", type: "text", variable: "textareaFieldData", placeholder: "Input suggestions" }
    ]
  },
  askUrl: {
    title: "Ask for a url",
    fields: [
      { label: "Question text", type: "text", variable: "textareaFieldData", placeholder: "Type a Url" }
    ]
  },
  askAddress: {
    title: "Ask for an address",
    fields: [
      { label: "Question text", type: "text", variable: "textareaFieldData", placeholder: "Type your address, please" }
    ]
  },
  picChoice: {
    title: "Picture choice",
    fields: [
      { label: "Message", type: "text", variable: "textareaFieldData", placeholder: "Image carousel" }
    ]
  },
  rating: {
    title: "Rating",
    fields: [
      { label: "Message", type: "text", variable: "textareaFieldData", placeholder: "Create an evaluation" }
    ]
  },
  uploadMedia: {
    title: "Upload a File",
    fields: [
      { label: "Upload File", type: "file", variable: "fileField", placeholder: "Choose a file" }
    ]
  },
};
  
export default nodeConfigurations;
  