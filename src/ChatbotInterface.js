import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          history: chatHistory // Pass the history to maintain context
        })
      });

      const data = await res.json();
      if (data.response) {
        // Append both the user message and bot response to history
        setChatHistory(prevHistory => [...prevHistory, [message, data.response]]);
      } else if (data.error) {
        setChatHistory(prevHistory => [...prevHistory, ['Error', data.error]]);
      }
    } catch (error) {
      setChatHistory(prevHistory => [...prevHistory, ['Error', 'Error connecting to the API.']]);
    }

    setMessage(''); // Clear the input field after sending the message
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <div>
        {chatHistory.map(([userMsg, botResponse], index) => (
          <div key={index}>
            <p><strong>You:</strong> {userMsg}</p>
            <p><strong>Bot:</strong> {botResponse}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
