const nodeConfigurations = {
  customNode: {
    title: "Write a message",
    fields: [
      { label: "Buttons", type: "customNode", variable: "textareaFieldData", placeholder: "text body" }
    ],
    multiHandle:true
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

const blockList= [
  { name: "Messages", block: [
    "Send a message",
    "Media",
    "Goodbye message"
  ]},
  
  { name: "Questions", block: [
    "Buttons",
    "Ask for a name",
    "Ask a question",
    "Ask for an email",
    "Ask for a number",
    "Ask for a phone",
    "Ask for a date",
    "Ask for a file",
    "Ask for an address",
    "Ask for a Url",
    "Picture choice",
    "Auto-complete",
    "Yes/No",
    "Rating",
    "Opinion scale",
    "Forms",
    "Multi-questions"
  ]},
  
  { name: "Logic", block: [
    "Conditions",
    "Set a variable",
    "Keyword jump",
    "Global keywords",
    "Formulas",
    "Jump to",
    "Lead scoring",
    "Goal",
    "A/B test",
    "Persistent menu"
  ]},
  
  { name: "Integration", block: [
    "Send an email",
    "Google sheets",
    "Zapier",
    "Airtable",
    "Dialogflow",
    "Hubspot",
    "Slack",
    "Calendly",
    "Stripe",
    "Google analytics",
    "Segment",
    "Salesforce",
    "Mailchimp"
  ]},
  
  { name: "AI Assistant", block: [
    "AI faqs assistant",
    "AI lead gen assistant"
  ]},
  
  { name: "Inbox and Builder Tools", block: [
    "Business hours",
    "Human takeover",
    "Close chat",
    "Bricks",
    "Add a note"
  ]},
  
  { name: "Low Code", block: [
    "Webhook",
    "Trigger automation",
    "Code",
    "Code set",
    "Dynamic data"
  ]}
];
