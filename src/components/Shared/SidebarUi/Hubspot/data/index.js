export const loadOptions = async (dropdownType) => {
  let options;
  switch (dropdownType) {
    case 'company':
      ({ company: options } = await import('./companyOptions'));
      break;
    case 'contact':
      ({ contact: options } = await import('./contactOptions'));
      break;
    case 'deal':
      ({ deal: options } = await import('./dealOptions'));
      break;
    case 'ticket':
      ({ ticket: options } = await import('./ticketOptions'));
      break;
    default:
      throw new Error('Invalid dropdown type');
  }

  return options.properties;
};
