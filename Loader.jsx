import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <CirclesWithBar
        height="150"
        width="150"
        color="#4fa94d"
        outerCircleColor="#0000FF"
        innerCircleColor="#FF0000"
        barColor="#00FF00"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
