import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    MainLayout,
    Column,
    SideBar,
    ChatSection,
    Message,
    CustomerInfo,
    ActionButton,
} from '../Assigned/StyledContest';
import { FiTrash, FiRotateCw, FiCheckCircle } from 'react-icons/fi';
import CardTops from '../Unassigned/CardTop';
import AllCard from '../Unassigned/AllCard';

function Assigned() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [customerInfo, setCustomerInfo] = useState(null);
    const [checkedCustomers, setCheckedCustomers] = useState([]); // Managing checked customers
    const userId = '66fc0cc56784cdfa429863ee'; 
    // const [userId, setUserId] = useState('');
    const websiteId = 'azistar'; // Dynamic website ID
    const [customersAll, setCustomersAll] = useState([]);


//   useEffect(() => {
//     const getId = localStorage.getItem('userId');
//         setUserId(getId);
//   }, []);


    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/customers/${userId}`);
            const customerData = response.data.customers || [];
            setCustomersAll(customerData);
            // Filter customers with status == 'active'
            const activeCustomers = customerData.filter(customer => customer.status === 'false');

            setCustomers(activeCustomers); // Set only active customers
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    // Fetch messages for the selected customer
    const fetchMessages = async customerId => {
        if (customerId) {
            try {
                const response = await axios.get(
                    `http://localhost:4000/api/v1/message/${userId}/${customerId}`
                );
                setMessages(response.data.messages || []);
            } catch (error) {
                console.error('Error fetching messages', error);
            }
        }
    };

    // Fetch selected customer info
    const fetchCustomerInfo = async customerId => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/v1/customers/${userId}/${customerId}`
            );

            if (response.data.success && response.data.customers.length > 0) {
                setCustomerInfo(response.data.customers[0]); // Correctly set to the first customer
            } else {
                console.error('No customer data found');
                setCustomerInfo(null); // Clear if no data
            }
        } catch (error) {
            console.error('Error fetching customer info', error);
        }
    };


    // Send a message
    const sendMessage = async () => {
        if (!input.trim()) return;
        try {
            const response = await axios.post(
                `http://localhost:4000/api/v1/message/chat`,
                {
                    message: input,
                    userId,
                    sender: 'user',
                    websiteId,
                    customerId: selectedCustomer, // Include customerId when sending message
                }
            );

            // Add the new message to the messages array
            if (response.data) {
                setMessages(prevMessages => [...prevMessages, response.data]);
            }
            setInput(''); // Clear the input field after sending the message
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    // Function to open the Chatbot in a new popup window
    const openChatbotPopup = () => {
        const popup = window.open('', 'Chatbot', 'width=600,height=600'); // Set your desired width and height
        if (popup) {
            popup.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Chatbot</title>
          <link rel="stylesheet" href="http://localhost:3000/assets/ChatBot-o5e-1Ygz.css"> <!-- Include your CSS file -->
        </head>
        <body>
          <div id="chatbot-root"></div>
          <script src="http://localhost:3000/widget.js"></script>
          <script>
            const userId = '66e673aeac3e4461b37b5ff1';
            const websiteId = 'azistar';
            ReactDOM.render(React.createElement(Chatbot, { userId, websiteId }), document.getElementById('chatbot-root'));
          </script>
        </body>
        </html>
      `);
            popup.document.close(); // Close the document to render
        }
    };


    const customerStatus = async (customerId, status) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/api/v1/customers/${customerId}`,
                { status }
            );

            if (response.data.success) {
                alert(`Message status updated to "${status}".`);
                fetchMessages(customerId);
                window.location.reload('/assigned')
            } else {
                alert('Failed to update message status.');
            }
        } catch (error) {
            console.error('Error updating message status:', error);
        }
    };


    const updateMessageStatus = async (customerId, status) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/api/v1/customers/${customerId}`,
                { status }
            );

            if (response.data.success) {
                alert(`Message status updated to "${status}".`);
                window.location.href = '/assigned';
                fetchMessages(customerId);
                fetchCustomers();
            } else {
                alert('Failed to update message status.');
            }
        } catch (error) {
            console.error('Error updating message status:', error);
        }
    };

    // Handle conversation actions
    const handleAction = async action => {
        try {
            if (action === 'solve' && selectedCustomer) {
                await updateMessageStatus(selectedCustomer, 'active'); // Update status to "solved"
            } else {
                await axios.post(`http://localhost:4000/api/v1/conversation/action`, {
                    action,
                    customerId: selectedCustomer,
                });
                alert(`Action "${action}" was successful.`);
            }
        } catch (error) {
            console.error(`Error performing action ${action}:`, error);
        }
    };

    // Delete Customer
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this customer permanently?");
        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:4000/api/v1/customers/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove deleted customer from the customer list
                    setCustomers(prevCustomers => prevCustomers.filter(customer => customer._id !== id));

                    // Clear messages and selected customer if the deleted customer was selected
                    if (selectedCustomer === id) {
                        setMessages([]);
                        setSelectedCustomer(null);
                        setCustomerInfo(null);
                    }

                    alert('Customer deleted successfully.');
                } else {
                    throw new Error(`Failed to delete customer with ID ${id}`);
                }
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        } else {
            console.log('Deletion cancelled by user.');
        }
    };

    // Handle checkbox check/uncheck
    const handleCheckboxChange = customerId => {
        const updatedCheckedCustomers = checkedCustomers.includes(customerId)
            ? checkedCustomers.filter(id => id !== customerId) // Uncheck
            : [...checkedCustomers, customerId]; // Check

        setCheckedCustomers(updatedCheckedCustomers);

        // If only one customer is checked, set as selected customer for chat
        if (updatedCheckedCustomers.length === 1) {
            setSelectedCustomer(updatedCheckedCustomers[0]);
            fetchMessages(updatedCheckedCustomers[0]);
            fetchCustomerInfo(updatedCheckedCustomers[0]);
        } else {
            setSelectedCustomer(null);
        }
    };

    // Handle customer row click (open chat)
    const handleCustomerClick = customerId => {
        setSelectedCustomer(customerId);
        fetchMessages(customerId);
        fetchCustomerInfo(customerId);
        console.log(customerId);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const customerList = (
        <ul className="customer-list">
            {customers.map((customer, index) => (
                <li
                    key={customer._id}
                    className={checkedCustomers.includes(customer._id) ? 'active' : ''}
                    onClick={() => handleCustomerClick(customer._id)} // Handle chat open on row click
                >
                    <input
                        type="checkbox"
                        checked={checkedCustomers.includes(customer._id)}
                        onChange={e => {
                            e.stopPropagation();
                            handleCheckboxChange(customer._id);
                        }}
                    />
                    <div className="customer-info">
                        {customer.email}
                        {/* {customer._id} */}
                        <p>{customer.lastMessage}</p>
                    </div>
                </li>
            ))}
        </ul>
    );

    return (
        <MainLayout>
            {/* Left Sidebar */}
            <SideBar>
                {checkedCustomers.length === 0 ? (
                    <h3>✅ Solved</h3>
                ) : (
                    <div className="actions">
                        <button onClick={() => handleAction('markUnread')}>🔄</button>
                        <button onClick={() => handleDelete(selectedCustomer)}>🗑️</button>
                        <button onClick={() => handleAction('reassign')}>🔁</button>
                        <button onClick={() => handleAction('solve')}>✔️</button>
                    </div>
                )}
                {customers.length > 0 ? customerList : <p></p>}
                <p>You have no solved conversations at the moment.</p>
            </SideBar>

            {/* Chat Section */}
            <Column>
                {selectedCustomer ? (
                    <ChatSection>
                        <h2>Messages</h2>
                        <div className="messages-list">
                            {messages.length > 0 ? (
                                messages.map((msg, index) => (
                                    <Message key={index} sender={msg.sender}>
                                        <div className="message-content">
                                            {msg.sender === 'user' ? (
                                                <>
                                                    <span>You</span>
                                                    <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="customer-icon">👤</div>
                                                    <span>{msg.customerId}</span>
                                                    <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                                </>
                                            )}
                                            <div className='chat_both'>{msg.message}</div>
                                        </div>
                                    </Message>
                                ))
                            ) : (
                                <p>No messages yet for this customer.</p>
                            )}
                        </div>


                        {/* Input section */}
                        {customers.length === 0 ? (

                            <div className="input-section">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                />
                                <button onClick={sendMessage}>Send</button>
                            </div>
                        ) : (
                            <CardTops
                                CardTopHeading=''
                                CardTopDescription='This conversation is marked as solved. Click the button or press ⏎ Enter to start a new conversation with the same visitor.'
                                CarTopButton='Start new conversation'
                                onClick={() => customerStatus(selectedCustomer, 'active')}
                                CardTopBelow=''
                            />
                        )}


                    </ChatSection>
                ) : (
                    <div>
                        {customersAll.length === 0 ? (
                            <CardTops
                                CardTopHeading='No active conversations'
                                CardTopDescription='Before starting a real conversation with your visitors, simulate one to see how things work!'
                                CarTopButton='Simulate a conversation'
                                onClick={openChatbotPopup}
                                CardTopBelow='You can also integrate Tidio with other apps to keep everything in one place!'
                            />
                        ) : (
                            <CardTops
                                CardTopHeading='No active conversations'
                                CardTopDescription='Before starting a real conversation with your visitors, simulate one to see how things work!'
                                CarTopButton='My Open'
                                href='/assigned'
                                CardTopBelow='You can also integrate Tidio with other apps to keep everything in one place!'
                            />
                        )}
                        <AllCard />
                    </div>
                )}
            </Column>

            {/* Right Sidebar (Customer Info) */}

            {customers.length > 0 && selectedCustomer && customerInfo && (
                <CustomerInfo>
                    <h3>Customer Info</h3>
                    <p>
                        <strong>Email:</strong> {customerInfo.email}
                    </p>
                    <p>
                        <strong>Location:</strong> {customerInfo.location}
                    </p>
                    <p>
                        <strong>Phone:</strong> {customerInfo.phone}
                    </p>
                </CustomerInfo>
            )}


        </MainLayout>
    );
}

export default Assigned;
