import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const QuestionPrompt = ({ theme }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/ask-question', { question });
      setResponse(res.data.answer);
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleClear = () => {
    setQuestion('');
    setResponse('');
    setError('');
  };

  return (
    <div className={`p-5 font-sans min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl mb-5">Ask a Question</h1>
      <motion.textarea
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Type your question here..."
        className={`w-full p-2 mb-5 border rounded resize-none ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : 'bg-white text-black border-gray-300 placeholder-gray-500'}`}
      />
      <div className="mb-5">
        <motion.button
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleSubmit}
          className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Submit
        </motion.button>
        <motion.button
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleClear}
          className="mr-2 px-4 py-2 bg-blue-500 text-black rounded"
        >
          Clear
        </motion.button>
      </div>
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5"
          >
            <h2 className="text-xl mb-2">Response:</h2>
            <p>{response}</p>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5 text-red-500"
          >
            <h2 className="text-xl mb-2">Error:</h2>
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionPrompt;
