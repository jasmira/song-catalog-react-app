import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SongService from '../../services/SongService';
import SongForm from './SongForm';

jest.mock('../../services/SongService');

const RouterWrapper = ({ children }) => (
    <MemoryRouter initialEntries={['/songForm']}>
      <Routes>
        <Route path="/songForm" element={children} />
        <Route path="/catalog" element={<div>Catalog Page</div>} />
      </Routes>
    </MemoryRouter>
);

describe('SongForm component', () => {
  it('submits the form and adds a song successfully', async () => {
    // Render the component with a mocked route
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <SongForm />
      </MemoryRouter>
    );

    // Fill out the form
    fireEvent.change(getByLabelText('Song Name'), { target: { value: 'Song 1' } });
    fireEvent.change(getByLabelText('Artist'), { target: { value: 'Artist 1' } });
    fireEvent.change(getByLabelText('Album'), { target: { value: 'Album 1' } });
    fireEvent.change(getByLabelText('Release Year'), { target: { value: '2022' } });
    fireEvent.change(getByLabelText('Song Length'), { target: { value: '4:30' } });
    fireEvent.change(getByLabelText('Genre'), { target: { value: 'Rock' } });

    // Submit the form
    fireEvent.click(getByText('Add Song'));

    // Wait for the success message
    await waitFor(() => {
      expect(getByText('Song added successfully')).toBeInTheDocument();
    });

    // Ensure that the service function was called with the correct data
    expect(SongService.addSong).toHaveBeenCalledWith({
      name: 'Song 1',
      artist: 'Artist 1',
      album: 'Album 1',
      releaseYear: '2022',
      length: '4:30',
      genre: 'Rock',
    });
  });

  it('navigates to catalog page when back button is clicked', async () => {
    // Mock the service response
    SongService.addSong.mockResolvedValueOnce();

    // Render the component with a mocked route
    const { getByText, container } = render(
      <MemoryRouter initialEntries={['/songForm']}>
        <Routes>
          <Route path="/songForm" element={<SongForm />} />
          <Route path="/catalog" element={<div>Catalog Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Click the back button
    fireEvent.click(getByText('Back to Catalog'));

    // Assert that the navigation occurs to the catalog page
    await waitFor(() => {
      expect(container.querySelector('div').textContent).toEqual('Catalog Page');
    });
  });
});
