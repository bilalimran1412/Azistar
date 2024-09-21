import { sideViewLayoutType } from '../../config/nodeConfigurations';
import AskNameNodeContent from './AskNameNodeContent';
import AskNumberNodeContent from './AskNumberNodeContent';
import AskQuestionNodeContent from './AskQuestionNodeContent';
import ButtonNodeContent from './ButtonNodeContent';
import DateNodeContent from './DateNodeContent';
import GoodByeNodeContent from './GoodByeNodeContent';

export const SideViewContent = {
  [sideViewLayoutType.goodBye]: GoodByeNodeContent,
  [sideViewLayoutType.askQuestion]: AskQuestionNodeContent,
  [sideViewLayoutType.askName]: AskNameNodeContent,
  [sideViewLayoutType.askNumber]: AskNumberNodeContent,
  [sideViewLayoutType.buttons]: ButtonNodeContent,
  [sideViewLayoutType.date]: DateNodeContent,
};
