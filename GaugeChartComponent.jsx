import React, { useContext } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { ThemeContext } from './ThemeContext'; // Ensure correct path

const GaugeChartComponent = ({ value, title }) => {
  const { theme } = useContext(ThemeContext);

  const gaugeData = [
    {
      name: title,
      value: value,
      fill: '#8884d8',
    },
  ];

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={chartVariants}
      className={`p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
    >
      <h3 className={`text-xl font-semibold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="90%"
          barSize={20}
          data={gaugeData}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: theme === 'dark' ? '#fff' : '#000' }}
            background
            clockWise
            dataKey="value"
          />
          <Legend
            iconSize={10}
            width={120}
            height={140}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={{
              top: 0,
              left: 350,
              lineHeight: '24px',
              color: theme === 'dark' ? '#fff' : '#000',
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default GaugeChartComponent;
