import { sideViewLayoutType } from '../../config/nodeConfigurations';
import ABTestingNodeContent from './ABTestingNodeContent';
import AskAddressNodeContent from './AskAddressNodeContent';
import AskEmailNodeContent from './AskEmailNodeContent';
import AskFileNodeContent from './AskFileNodeContent';
import AskNameNodeContent from './AskNameNodeContent';
import AskNumberNodeContent from './AskNumberNodeContent';
import AskPhoneNodeContent from './AskPhoneNodeContent';
import AskQuestionNodeContent from './AskQuestionNodeContent';
import ButtonNodeContent from './ButtonNodeContent';
import DateNodeContent from './DateNodeContent';
import GoodByeNodeContent from './GoodByeNodeContent';
import OpinionScaleNodeContent from './OpinionScaleNodeContent';
import RatingNodeContent from './RatingNodeContent';

export const SideViewContent = {
  [sideViewLayoutType.goodBye]: GoodByeNodeContent,
  [sideViewLayoutType.askQuestion]: AskQuestionNodeContent,
  [sideViewLayoutType.askName]: AskNameNodeContent,
  [sideViewLayoutType.askNumber]: AskNumberNodeContent,
  [sideViewLayoutType.askPhone]: AskPhoneNodeContent,
  [sideViewLayoutType.askEmail]: AskEmailNodeContent,
  [sideViewLayoutType.askFile]: AskFileNodeContent,
  [sideViewLayoutType.askAddress]: AskAddressNodeContent,
  [sideViewLayoutType.askUrl]: AskAddressNodeContent,
  [sideViewLayoutType.opinionScale]: OpinionScaleNodeContent,
  [sideViewLayoutType.rating]: RatingNodeContent,
  [sideViewLayoutType.abTesting]: ABTestingNodeContent,

  //needs to be fixed
  [sideViewLayoutType.buttons]: ButtonNodeContent,
  [sideViewLayoutType.date]: DateNodeContent,
};
