import React from 'react';
import { render, fireEvent } from '@testing-library/react'; // Import fireEvent
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

describe('Home component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(getByText('Welcome to Your Music Catalog')).toBeInTheDocument();
    expect(getByText('Explore a world of music discovery')).toBeInTheDocument();
    expect(getByText('Show My Catalog')).toBeInTheDocument();
  });

  it('displays the background image correctly', () => {
    const { getByTestId } = render(
      <Router>
        <Home />
      </Router>
    );

    const homeContainer = getByTestId('home-container');
    const backgroundImage = homeContainer.style.backgroundImage;

    // Check if the backgroundImage style contains the expected value
    expect(backgroundImage).toContain('medium-shot-woman-futuristic-portrait.jpg');
  });

  it('navigates to the catalog page when the link is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const catalogLink = getByText('Show My Catalog');
    fireEvent.click(catalogLink);

    // Assert that the href attribute of the link is '/catalog'
    expect(catalogLink.getAttribute('href')).toBe('/catalog');
  });
});
