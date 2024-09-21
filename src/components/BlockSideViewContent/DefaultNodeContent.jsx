import SidebarFormContainer from '../Shared/SidebarUi/SidebarFormContainer';
import VariableDropdown from '../Shared/SidebarUi/VariableDropdown';

function DefaultNodeContent() {
  return (
    <SidebarFormContainer block={{ id: 'some' }}>
      <VariableDropdown allowedType='STRING' />
    </SidebarFormContainer>
  );
}

export default DefaultNodeContent;
