const nodeConfigurations = {
  customNode: {
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
  }
};

export default nodeConfigurations;
