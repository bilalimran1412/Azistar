  import React, {useState, useEffect} from 'react';
  import axios from 'axios';
  import { Button, Divider, Flex, Text } from '@chakra-ui/react';
  import {
    FieldValuesFieldArray,
    FormCheckboxGroup,
    FormDropdown,
    FormVariableSelectorDropdown,
  } from '../Shared/FormUi';
  import { SidebarFormContainer } from '../Shared/SidebarUi';
  import { useNodeContext } from '../../views/canvas/NodeContext';
  import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
  import { yup } from '../../utils/yup';
  import { useFormikContext } from 'formik';
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const authOptions = [
    { label: 'Account 1', value: 'acc1' },
    {
      label: 'Account 2',
      value: 'acc2',
    },
  ];
  const interests = [
    {
      label: 'option 1',
      value: '1008502409',
    },
    {
      label: 'option 2',
      value: '2e1305b4d6',
    },
    {
      label: 'option 3',
      value: 'cac16bcfaa',
    },
  ];

  const audCatInt = {
    acc1: {
      interests: {
        c1: interests,
        c2: [
          {
            label: 'Acc1 option1',
            value: 'cac1sdsz6bceds-opt1',
          },
        ],
      },
      audience: [
        {
          label: 'Audience1',
          value: '1',
        },
        {
          label: 'Audience2',
          value: '12',
        },
      ],
      category: [
        {
          label: 'cat 1',
          value: 'c1',
        },
        {
          label: 'cat 2',
          value: 'c2',
        },
      ],
    },
    acc2: {
      interests: {
        ac2c1: [
          {
            label: 'acc2 cat1 option1',
            value: '2e1ds34d6',
          },
          {
            label: 'acc2 cat1 option2',
            value: 'cac1sd6bceds',
          },
        ],
        ac2c2: [
          {
            label: 'ac2 cat 2 option',
            value: 'cac1sdsz6bceds',
          },
        ],
      },
      audience: [
        {
          label: 'acc2 Audience1',
          value: '1acc2',
        },
        {
          label: 'acc2 Audience2',
          value: '12acc2',
        },
      ],
      category: [
        {
          label: 'acc 2cat 1',
          value: 'ac2c1',
        },
        {
          label: 'acc2 cat 2',
          value: 'ac2c2',
        },
      ],
    },
  };

  const dropdownOptions = [
    {
      label: 'Address',
      value: 'ADDRESS',
    },
    {
      label: 'Birthday',
      value: 'BIRTHDAY',
    },
    {
      label: 'Company',
      value: 'COMPANY',
    },
    {
      label: 'First Name',
      value: 'FNAME',
    },
    {
      label: 'Last Name',
      value: 'LNAME',
    },
    {
      label: 'Phone Number',
      value: 'PHONE',
    },
  ];
  function MailchimpNodeContent({ id }) {
    const { getNodeById, setSideView, updateNodeById } = useNodeContext();
    const [selectedAuth, setSelectedAuth] = React.useState(null);
    const currentNode = getNodeById(id);
    const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
    const handleClose = () => {
      setSideView(false);
    };
    if (!config) return <></>;
    // console.log('creating sidebar for block', config);

    const initialValues = {
      auth: selectedAuth || currentNode?.data?.params?.auth || '',
      audience: currentNode?.data?.params?.audience || '',
      category: currentNode?.data?.params?.category || '',
      interests: currentNode?.data?.params?.interests || '',
      email: currentNode?.data?.params?.email || '',
      fieldValues: currentNode?.data?.params?.fieldValues || [
        { field: '', id: 'ac2e1be9-fdb7-5e62-abe3-b20b4d2b2bb2' },
      ],
    };
    const validationSchema = yup.object({});

    const getLoggedInUser = async () => {
      try {
        // Fetch the logged-in user from the backend
        const response = await axios.get('http://localhost:4000/api/v1/integrate/mailchimp_getdetails', { withCredentials: true });
    
        if (response.status === 200) {
          return response.data; // Assuming this contains { email, name, id }
        }
        throw new Error('Failed to get logged-in user');
      } catch (error) {
        console.error('Error getting logged-in user:', error);
        throw new Error('Error fetching logged-in user data');
      }
    };


    const onSave = async (formValues) => {
      try {
        console.log('formValues before save:', formValues);
    
        // Extract field values
        const fieldValues = formValues?.fieldValues?.filter((value) => value.field);
        
        let email = formValues.email?.value || '';
        console.log('Extracted email from formValues:', email);
        
        // Fallback to logged-in user if email is missing or incorrect
        if (!email || email === 'email') {
          const loggedInUser = await getLoggedInUser();
          email = loggedInUser?.account_details?.email || '';
          console.log('Email from logged-in user:', email);
        
          if (!email) {
            throw new Error('Missing email address');
          }
        }
        
        // Extract name and id, fallback to logged-in user if missing
        let name = formValues.name || '';
        let id = formValues.id || '';
        
        if (name === 'name' || id === 'id') {
          const loggedInUser = await getLoggedInUser();
          name = `${loggedInUser.first_name} ${loggedInUser.last_name}`;
          id = loggedInUser.id;
        }
        
        console.log('Final extracted values:', { email, name, id });
        
        const mergeFields = {};
        formValues.fieldValues.forEach((fieldValue) => {
          if (fieldValue.field && fieldValue.variable.value) {
            const field = fieldValue.field.toUpperCase();
            if (field === 'FNAME') mergeFields.FNAME = fieldValue.variable.value;
            else if (field === 'LNAME') mergeFields.LNAME = fieldValue.variable.value;
            else if (field === 'PHONE') mergeFields.PHONE = fieldValue.variable.value;
            else if (field === 'ADDRESS') mergeFields.ADDRESS = fieldValue.variable.value;
            else if (field === 'BIRTHDAY') mergeFields.BIRTHDAY = fieldValue.variable.value;
            else if (field === 'COMPANY') mergeFields.COMPANY = fieldValue.variable.value;
          }
        });
        console.log('Final mergeFields:', mergeFields);

        
        const interestsObject = Array.isArray(formValues.interests)
          ? formValues.interests.reduce((acc, interestId) => {
              acc[interestId] = true;
              return acc;
            }, {})
          : formValues.interests;
        
        // Send data to backend for Mailchimp integration
        const response = await axios.post(
          `http://localhost:4000/api/v1/integrate/mailchimp_add_subscriber`,
          {
            email: email, // Pass the actual email here
            listId: formValues.audience,
            interests: interestsObject,
            mergeFields, // Pass dynamic mergeFields here
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        console.log('Mailchimp response:', response);
        
        if (response.status === 200) {
          updateNodeById(id, { params: { ...formValues, fieldValues } });
          handleClose();
        }
      } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        alert('Error: ' + error.message); // Display error message to user
      }
    };
    
    
    
    
    
    const onAuthChange = (selectedAuth) => {
      setSelectedAuth(selectedAuth);
    };


    const handleAddAccountClick = () => {
      window.location.href = `http://127.0.0.1:4000/api/v1/integrate/mailchimp_login`; 
    };

    return (
      <SidebarFormContainer
        block={config}
        onClose={handleClose}
        onFormSave={onSave}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onReset={() => {}}
      >
        <Flex gap={2} alignItems='center'>
          <Text>MAILCHIMP ACCOUNT</Text>
          <Button
            minH={0}
            minW={0}
            h='26px'
            paddingX={5}
            borderRadius={0}
            onClick={handleAddAccountClick}
            backgroundColor='rgb(215, 55, 107)'
            _hover={{
              backgroundColor: 'rgb(215, 55, 107)',
            }}
          >
            <Text fontSize='12px' textTransform='uppercase' color='white'>
              Add account
            </Text>
          </Button>
        </Flex>

        <DynamicForm onAuthChange={onAuthChange} selectedAuth={selectedAuth} />
        </SidebarFormContainer>
    );
  }

  export default MailchimpNodeContent;
  function DynamicForm({ onAuthChange, selectedAuth }) {
    const { values, resetForm } = useFormikContext();
    const [accountName, setAccountName] = useState([]);
    const [accountAuth, setAccountAuth] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const optionsObject = audCatInt?.[selectedAuth];
    const [options, setOptions] = useState({});
    const _onAuthChange = (value) => {
      onAuthChange(value);
      resetForm();
    };


    const mailChimpgetDetails = async () => {
      setLoading(true);
      setError(null);
    
      try {
        // Make the API request to the backend
        const response = await axios.get(
          'http://127.0.0.1:4000/api/v1/integrate/mailchimp_getdetails',
          {
            withCredentials: true,
          }
        );
    
        // Check if we have the required account details in the response
        if (response.data && response.data.account_details) {
          const newAccountOption = {
            label: `${response.data.account_details.email} - ${response.data.account_details.account_name}`,
            value: response.data.account_details.account_id,
          };
          setAccountAuth([newAccountOption]); // Update accountAuth with the email and account name
    
          const newAccountNameOption = {
            label: `${response.data.account_details.account_name}`,
            value: response.data.lists[0]?.id,
          };
          const listId = response.data.lists[0]?.id;
          setAccountName([newAccountNameOption]); // Update accountName with only account name

          const categoriesResponse = await axios.get(
            `http://127.0.0.1:4000/api/v1/integrate/mailchimp_get_groups/${response.data.lists[0]?.id}`,
            { withCredentials: true }
          );
    
          if (categoriesResponse.data) {
            setCategories(categoriesResponse.data.interestCategories); // Set categories
          } else {
            setCategories([]);
          }
        } else {
          setError('Account name not found in the response');
          console.error('Unexpected response data:', response.data);
        }
      } catch (err) {
        setError('Error fetching account details');
        console.error('Error fetching Mailchimp account details:', err);
        if (err.response) {
          console.error('Error Response:', err.response.data);
        } else {
          console.error('Error Message:', err.message);
        }
      } finally {
        setLoading(false); // Hide loading indicator after request
      }
    };
    
    const handleCategoryChange = async (selectedCategory) => {
      if (selectedCategory) {
        setLoading(true);
        setError(null);
    
        try {
          const listId = values?.audience; // Dynamically use listId from account options
          console.log('listId', listId);
          const categoryId = values?.category;
          console.log('categoryId', categoryId);
    
          // Fetch groups based on listId and categoryId
          const groupsResponse = await axios.get(
            `http://127.0.0.1:4000/api/v1/integrate/mailchimp_get_groups_for_category/${listId}/${categoryId}`,
            { withCredentials: true }
          );
    
          // Update options with groups data
          if (groupsResponse.data && groupsResponse.data.groups) {
            setOptions(prevState => ({
              ...prevState,
              interests: {
                ...prevState.interests,
                [categoryId]: groupsResponse.data.groups
              }
            }));
          } else {
            setOptions(prevState => ({
              ...prevState,
              interests: {
                ...prevState.interests,
                [categoryId]: []
              }
            }));
          }
          console.log('options', options);
        } catch (err) {
          setError('Error fetching groups');
          console.error('Error fetching groups for category:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    
  
    useEffect(() => {
        mailChimpgetDetails();
    }, []);
  
    const safeOptions = Array.isArray(accountAuth) ? accountAuth : [];
    const safeAccountOptions = Array.isArray(accountName) ? accountName : [];
    const safeCategories = Array.isArray(categories) ? categories : [];
    const safeInterests = Array.isArray(options?.interests?.[values?.category]) ? options.interests[values.category] : [];
    return (
      <>
        <FormDropdown
          name='auth'
          variant='custom'
          options={safeOptions}  // Populate with authOptions (the list of accounts)     
          placeholder='Select/Connect account'
          onChange={_onAuthChange}
        />
        {selectedAuth && (
          <>
            <FormDropdown
              name='audience'
              variant='custom'
              options={safeAccountOptions}  // This will show account name in the dropdown
              placeholder='Select the audience'
            />
            {values?.audience && (
              <>
                <FormDropdown
                  name='category'
                  variant='custom'
                  options={safeCategories.map(category => ({
                    label: category.title,
                    value: category.id,
                  }))}                   
                  placeholder='Select the category'
                  onChange={(e) => handleCategoryChange(e)

                  }                />
                {values?.category && (
                  <FormCheckboxGroup
                    label=''
                    name='interests'
                     options={safeInterests.map(group => ({
                        label: group.name,
                        value: group.id,
                      }))}  
                    labelVariant='h3'
                  />
                )}
                <Divider />
                <FormVariableSelectorDropdown name='email' label='Subscriber email' />
                <FieldValuesFieldArray name='fieldValues' dropdownOptions={dropdownOptions} />
              </>
            )}
          </>
        )}
      </>
    );
  }