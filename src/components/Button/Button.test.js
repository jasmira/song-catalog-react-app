import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expect } from '@jest/globals'; // Import expect from Jest
import CustomButton from './Button';
import '@testing-library/jest-dom';

describe('CustomButton component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<CustomButton>Click me</CustomButton>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('renders with primary color by default', () => {
    const { getByText } = render(<CustomButton>Click me</CustomButton>);
    const button = getByText('Click me');
    expect(button).toHaveClass('btn-primary');
  });

  it('passes additional props to the CustomButton component', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <CustomButton onClick={onClick}>Click me</CustomButton>
    );
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
