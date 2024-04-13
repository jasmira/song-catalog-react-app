import React from 'react';
import { Button } from 'reactstrap';

const CustomButton = ({ children, ...props }) => {
  return (
    <Button color="primary" {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
