const nodeConfigurations = {
  customNode: {
    title: "Write a message",
    fields: [
      { label: "Buttons", type: "text", variable: "hello", placeholder: "text body" }
    ]
  },
  AskAQuestion: {
    title: "Ask a Question",
    fields: [
      { label: "Question text", type: "text", variable: "hello", placeholder: "Ask anything" }
    ]
  },
  askName: {
    title: "Ask for a Name",
    fields: [
      { label: "Question text", type: "text", variable: "name", placeholder: "What's your name?" }
    ]
  },
  askEmail: {
    title: "Ask for an Email",
    fields: [
      { label: "Question text", type: "text", variable: "email", placeholder: "Enter your email" }
    ]
  },
  askPhone: {
    title: "Ask for a Phone Number",
    fields: [
      { label: "Question text", type: "text", variable: "phone", placeholder: "Enter your phone number" }
    ]
  },
  askNumber: {
    title: "Ask for a Number",
    fields: [
      { label: "Question text", type: "text", variable: "number", placeholder: "Type a number, please" }
    ]
  },
  autoComplete: {
    title: "Autocomplete",
    fields: [
      { label: "Question text", type: "text", variable: "number", placeholder: "Input suggestions" }
    ]
  },
  askUrl: {
    title: "Ask for a url",
    fields: [
      { label: "Question text", type: "text", variable: "number", placeholder: "Type a Url" }
    ]
  },
  askAddress: {
    title: "Ask for an address",
    fields: [
      { label: "Question text", type: "text", variable: "number", placeholder: "Type your address, please" }
    ]
  },
  picChoice: {
    title: "Picture choice",
    fields: [
      { label: "Message", type: "text", variable: "number", placeholder: "Image carousel" }
    ]
  },
  rating: {
    title: "Rating",
    fields: [
      { label: "Message", type: "text", variable: "number", placeholder: "Create an evaluation" }
    ]
  },
};
  
export default nodeConfigurations;
  