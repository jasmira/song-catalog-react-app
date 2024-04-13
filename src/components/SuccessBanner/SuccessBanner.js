import React from 'react';

const SuccessBanner = ({ message }) => {
  return (
    <div className="alert alert-success" role="alert">
      {message}
    </div>
  );
};

export default SuccessBanner;
