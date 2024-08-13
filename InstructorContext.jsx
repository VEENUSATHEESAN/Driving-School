import React, { createContext, useState, useEffect } from 'react';

export const InstructorContext = createContext();

export const InstructorProvider = ({ children }) => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/instructors');
        const data = await response.json();
        setInstructors(data);
      } catch (error) {
        console.error('Failed to fetch instructors', error);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <InstructorContext.Provider value={{ instructors, setInstructors }}>
      {children}
    </InstructorContext.Provider>
  );
};
