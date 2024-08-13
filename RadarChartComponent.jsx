// RadarChartComponent.js
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const RadarChartComponent = ({ data, dataKey, categoryKey, title, theme }) => {
  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={chartVariants} className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-xl font-semibold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke={theme === 'dark' ? '#444' : '#ccc'} />
          <PolarAngleAxis dataKey={categoryKey} stroke={theme === 'dark' ? '#fff' : '#000'} />
          <PolarRadiusAxis stroke={theme === 'dark' ? '#fff' : '#000'} />
          <Radar name="Schedules" dataKey={dataKey} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default RadarChartComponent;
