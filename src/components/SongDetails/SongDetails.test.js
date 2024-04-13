import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SongService from '../../services/SongService';
import SongDetails from './SongDetails';

jest.mock('../../services/SongService');

const RouterWrapper = ({ children }) => (
    <MemoryRouter initialEntries={['/song/1', '/catalog']} initialIndex={0}>
      <Routes>
        <Route path="/song/:id" element={children} />
        <Route path="/catalog" element={<div>Catalog Page</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('SongDetails component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders song details correctly when song is fetched successfully', async () => {
    // Mock song data
    const songData = {
      name: 'Song Name',
      artist: 'Artist Name',
      album: 'Album Name',
      releaseYear: '2022',
      length: '3:30',
      genre: 'Pop',
    };

    // Mock the service response
    SongService.getSongById.mockResolvedValue(songData);

    // Render the component with a mocked route
    const { getByText } = render(
      <RouterWrapper>
        <SongDetails />
      </RouterWrapper>
    );

    // Wait for song details to be displayed
    await waitFor(() => {
      expect(getByText('Song Name')).toBeInTheDocument();
      expect(getByText('Artist Name')).toBeInTheDocument();
      expect(getByText('Album Name')).toBeInTheDocument();
      expect(getByText('2022')).toBeInTheDocument();
      expect(getByText('3:30')).toBeInTheDocument();
      expect(getByText('Pop')).toBeInTheDocument();
    });
  });

  it('navigates to catalog page when back button is clicked', async () => {
    // Define a mock song data
    const songData = {
      id: '1',
      name: 'Song Name',
    };

    // Mock the service response
    SongService.getSongById.mockResolvedValue(songData);

    // Render the component with a mocked route
    const { getByText, container } = render(
      <MemoryRouter initialEntries={['/song/1']}>
        <Routes>
          <Route path="/song/:id" element={<SongDetails />} />
          <Route path="/catalog" element={<div>Catalog Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the song details to be displayed
    await waitFor(() => {
      expect(getByText('Song Name')).toBeInTheDocument();
    });

    // Click the back button
    fireEvent.click(container.querySelector('button'));

    // Assert that the navigation occurs to the catalog page
    await waitFor(() => {
      expect(getByText('Catalog Page')).toBeInTheDocument();
    });
  });
});
