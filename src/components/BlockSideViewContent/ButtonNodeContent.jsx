// import React from 'react';
// import {
//   AzistarForm,
//   CustomOptionSelector,
//   QuillEditorField,
// } from '../Shared/FormUi';
// import FormTextField from '../Shared/FormUi/FromTextField';
// import * as yup from 'yup';
// const buttonFormSchema = yup.object({
//   tester: yup.string(),
// });
// const buttonFormInitialValues = {
//   tester: 'lorem ipsum',
// };
// function ButtonNodeContent() {
//   return (
//     <AzistarForm
//       onSave={(v) => {
//         console.log(v);
//       }}
//       validationSchema={buttonFormSchema}
//       initialValues={buttonFormInitialValues}
//     >
//       <QuillEditorField name='label1' placeholder='inital vaue' label='Quil' />
//       <FormTextField
//         name='tester'
//         type='textarea'
//         label='Tester'
//         placeholder='Enter user information'
//       />
//       <button type='submit'>go</button>
//       <CustomOptionSelector
//         label='Please choose whiselh'
//         name={'hi'}
//         options={[
//           { value: 'opt1', label: 'OPtion1' },
//           {
//             value: 'opt2',
//             label: 'Option 2',
//           },
//         ]}
//       />
//     </AzistarForm>
//   );
// }

// export default ButtonNodeContent;
