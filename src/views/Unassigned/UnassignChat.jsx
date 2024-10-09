import React, { useState, useEffect } from 'react';
import { ButtonM, Column, MainLayout, SideBar } from './StylingConst';
import './style.css';
import CardTops from './CardTop';
import AllCard from './AllCard';
import SideBars from './SideBar';
import axios from 'axios'; // Ensure axios is imported
import AjentSignup from './AjentSignup';
// Component
const UnassignChat = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch customers data
  const userId = '66e673aeac3e4461b37b5ff1'; // Dynamic user ID
  const websiteId = 'azistar'; 

  const fetchCustomers = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/customers/${userId}`);
        const customerData = response.data.customers || [];

        // Filter customers with status == 'active'
        const activeCustomers = customerData.filter(customer => customer.status === 'active');

        setCustomers(activeCustomers);
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
};

useEffect(() => {
  fetchCustomers();

  const intervalId = setInterval(fetchCustomers, 3000); 

  return () => clearInterval(intervalId); 
}, []);

  // Function to open the Chatbot in a new popup window
  const openChatbotPopup = () => {
    const popup = window.open('', 'Chatbot', 'width=400,height=600'); // Set your desired width and height
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
          <script src="http://localhost:3000/widget.js"></script> <!-- Load your JavaScript -->
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

  const AddAgents = () => {
      setModalOpen(true);
  }

  return (
    <MainLayout>

      <SideBars 
        SideBarHeading='👋   Unassigned'
        SideBarHeadingPargraph='You have no unassigned conversations at the moment.'
      />
      <AjentSignup
          isOpen={isModalOpen} 
          onClose={() => setModalOpen(false)} 
      />
      <Column>
        {/* Display different CardTops based on customers.length */}
        {customers.length === 0 ? (
          <div>
            <div className='user_agent'>
              <ButtonM onClick={AddAgents}>Create a Agent</ButtonM>
            </div>
            <CardTops
              CardTopHeading='No active conversations'
              CardTopDescription='Before starting a real conversation with your visitors, simulate one to see how things work!'
              CarTopButton='Simulate a conversation'
              onClick={openChatbotPopup}
              CardTopBelow='You can also integrate Tidio with other apps to keep everything in one place!'
            />
            
          </div>
        ) : (
          <CardTops
            CardTopHeading='No active conversations'
            CardTopDescription='Before starting a real conversation with your visitors, simulate one to see how things work!'
            CarTopButton='My Open'
            href='/assigned'
            CardTopBelow='You can also integrate Tidio with other apps to keep everything in one place!'
          />
        )}
        
        {/* Second Card */}
        <AllCard/>

      </Column>
      
    </MainLayout>
  );
};

export default UnassignChat;
