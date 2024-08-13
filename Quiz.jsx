import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Confetti from 'react-confetti';

const originalQuestions = [
  { question: "What does a red traffic light indicate?", options: ["Stop", "Yield", "Go if the way is clear", "Slow down"], correct: 0 },
  { question: "What is the legal blood alcohol concentration (BAC) limit for drivers over 21 in most states in the U.S.?", options: ["0.05%", "0.08%", "0.10%", "0.12%"], correct: 1 },
  { question: "What should you do when you approach a school bus with flashing red lights?", options: ["Pass the bus quickly", "Slow down and proceed with caution", "Stop regardless of the direction you're coming from", "Honk to alert the children"], correct: 2 },
  { question: "When driving in foggy conditions, what lights should you use?", options: ["High beams", "Low beams", "Parking lights", "Hazard lights"], correct: 1 },
  { question: "What is the main purpose of the 'three-second rule'?", options: ["To determine the speed limit", "To keep a safe following distance", "To judge the stopping distance", "To time traffic signals"], correct: 1 },
  { question: "Which of the following actions is prohibited in most states while driving?", options: ["Listening to music", "Using a hands-free phone", "Texting", "Drinking water"], correct: 2 },
  { question: "What does a flashing yellow traffic signal mean?", options: ["Stop and proceed with caution", "Proceed with caution", "Stop if necessary", "Pedestrian crossing ahead"], correct: 1 },
  { question: "When parallel parking, how far should your car be from the curb?", options: ["6 to 12 inches", "12 to 18 inches", "18 to 24 inches", "24 to 30 inches"], correct: 0 },
  { question: "What is the primary use of a car's horn?", options: ["To alert other drivers of your presence", "To show frustration", "To signal pedestrians to move", "To indicate a change in direction"], correct: 0 },
  { question: "If you see a 'yield' sign while driving, what should you do?", options: ["Stop completely", "Proceed without stopping", "Slow down and be prepared to stop if necessary", "Accelerate to merge quickly"], correct: 2 }
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    setQuestions(shuffleArray([...originalQuestions]));
    setAnswers(Array(10).fill(null));
  }, []);

  const handleChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const calculatedScore = answers.reduce((score, answer, index) => 
      answer === questions[index].correct ? score + 1 : score, 0);
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const handleNameChange = (e) => setName(e.target.value);

  const handleDownloadCertificate = async () => {
    try {
      const input = document.getElementById('certificate');
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("certificate.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleReattempt = () => {
    setQuestions(shuffleArray([...originalQuestions]));
    setAnswers(Array(10).fill(null));
    setSubmitted(false);
    setScore(0);
    setName('');
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <AnimatePresence>
        {!submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Driving Quiz</h1>
            {questions.map((q, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                <p className="text-lg font-medium text-gray-900 dark:text-white">{q.question}</p>
                {q.options.map((option, i) => (
                  <label key={i} className="block mt-2 text-gray-900 dark:text-white">
                    <input 
                      type="radio" 
                      name={`question-${index}`} 
                      value={i} 
                      onChange={() => handleChange(index, i)} 
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </motion.div>
            ))}
            <button 
              onClick={handleSubmit} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
              Submit
            </button>
          </motion.div>
        )}
        {submitted && score === 10 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center"
          >
            <Confetti />
            <p className="text-2xl font-bold text-green-500">Congratulations! You scored {score}/10</p>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name} 
              onChange={handleNameChange} 
              className="mt-4 p-2 border rounded w-full text-gray-900 dark:text-gray-800"
            />
            <button 
              onClick={handleDownloadCertificate} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
              Download Certificate
            </button>
            <div id="certificate" className="relative mt-4">
              <img src="/IMAGES/Certificate2.jpg" alt="Certificate" className="w-full" />
              <div className="absolute top-48 right-80 text-2xl font-bold text-gray-900 dark:text-black">{name}</div>
            </div>
          </motion.div>
        )}
        {submitted && score !== 10 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-2xl font-bold text-red-500">You scored {score}/10. Try again to score a perfect 10 to download the certificate.</p>
            <button 
              onClick={handleReattempt} 
              className="mt-4 px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600">
              Reattempt
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
