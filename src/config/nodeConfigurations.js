import {
  FaAlignCenter,
  FaBars,
  FaBolt,
  FaBox,
  FaBullseye,
  FaCalculator,
  FaCalendarCheck,
  FaClipboardList,
  FaClock,
  FaCode,
  FaCodeBranch,
  FaCodepen,
  FaCogs,
  FaCommentAlt,
  FaCommentSlash,
  FaCompress,
  FaDatabase,
  FaEnvelope,
  FaExchangeAlt,
  FaFile,
  FaFileExcel,
  FaFilm,
  FaGlobe,
  FaGoogle,
  FaHubspot,
  FaInternetExplorer,
  FaKeyboard,
  FaLink,
  FaMailBulk,
  FaMailchimp,
  FaMapMarker,
  FaMemory,
  FaPhone,
  FaQuestionCircle,
  FaRandom,
  FaRegAddressCard,
  FaRegCalendarAlt,
  FaRegImage,
  FaRegSquare,
  FaRobot,
  FaSalesforce,
  FaSearch,
  FaSignOutAlt,
  FaSlack,
  FaSlidersH,
  FaSortNumericDown,
  FaStar,
  FaStickyNote,
  FaStripeS,
  FaTasks,
  FaToggleOn,
  FaUser,
  FaUserCircle,
} from 'react-icons/fa';

import { initialNode } from './constant';

export const contentType = {
  uploadMedia: 'uploadMedia',
  buttonNode: 'buttonNode',
  //such nodes which do not have incoming/outgoing edges (note, global keyword)
  placeholderNodes: 'placeHolderNodes',
  incomingOnly: 'incomingOnly',
  startingNode: 'startingNode',
};

export const sideViewLayoutType = {
  //this node config data has initial values
  //this node is final for all the form values and styling
  multiQuestions: 'multiQuestions',

  //add initial data to config.data from form initial values
  forms: 'form',
  pictureChoice: 'pictureChoice',
  date: 'date',
  goodBye: 'goodbye',
  askQuestion: 'askQuestion',
  askName: 'askName',
  askNumber: 'askNumber',
  askPhone: 'askPhone',
  askEmail: 'askEmail',
  askFile: 'askFile',
  askAddress: 'askAddress',
  askUrl: 'askUrl',
  opinionScale: 'opinionScale',
  rating: 'rating',
  abTesting: 'abTesting',
  yesNo: 'yesNo',
  messageMedia: 'messageMedia',
  buttons: 'button',
  botJump: 'botJump',
  goal: 'goal',
  persistentMenu: 'persistentMenu',
  leadScoring: 'leadScoring',
  emailIntegration: 'emailIntegration',
  aiFaq: 'aiFaq',
  businessHours: 'businessHours',
  humanTakeover: 'humanTakeover',
  triggerAutomation: 'triggerAutomation',
  slackIntegration: 'slackIntegration',
  googleSheets: 'googleSheets',
  zapier: 'zapier',
  calendly: 'calendly',
  googleAnalytics: 'googleAnalytics',
  note: 'note',
  webhook: 'webhook',
  mailchimp: 'mailchimp',
  hubspot: 'hubspot',
};

//groups for creating nodes

const Groups = {
  messages: 'Message',
  question: 'Question',
  logic: 'Logic',
  integration: 'Integration',
  aiAssistant: 'Ai Assistant',
  inboxAndBuilderTools: 'Inbox & Builder Tools',
  lowCode: 'Low Code',
};

export const nodeConfigurations = {
  messages: [
    {
      group: Groups.messages,
      blockId: '6d7e4289-d701-52b3-a1c1-ffc8ba1d69f6',
      title: 'Send a Message',
      label: 'Send a Message',
      icon: <FaCommentAlt />,
      nodeType: 'baseNode',
      data: {
        layoutType: sideViewLayoutType.messageMedia,
        initialItem: 'message',
        nodeTextContent: 'Add text message or display media',
      },
    },
    {
      group: Groups.messages,
      blockId: 'e638f7c8-ca9c-53ff-bdb8-2e81c2ff79e3',
      title: 'Media',
      label: 'Media',
      nodeType: 'baseNode',
      icon: <FaFilm />,
      data: {
        contentType: contentType.uploadMedia,
        layoutType: sideViewLayoutType.messageMedia,
        initialItem: 'media',
        nodeTextContent: 'Display media or add text message',
      },
    },
    {
      group: Groups.messages,
      blockId: 'e10a2810-3fe9-53bb-be38-c11dfa857e7d',
      title: 'Goodbye Message',
      label: 'Goodbye Message',
      icon: <FaCommentSlash />,
      nodeType: 'baseNode',
      data: {
        contentType: contentType.incomingOnly,
        layoutType: sideViewLayoutType.goodBye,
        nodeTextContent: 'A farewell message',
        params: {
          socialEnable: false,
          startButtonEnable: false,
          redirectEnable: false,
          redirectTimeout: 3,
        },
      },
      fields: {
        label: 'Type here your goodbye message',
        type: 'text',
        variable: 'textareaFieldData',
        placeholder: 'Message Text',
      },
    },
  ],

  questions: [
    {
      group: Groups.question,
      blockId: '044e2870-b2fc-5377-9622-4ac0eea5acce',
      title: 'Buttons',
      label: 'Buttons',
      variableType: 'STRING',
      nodeType: 'baseNode',
      icon: <FaRegSquare />,
      data: {
        multipleHandles: true,
        layoutType: sideViewLayoutType.buttons,
        contentType: contentType.buttonNode,

        params: {
          variable: {
            category: 'CUSTOM_VARIABLES',
            label: 'options',
            readOnly: false,
            sample: '',
            type: 'STRING',
            value: 'options',
          },
          buttons: [
            {
              text: 'Button',
              id: '975bea52-8ba7-53e4-a33b-d23acde26b2b',
              buttonStyle: 'text',
              icon: null,
              externalLink: '',
              isSettingExpand: false,
              sortOrder: 1,
            },
          ],
          minMaxOptions: false,
          buttonsAlignment: 'horizontal',
          randomizeOrder: false,
          searchableOptions: false,
          multipleChoices: false,
          outputAsArray: false,
          min: 1,
          max: 'all',
        },
      },
      fields: {
        label: 'Button Text',
        type: 'button',
        variable: 'textareaFieldData',
        placeholder: 'Enter button text',
      },
    },
    {
      group: Groups.question,
      blockId: '5e3fc6c2-4a07-5ee2-b989-94bc1b69719e',
      title: 'Ask for a Name',
      label: 'Ask for a Name',
      icon: <FaUserCircle />,
      nodeType: 'baseNode',
      data: {
        layoutType: sideViewLayoutType.askName,
      },
      fields: [
        {
          value: "What's your name?",
          label: 'Question',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: "What's your name?",
        },
      ],
      variableType: 'STRING',
    },
    {
      group: Groups.question,
      variableType: 'STRING',
      blockId: 'ec7402de-5bac-5bb5-a4d8-93ae3fbce391',
      title: 'Ask a Question',
      label: 'Ask a Question',
      nodeType: 'baseNode',
      icon: <FaQuestionCircle />,

      data: {
        layoutType: sideViewLayoutType.askQuestion,
      },
      fields: [
        {
          label: 'Question Text',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Ask anything',
        },
      ],
    },
    {
      group: Groups.question,
      blockId: '4354fa96-574f-5723-9322-75164a27b81d',
      title: 'Ask for an Email',
      label: 'Ask for an Email',
      icon: <FaEnvelope />,
      data: {
        layoutType: sideViewLayoutType.askEmail,
      },
      variableType: 'STRING',
      nodeType: 'baseNode',
      fields: [
        {
          label: 'Question',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: "What's your email?",
        },
      ],
    },
    {
      group: Groups.question,
      blockId: 'c65da9f7-1ed1-50b8-9265-596e4da2f706',
      title: 'Ask for a Number',
      label: 'Ask for a Number',
      variableType: 'NUMBER',
      nodeType: 'baseNode',
      icon: <FaCalculator />,
      data: {
        layoutType: sideViewLayoutType.askNumber,
      },
      fields: [
        {
          label: 'Question',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Type a number, please',
        },
      ],
    },
    {
      group: Groups.question,
      blockId: 'b8714b09-db46-5f9b-9431-af00d863506c',
      title: 'Ask for a Phone',
      label: 'Ask for a Phone',
      icon: <FaPhone />,
      nodeType: 'baseNode',
      data: {
        layoutType: sideViewLayoutType.askPhone,
      },
      variableType: 'STRING',
      fields: [
        {
          label: 'Question',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: "What's your number?",
        },
      ],
    },
    {
      group: Groups.question,
      blockId: '34dc3f09-0a00-5375-8ade-bfa7d122897e',
      title: 'Ask for a Date',
      label: 'Ask for a Date',
      icon: <FaRegCalendarAlt />,
      nodeType: 'baseNode',
      variableType: 'ARRAY',

      data: {
        layoutType: sideViewLayoutType.date,
      },
      fields: [
        {
          label: 'Question',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Select a date, please',
        },
      ],
    },
    {
      group: Groups.question,
      blockId: 'd64bd59a-49d6-5824-ad63-d67453b50ca9',
      title: 'Ask for a File',
      label: 'Ask for a File',
      icon: <FaFile />,
      nodeType: 'baseNode',
      variableType: 'STRING',
      data: {
        layoutType: sideViewLayoutType.askFile,
      },
      fields: [
        {
          label: 'Question',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'File upload',
        },
      ],
    },
    {
      group: Groups.question,
      blockId: '006ccdcc-3fd5-5c85-81cf-39d7d01a8f0f',
      title: 'Ask for an Address',
      label: 'Ask for an Address',
      nodeType: 'baseNode',
      icon: <FaRegAddressCard />,
      variableType: 'STRING',
      data: {
        layoutType: sideViewLayoutType.askAddress,
      },
      fields: [
        {
          label: 'Question',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Type your address, please',
        },
      ],
    },
    {
      group: Groups.question,
      blockId: 'a5558130-8f59-5730-89d0-de643807cad7',
      title: 'Ask for a URL',
      label: 'Ask for a URL',
      icon: <FaInternetExplorer />,
      nodeType: 'baseNode',
      variableType: 'STRING',
      data: {
        layoutType: sideViewLayoutType.askUrl,
      },
      fields: [
        {
          label: 'Question',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Type a Url',
        },
      ],
    },
    {
      group: Groups.question,
      blockId: '24f88b4f-f397-5f7c-bc1e-c7eb5bb3bb2e',
      title: 'Picture Choice',
      label: 'Picture Choice',
      nodeType: 'baseNode',
      variableType: 'STRING',
      icon: <FaRegImage />,
      data: {
        multipleHandles: true,
        contentType: contentType.buttonNode,
        layoutType: sideViewLayoutType.pictureChoice,
        items: [],
      },
      fields: [
        {
          label: 'Question',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Image carousel',
        },
      ],
    },
    {
      group: Groups.question,
      blockId: 'a24d9b82-ff58-516f-9bdd-24009f239c62',
      title: 'Auto-complete',
      label: 'Auto-complete',
      nodeType: 'baseNode',
      icon: <FaSearch />,
      data: {
        multipleHandles: true,
        contentType: contentType.buttonNode,
        items: [],
      },
      fields: [
        {
          label: 'Autocomplete Text',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Input Suggestions',
        },
      ],
    },
    {
      group: Groups.question,
      blockId: '1665b528-5727-54e7-8873-a95265ce56c0',
      title: 'Yes/No',
      label: 'Yes/No',
      nodeType: 'baseNode',
      icon: <FaToggleOn />,
      variableType: 'STRING',

      data: {
        multipleHandles: true,
        contentType: contentType.buttonNode,
        layoutType: sideViewLayoutType.yesNo,
        buttons: [
          {
            text: 'Yes',
            id: '975bea52-8ba7-53e4-a33b-d23acde26b2b',
            buttonStyle: 'icon',
            icon: 'coding',
            externalLink: '',
            isSettingExpand: false,
            sortOrder: 1,
          },
          {
            text: 'No',
            id: '975bea52-4bb7-63e4-a33b-d65afde26b2b',
            buttonStyle: 'icon',
            icon: 'coding',
            externalLink: '',
            isSettingExpand: false,
            sortOrder: 2,
          },
        ],
      },
      fields: [
        {
          label: 'Question',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Yes/No choice',
        },
      ],
    },
    {
      group: Groups.question,
      blockId: '237b6b91-3563-50c1-84fb-8312b9bf5d66',
      title: 'Rating',
      label: 'Rating',
      nodeType: 'baseNode',
      icon: <FaStar />,
      variableType: 'STRING',
      data: {
        multipleHandles: true,
        contentType: contentType.buttonNode,
        layoutType: sideViewLayoutType.rating,

        items: [
          { id: 'rating-level-1', label: '1 Star Rating', isDeletable: false },
          { id: 'rating-level-2', label: '2 Star Rating', isDeletable: false },
          { id: 'rating-level-3', label: '3 Star Rating', isDeletable: false },
        ],
      },
      fields: [
        {
          label: 'Rating Question',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Create an evaluation',
        },
      ],
    },
    {
      group: Groups.question,
      blockId: 'c2018e1b-27f4-5be6-92ee-38d6808775d1',
      title: 'Opinion Scale',
      label: 'Opinion Scale',
      nodeType: 'baseNode',
      icon: <FaSlidersH />,
      variableType: 'NUMBER',
      data: {
        multipleHandles: true,
        contentType: contentType.buttonNode,
        layoutType: sideViewLayoutType.opinionScale,
        items: [
          { id: 'opinion-level-worst', label: '0- Worst', isDeletable: false },
          { id: 'opinion-level-1', label: '1', isDeletable: false },
          { id: 'opinion-level-2', label: '2', isDeletable: false },
          { id: 'opinion-level-3', label: '3', isDeletable: false },
          { id: 'opinion-level-4', label: '4', isDeletable: false },
          { id: 'opinion-level-5', label: '5- Best', isDeletable: false },
        ],
      },
      fields: [
        {
          label: 'Scale Question',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Pick a value',
        },
      ],
    },
    {
      group: Groups.question,
      blockId: '9b750258-ea2f-55f0-b9f9-122561329231',
      title: 'Forms',
      label: 'Forms',
      icon: <FaClipboardList />,
      nodeType: 'baseNode',
      data: {
        layoutType: sideViewLayoutType.forms,
        rows: [
          {
            questions: [],
            layout: '1',
            id: 'd3f24283-0a2a-54d8-ae94-88741791b3a9',
          },
        ],
      },
      fields: [
        {
          label: 'Form Setup',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Form title: Answer the following questions',
          value: 'Form title: Answer the following questions',
        },
      ],
    },
    {
      group: Groups.question,
      blockId: '6d0659cc-f985-5173-b92e-f0d281285050',
      title: 'Multi-questions',
      label: 'Multi-questions',
      icon: <FaTasks />,
      nodeType: 'baseNode',
      data: {
        //not a multi handles node
        //does not require variable also
        // multipleHandles: true,
        // contentType: contentType.buttonNode,
        layoutType: sideViewLayoutType.multiQuestions,
        sendLabel: 'Send',
        isAdvancedEnabled: false,
      },
      fields: [
        {
          label: 'Message',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Example: Answer the following questions',
          value: 'Form title: Answer the following questions',
        },
      ],
    },
  ],

  logic: [
    {
      group: Groups.logic,
      blockId: 'fbf0fd29-1a57-5871-9c92-862376afa3a2',
      title: 'Conditions',
      label: 'Conditions',
      nodeType: 'baseNode',
      icon: <FaCodeBranch />,

      data: {
        multipleHandles: true,
        customHandle: [
          {
            id: 'success',
            type: 'success',
          },
          {
            id: 'failure',
            type: 'failure',
          },
        ],
      },
      fields: [
        {
          label: 'Condition Logic',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Define condition logic',
        },
      ],
    },
    {
      group: Groups.logic,
      blockId: 'a070b269-079e-57f0-ab92-4db0b03d0aa7',
      title: 'Set a Variable',
      label: 'Set a Variable',
      icon: <FaMemory />,
      nodeType: 'baseNode',
      data: {
        multipleHandles: true,
        customHandle: [
          {
            id: 'success',
            type: 'success',
          },
          {
            id: 'failure',
            type: 'failure',
          },
        ],
      },
      fields: [
        {
          label: 'Variable Name',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Enter variable name',
        },
      ],
    },
    {
      group: Groups.logic,
      blockId: 'd86c094b-9064-5f94-9b04-dad568b2654c',
      title: 'Keyword Jump',
      label: 'Keyword Jump',
      nodeType: 'baseNode',
      icon: <FaKeyboard />,

      data: {
        multipleHandles: true,
        customHandle: [
          {
            id: 'success',
            type: 'success',
          },
          {
            id: 'failure',
            type: 'failure',
          },
        ],
      },
      fields: [
        {
          label: 'Keyword',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Switch Conditions',
        },
      ],
    },
    {
      group: Groups.logic,
      blockId: '6002b8e7-027c-5f10-9d47-06bb0de58b55',
      title: 'Global Keywords',
      label: 'Global Keywords',
      icon: <FaGlobe />,
      nodeType: 'baseNode',
      data: {
        contentType: contentType.placeholderNodes,
      },
      fields: [
        {
          label: 'Keywords',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Define global keywords',
        },
      ],
    },
    {
      group: Groups.logic,
      blockId: '3f719865-7bd5-5623-b0bb-8752ea2ab8fb',
      title: 'Formulas',
      label: 'Formulas',
      nodeType: 'baseNode',
      icon: <FaCompress />,

      data: {
        multipleHandles: true,
        customHandle: [
          {
            id: 'success',
            type: 'success',
          },
          {
            id: 'failure',
            type: 'failure',
          },
        ],
      },
      fields: [
        {
          label: 'Formula',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Define formula',
        },
      ],
    },
    {
      group: Groups.logic,
      blockId: '3ff411f3-165c-5c50-9d3e-15cec796564d',
      title: 'Jump to',
      label: 'Jump to',
      nodeType: 'baseNode',
      icon: <FaExchangeAlt />,
      data: {
        layoutType: sideViewLayoutType.botJump,
      },
      fields: [
        {
          label: 'Jump Target',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Jump to an other bot',
        },
      ],
    },
    {
      group: Groups.logic,
      blockId: 'dac4200e-7c8b-5719-8e3a-7c9df19cd1d3',
      title: 'Lead Scoring',
      label: 'Lead Scoring',
      icon: <FaSortNumericDown />,
      variableType: 'NUMBER',
      data: {
        layoutType: sideViewLayoutType.leadScoring,
      },
      nodeType: 'baseNode',
      fields: [
        {
          label: 'Scoring Logic',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Give each lead a score',
        },
      ],
    },
    {
      group: Groups.logic,
      blockId: '14647fb4-292e-5490-89eb-e925b7a89c40',
      title: 'Goal',
      label: 'Goal',
      icon: <FaMapMarker />,
      data: {
        layoutType: sideViewLayoutType.goal,
      },
      nodeType: 'baseNode',
      fields: [
        {
          label: 'Goal Setup',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Track conversion rates',
        },
      ],
    },
    {
      group: Groups.logic,
      blockId: '3d03d21d-7f35-52b3-b2cf-3dc6fa25191e',
      title: 'A/B Test',
      label: 'A/B Test',
      nodeType: 'baseNode',
      icon: <FaRandom />,

      data: {
        layoutType: sideViewLayoutType.abTesting,
        multipleHandles: true,
        contentType: contentType.buttonNode,
        items: [
          { id: 'ab-test-a', label: 'A (50%)', isDeletable: false },
          { id: 'ab-test-b', label: 'B (50%)', isDeletable: false },
        ],
      },
      // fields: [
      //   {
      //     label: 'Test Setup',
      //     type: 'text',
      //     variable: 'textareaFieldData',
      //     placeholder: 'Setup A/B testing',
      //   },
      // ],
    },
    {
      group: Groups.logic,
      blockId: '0aba4cea-8172-5492-9a24-21703395b4d6',
      title: 'Persistent Menu',
      label: 'Persistent Menu',
      icon: <FaBars />,
      nodeType: 'baseNode',
      data: { layoutType: sideViewLayoutType.persistentMenu },
      fields: [
        {
          label: 'Menu Items',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: "Add & set the menu's items",
        },
      ],
    },
  ],

  integration: [
    {
      group: Groups.integration,
      blockId: '3a687dab-b550-5863-b47e-5ec295fe8bac',
      title: 'Send an Email',
      label: 'Send an Email',
      icon: <FaMailBulk />,
      nodeType: 'baseNode',
      data: {
        layoutType: sideViewLayoutType.emailIntegration,
      },
      fields: [
        {
          label: 'Email Content',
          type: 'textarea',
          variable: 'textareaFieldData',
          placeholder: 'To your leads & team',
        },
      ],
    },
    {
      group: Groups.integration,
      blockId: 'f4f6a177-a1d0-5e96-ae88-ab215a391396',
      title: 'Google Sheets',
      label: 'Google Sheets',
      icon: <FaFileExcel />,
      data: {
        layoutType: sideViewLayoutType.googleSheets,
      },
      nodeType: 'baseNode',
      fields: [
        {
          label: 'Sheet Link',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Save & obtain data',
        },
      ],
    },
    {
      group: Groups.integration,
      blockId: 'eda7f4d5-d702-51a5-80f0-fdecb30a7296',
      title: 'Zapier',
      label: 'Zapier',
      icon: <FaBolt />,
      nodeType: 'baseNode',
      data: {
        layoutType: sideViewLayoutType.zapier,
      },
      width: '500px',
      fields: [
        {
          label: 'Zap Setup',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Integrate with zapier',
        },
      ],
    },
    {
      group: Groups.integration,
      blockId: '794665d9-f7ab-55bf-8cc3-8b3d49080d3d',
      title: 'Airtable',
      label: 'Airtable',
      icon: <FaAlignCenter />,
      nodeType: 'baseNode',
      fields: [
        {
          label: 'Airtable Link',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Save & get user data',
        },
      ],
    },
    {
      group: Groups.integration,
      blockId: '220e251b-4f7e-5b96-89d3-5df84e90e087',
      title: 'Dialogflow',
      label: 'Dialogflow',
      icon: <FaAlignCenter />,
      nodeType: 'baseNode',
      fields: [
        {
          label: 'Dialogflow Setup',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Add NLP',
        },
      ],
    },
    {
      group: Groups.integration,
      blockId: '173663dd-d54c-5abc-b57c-37c9f6c48cbd',
      title: 'Hubspot',
      label: 'Hubspot',
      icon: <FaHubspot />,
      nodeType: 'baseNode',
      width: '500px',
      data: {
        layoutType: sideViewLayoutType.hubspot,
      },
      // fields: [
      //   {
      //     label: 'Hubspot Setup',
      //     type: 'text',
      //     variable: 'textareaFieldData',
      //     placeholder: 'Connect your CRM',
      //   },
      // ],
    },
    {
      group: Groups.integration,
      blockId: '345790a5-9f3a-5395-ad36-3e045e5ae80d',
      title: 'Slack',
      label: 'Slack',
      icon: <FaSlack />,
      nodeType: 'baseNode',
      data: {
        layoutType: sideViewLayoutType.slackIntegration,
      },
      fields: [
        {
          label: 'Slack Setup',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Send notifications',
        },
      ],
    },
    {
      group: Groups.integration,
      blockId: '79b8674c-c485-5eca-93f6-a6491f73e487',
      title: 'Calendly',
      label: 'Calendly',
      icon: <FaCalendarCheck />,
      nodeType: 'baseNode',
      data: {
        multipleHandles: true,
        layoutType: sideViewLayoutType.calendly,
        contentType: contentType.buttonNode,
        items: [
          { id: 'event-booked', label: 'Event booked', isDeletable: false },
          {
            id: 'event-cancelled',
            label: 'Event cancelled',
            isDeletable: false,
          },
        ],
      },
      fields: [
        {
          label: 'Calendly Setup',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Schedule meetings',
        },
      ],
    },
    {
      group: Groups.integration,
      blockId: '48ff9e8f-7567-5db9-adb9-aac489c583a3',
      title: 'Stripe',
      label: 'Stripe',
      icon: <FaStripeS />,
      nodeType: 'baseNode',
      data: {
        multipleHandles: true,
        contentType: contentType.buttonNode,
        items: [
          { id: 'Success', label: 'Success', isDeletable: false },
          { id: 'Failed', label: 'Failed', isDeletable: false },
        ],
      },
      fields: [
        {
          label: 'Stripe Integration',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: '0 USD',
        },
      ],
    },
    {
      group: Groups.integration,
      blockId: 'd6ca1ed1-810f-544a-bd7a-9d9feca6e144',
      title: 'Google Analytics',
      label: 'Google Analytics',
      icon: <FaGoogle />,
      nodeType: 'baseNode',
      data: {
        layoutType: sideViewLayoutType.googleAnalytics,
      },
      fields: [
        {
          label: 'Analytics Setup',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Send a GA event',
        },
      ],
    },
    {
      group: Groups.integration,
      blockId: '0c6fee80-ccae-5d89-b2b6-0484d34f4803',
      title: 'Segment',
      label: 'Segment',
      icon: <FaAlignCenter />,
      nodeType: 'baseNode',
      fields: [
        {
          label: 'Segment Setup',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Collect user events',
        },
      ],
    },
    {
      group: Groups.integration,
      blockId: 'f29c80a2-85b1-5499-ac50-6c682599b9e1',
      title: 'Salesforce',
      label: 'Salesforce',
      icon: <FaSalesforce />,
      nodeType: 'baseNode',
      fields: [
        {
          label: 'Salesforce Integration',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Add leads',
        },
      ],
    },
    {
      group: Groups.integration,
      blockId: '2eef6c57-fc89-5c90-8f70-d0bec2546724',
      title: 'Mailchimp',
      label: 'Mailchimp',
      icon: <FaMailchimp />,
      nodeType: 'baseNode',
      data: { layoutType: sideViewLayoutType.mailchimp },
      //   fields: [
      //     {
      //       label: 'Mailchimp Integration',
      //       type: 'text',
      //       variable: 'textareaFieldData',
      //       placeholder: 'Add a contact',
      //     },
      //   ],
      // },
    },
  ],

  aiAssistant: [
    {
      group: Groups.aiAssistant,
      blockId: '567d4330-eba2-5eb8-8213-9fc397752a0c',
      title: 'AI FAQs Assistant',
      label: 'AI FAQs Assistant',
      icon: <FaRobot />,
      nodeType: 'baseNode',
      data: {
        layoutType: sideViewLayoutType.aiFaq,
      },
      fields: [
        {
          label: 'FAQs Setup',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Automated help',
        },
      ],
    },
    {
      group: Groups.aiAssistant,
      blockId: '3e05a8b2-32d1-520d-ad4e-9697fac8bc34',
      title: 'AI Lead Gen Assistant',
      label: 'AI Lead Gen Assistant',
      icon: <FaBullseye />,
      nodeType: 'baseNode',
      fields: [
        {
          label: 'Lead Gen Setup',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Smart lead engagement',
        },
      ],
    },
  ],

  inboxAndBuilderTools: [
    {
      group: Groups.inboxAndBuilderTools,
      blockId: '25f47baf-5bdc-51ab-980c-cfd09411e616',
      title: 'Business Hours',
      label: 'Business Hours',
      nodeType: 'baseNode',
      icon: <FaClock />,
      data: {
        layoutType: 'businessHours',
        multipleHandles: true,
        contentType: contentType.buttonNode,
        items: [
          { id: 'open', label: 'Open', isDeletable: false },
          { id: 'closed', label: 'Closed', isDeletable: false },
        ],
      },
      fields: [
        {
          label: 'Business Hours',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Split the flow',
        },
      ],
    },
    {
      group: Groups.inboxAndBuilderTools,
      blockId: 'f5baed1c-01b1-5a0c-bb73-157eac902473',
      title: 'Human Takeover',
      label: 'Chat to your users',
      icon: <FaUser />,
      nodeType: 'baseNode',
      data: {
        layoutType: sideViewLayoutType.humanTakeover,
      },
    },
    {
      group: Groups.inboxAndBuilderTools,
      blockId: '00ce8611-8885-563d-9240-37d4942c8e3d',
      title: 'Close Chat',
      label: 'Close Chat',
      icon: <FaSignOutAlt />,
      nodeType: 'baseNode',
      fields: [
        {
          label: 'Close Message',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Set status to closed',
        },
      ],
    },
    {
      group: Groups.inboxAndBuilderTools,
      blockId: '29d89034-306b-5feb-a242-e0cbe1c330d9',
      title: 'Bricks',
      label: 'Bricks',
      icon: <FaBox />,
      nodeType: 'baseNode',
      fields: [
        {
          label: 'Brick Configuration',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Configure chat bricks',
        },
      ],
    },
    {
      group: Groups.inboxAndBuilderTools,
      blockId: 'fc4bd563-8d62-5bc2-8a32-9452732899a5',
      title: 'Add a Note',
      label: 'Add a Note',
      nodeType: 'baseNode',
      icon: <FaStickyNote />,
      data: {
        contentType: contentType.placeholderNodes,
        layoutType: sideViewLayoutType.note,
      },
      fields: [
        {
          label: 'Note',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Type your note here...',
        },
      ],
    },
  ],

  lowCode: [
    {
      group: Groups.lowCode,
      blockId: 'cbafdc07-0f45-5155-91c7-75b891b7e3c0',
      title: 'Webhook',
      label: 'Webhook',
      nodeType: 'baseNode',
      width: '500px',
      icon: <FaLink />,
      data: {
        multipleHandles: true,
        layoutType: sideViewLayoutType.webhook,
        customHandle: [
          {
            id: 'success',
            type: 'success',
          },
          {
            id: 'failure',
            type: 'failure',
          },
        ],
      },
      fields: [
        {
          label: 'Webhook URL',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'https requests',
        },
      ],
    },
    {
      group: Groups.lowCode,
      blockId: '78142b1a-9f25-58b2-bba2-651c081adcbb',
      title: 'Trigger Automation',
      label: 'Trigger Automation',
      icon: <FaCogs />,
      width: '500px',
      nodeType: 'baseNode',
      data: {
        layoutType: sideViewLayoutType.triggerAutomation,
        multipleHandles: true,
        customHandle: [
          {
            id: 'success',
            type: 'success',
          },
          {
            id: 'failure',
            type: 'failure',
          },
        ],
      },
      fields: [
        {
          label: 'Automation Details',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'https://',
        },
      ],
    },
    {
      group: Groups.lowCode,
      blockId: '9d136442-9115-54b8-8a24-971b484f64e7',
      title: 'Code',
      label: 'Code',
      icon: <FaCode />,
      nodeType: 'baseNode',
      fields: [
        {
          label: 'Code Snippet',
          type: 'textarea',
          variable: 'textareaFieldData',
          placeholder: 'Enter custom code',
        },
      ],
    },
    {
      group: Groups.lowCode,
      blockId: 'adc831c1-dfe5-564a-b319-a0600bbe52d2',
      title: 'Code Set',
      label: 'Code Set',
      icon: <FaCodepen />,

      nodeType: 'baseNode',
      fields: [
        {
          label: 'Code Set',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Define a set of codes',
        },
      ],
    },
    {
      group: Groups.lowCode,
      blockId: '25e21d1a-f5ca-5df2-8fe4-36f6355506b7',
      title: 'Dynamic Data',
      label: 'Dynamic Data',
      nodeType: 'baseNode',
      icon: <FaDatabase />,
      fields: [
        {
          label: 'Data Source',
          type: 'text',
          variable: 'textareaFieldData',
          placeholder: 'Display dynamic values',
        },
      ],
    },
  ],
};

export const nodeConfigurationBlockIdMap = {
  ...Array.from(Object.values(nodeConfigurations))
    .flatMap((a) => a)
    .reduce((acc, curr) => {
      acc[curr.blockId] = curr;
      return acc;
    }, {}),
  1: initialNode,
};

export const menuOptionList = Array.from(Object.values(nodeConfigurations))
  .flatMap((a) => a)
  .map((n) => ({
    label: n.label,
    blockId: n.blockId,
    group: n.group,
    icon: n.icon,
  }));
