import VariableInputField from 'components/Shared/SidebarUi/VariableInputField';
import SidebarFormContainer from '../Shared/SidebarUi/SidebarFormContainer';
import AzistarEditor from 'components/Shared/UiComponents/AzistarEditor';
import { DraftEditorField } from 'components/Shared/FormUi';

function DefaultNodeContent() {
  return (
    <SidebarFormContainer block={{ id: 'some' }} initialValues={{ test: '' }}>
      In progress
      <VariableInputField popupType='button' />
      <DraftEditorField />
    </SidebarFormContainer>
  );
}

export default DefaultNodeContent;
