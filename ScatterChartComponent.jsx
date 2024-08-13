// ScatterChartComponent.js
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ScatterChartComponent = ({ data, xKey, yKey, title, theme }) => {
  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={chartVariants} className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-xl font-semibold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
          <XAxis dataKey={xKey} name="Vehicles" stroke={theme === 'dark' ? '#fff' : '#000'} />
          <YAxis dataKey={yKey} name="Usage" stroke={theme === 'dark' ? '#fff' : '#000'} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }} />
          <Scatter name="Vehicle Usage" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ScatterChartComponent;
