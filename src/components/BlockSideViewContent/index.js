import { sideViewLayoutType } from '../../config/nodeConfigurations';
import AskQuestionNodeContent from './AskQuestionNodeContent';
import ButtonNodeContent from './ButtonNodeContent';
import { GoodByeNodeContent } from './GoodByeNodeContent';

export const SideViewContent = {
  [sideViewLayoutType.goodBye]: GoodByeNodeContent,
  [sideViewLayoutType.buttons]: ButtonNodeContent,
  [sideViewLayoutType.askQuestion]: AskQuestionNodeContent,
};
