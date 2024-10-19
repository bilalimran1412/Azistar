import { create } from 'zustand';
import { initialGroupedOptions as initialValue } from 'config/constant';

export const useDropdownStore = create((set, get) => ({
  groupedOptions: initialValue,
  // inputValue: '',

  // setInputValue: (inputValue) => {
  //   const formattedValue = inputValue?.toLowerCase();
  //   set({ inputValue: formattedValue });
  // },

  addCustomVariable: (value, variableType) => {
    const groupedOptions = get().groupedOptions;
    const newCustomOption = {
      value: value,
      label: value,
      type: variableType,
      sample: '',
      readOnly: false,
      category: 'CUSTOM_VARIABLES',
    };
    groupedOptions[3].options.push(newCustomOption);
    set({ groupedOptions: groupedOptions });
  },
  removeCustomVariable: (value) => {
    const groupedOptions = get().groupedOptions;

    const updatedOptions = groupedOptions[3].options.filter(
      (option) => option.value !== value
    );

    groupedOptions[3].options = updatedOptions;
    console.log(groupedOptions);
    set({ groupedOptions: groupedOptions });
  },
}));
