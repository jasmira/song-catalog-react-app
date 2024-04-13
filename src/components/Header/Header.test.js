import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './Header';

// Mock the NavLink component to prevent actual navigation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

describe('Header component', () => {
  it('renders without crashing', () => {
    render(<Header renderHeader={true} />);
  });

  it('toggles menu when the menu button is clicked', () => {
    const { getByRole, getByText } = render(<Header renderHeader={true} />);
    
    // Initially, menu should be expanded
    expect(getByText('Show Catalog')).toBeVisible();
    expect(getByText('Add New Song')).toBeVisible();

    // Set viewport width to simulate small screen
    window.innerWidth = 600;

    // Click on the menu button
    fireEvent.click(getByRole('button', { name: 'Toggle navigation' }));

    // After clicking, menu should be collapsed
    expect(getByText('Show Catalog')).toBeVisible();
    expect(getByText('Add New Song')).toBeVisible();

    // Click on the menu button again to open the menu
    fireEvent.click(getByRole('button', { name: 'Toggle navigation' }));

    // After clicking again, menu should be expanded
    expect(getByText('Show Catalog')).toBeVisible();
    expect(getByText('Add New Song')).toBeVisible();
  });

  it('navigates to home page when the logo is clicked', () => {
    const { container } = render(<Header renderHeader={true} />);
    
    // Click on the logo
    fireEvent.click(container.querySelector('.navbar-brand'));
  });
});
