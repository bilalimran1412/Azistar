(function() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'chatbot-container';
        document.body.appendChild(chatbotContainer);
  
        const chatbotFrame = document.createElement('iframe');
        chatbotFrame.src = 'http://localhost:3000/livebot'; // URL to your chatbot page
        chatbotFrame.style.position = 'fixed';
        chatbotFrame.style.bottom = '0';
        chatbotFrame.style.right = '0';
        chatbotFrame.style.width = '400px';
        chatbotFrame.style.height = '600px';
        chatbotFrame.style.border = 'none';
        chatbotFrame.style.zIndex = '9999'; // Ensure it is above other content
        document.getElementById('chatbot-container').appendChild(chatbotFrame);
      });
    }
  })();
  