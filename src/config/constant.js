import { FaFlag } from 'react-icons/fa';

export const edgeType = 'baseEdge'
const buttonsList = {
  id: 'button1',
  label: 'Edit Button',
  icon: null,
  canBeDelete: false,
}

export const buttonNodeData = {
  items: [buttonsList],
}


const blockList = [
  {
    name: "Messages", block: [
      "Send a message",
      "Media",
      "Goodbye message"
    ]
  },

  {
    name: "Questions", block: [
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
    ]
  },

  {
    name: "Logic", block: [
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
    ]
  },

  {
    name: "Integration", block: [
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
    ]
  },

  {
    name: "AI Assistant", block: [
      "AI faqs assistant",
      "AI lead gen assistant"
    ]
  },

  {
    name: "Inbox and Builder Tools", block: [
      "Business hours",
      "Human takeover",
      "Close chat",
      "Bricks",
      "Add a note"
    ]
  },

  {
    name: "Low Code", block: [
      "Webhook",
      "Trigger automation",
      "Code",
      "Code set",
      "Dynamic data"
    ]
  }
];

export const initialNode = {
  id: '1',
  data: {
    label: 'This is our parent',
    buttons: [],
    contentType: "startingNode",
    blockId: "1",
  },
  position: { x: 50, y: 100 },
  icon: <FaFlag />,
  type: 'baseNode',
};

export const menuItems = [
  { type: 'customNode', label: 'Buttons' },
  { type: 'AskAQuestion', label: 'Ask a question' },
  { type: "askDate", label: "Ask for a Date" },
  { type: 'askName', label: 'Ask for a name' },
  { type: 'askEmail', label: 'Ask for an email' },
  { type: 'askPhone', label: 'Ask for a phone' },
  { type: 'askNumber', label: 'Ask for a number' },
  { type: 'askFile', label: 'Ask for a file' },
  { type: 'autoComplete', label: 'Autocomplete' },
  { type: 'askUrl', label: 'Ask for a URL' },
  { type: 'askAddress', label: 'Ask for an address' },
  { type: 'picChoice', label: 'Picture choice' },
  { type: 'rating', label: 'Rating' },
  { type: 'uploadMedia', label: 'Upload a file' }
];
