import VariableInputField from 'components/Shared/SidebarUi/VariableInputField';
import SidebarFormContainer from '../Shared/SidebarUi/SidebarFormContainer';

function DefaultNodeContent() {
  return (
    <SidebarFormContainer block={{ id: 'some' }} initialValues={{ test: '' }}>
      In progress
      <VariableInputField />
    </SidebarFormContainer>
  );
}

export default DefaultNodeContent;
