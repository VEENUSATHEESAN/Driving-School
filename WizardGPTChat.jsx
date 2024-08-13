import React, { useState } from 'react';
import axios from 'axios';
 // Ensure your Tailwind CSS is imported

const WizardGPTChat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false); // State to manage dark mode

  const handleSendMessage = async () => {
    setError(''); // Clear previous errors
    try {
      const res = await axios.post('http://localhost:5000/api/openai', { message });
      setResponse(res.data.choices[0].message.content);
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleClear = () => {
    setMessage('');
    setResponse('');
    setError('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className={`p-5 font-sans min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl mb-5">WizardGPT Chat</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Type your message here..."
        className={`w-full p-2 mb-5 border rounded resize-none ${darkMode ? 'bg-gray-800 text-black border-gray-700 placeholder-gray-400' : 'bg-white text-black border-gray-300 placeholder-gray-500'}`}
      />
      <div className="mb-5">
        <button onClick={handleSendMessage} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Send</button>
        <button onClick={handleClear} className="mr-2 px-4 py-2 bg-red-500 text-white rounded">Clear</button>
        <button onClick={toggleDarkMode} className="px-4 py-2 bg-gray-500 text-white rounded">Toggle Dark Mode</button>
      </div>
      {response && (
        <div className="mt-5">
          <h2 className="text-xl mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
      {error && (
        <div className="mt-5 text-red-500">
          <h2 className="text-xl mb-2">Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default WizardGPTChat;
