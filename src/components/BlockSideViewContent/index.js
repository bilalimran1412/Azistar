import { sideViewLayoutType } from '../../config/nodeConfigurations';
import AskNameNodeContent from './AskNameNodeContent';
import AskQuestionNodeContent from './AskQuestionNodeContent';
import ButtonNodeContent from './ButtonNodeContent';
import DateNodeContent from './DateNodeContent';
import GoodByeNodeContent from './GoodByeNodeContent';

export const SideViewContent = {
  [sideViewLayoutType.goodBye]: GoodByeNodeContent,
  [sideViewLayoutType.buttons]: ButtonNodeContent,
  [sideViewLayoutType.askQuestion]: AskQuestionNodeContent,
  [sideViewLayoutType.date]: DateNodeContent,
  [sideViewLayoutType.askName]: AskNameNodeContent,
};
