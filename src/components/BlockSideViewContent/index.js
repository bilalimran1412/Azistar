import { sideViewLayoutType } from '../../config/nodeConfigurations';
import ABTestingNodeContent from './ABTestingNodeContent';
import AskAddressNodeContent from './AskAddressNodeContent';
import AskEmailNodeContent from './AskEmailNodeContent';
import AskFileNodeContent from './AskFileNodeContent';
import AskNameNodeContent from './AskNameNodeContent';
import AskNumberNodeContent from './AskNumberNodeContent';
import AskPhoneNodeContent from './AskPhoneNodeContent';
import AskQuestionNodeContent from './AskQuestionNodeContent';
import AskUrlNodeContent from './AskUrlNodeContent';
import ButtonNodeContent from './ButtonNodeContent';
import DateNodeContent from './DateNodeContent';
import GoodByeNodeContent from './GoodByeNodeContent';
import MessageMediaNodeContent from './MessageMediaNodeContent';
import OpinionScaleNodeContent from './OpinionScaleNodeContent';
import RatingNodeContent from './RatingNodeContent';
import YesNoNodeContent from './YesNoNodeContent';

export const SideViewContent = {
  [sideViewLayoutType.goodBye]: GoodByeNodeContent,
  [sideViewLayoutType.askQuestion]: AskQuestionNodeContent,
  [sideViewLayoutType.askName]: AskNameNodeContent,
  [sideViewLayoutType.askNumber]: AskNumberNodeContent,
  [sideViewLayoutType.askPhone]: AskPhoneNodeContent,
  [sideViewLayoutType.askEmail]: AskEmailNodeContent,
  [sideViewLayoutType.askFile]: AskFileNodeContent,
  [sideViewLayoutType.askAddress]: AskAddressNodeContent,
  [sideViewLayoutType.askUrl]: AskUrlNodeContent,
  [sideViewLayoutType.opinionScale]: OpinionScaleNodeContent,
  [sideViewLayoutType.rating]: RatingNodeContent,
  [sideViewLayoutType.abTesting]: ABTestingNodeContent,
  [sideViewLayoutType.messageMedia]: MessageMediaNodeContent,
  [sideViewLayoutType.yesNo]: YesNoNodeContent,
  [sideViewLayoutType.buttons]: ButtonNodeContent,

  //needs to be fixed
  [sideViewLayoutType.date]: DateNodeContent,
};
