import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SongFilter from './SongFilter';

// Mock SongService
jest.mock('../../services/SongService', () => ({
  filterSongsByReleaseYearAndArtist: jest.fn().mockResolvedValue([])
}));

describe('SongFilter component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <SongFilter setFilteredSongs={() => {}} setFilterMessage={() => {}} />
    );

    expect(getByPlaceholderText('Enter Release Year')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Artist Name')).toBeInTheDocument();
    expect(getByText('Filter')).toBeInTheDocument();
    expect(getByText('Clear')).toBeInTheDocument();
  });

  it('filters songs correctly', async () => {
    const setFilteredSongsMock = jest.fn();
    const setFilterMessageMock = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <SongFilter setFilteredSongs={setFilteredSongsMock} setFilterMessage={setFilterMessageMock} />
    );

    const yearInput = getByPlaceholderText('Enter Release Year');
    const artistInput = getByPlaceholderText('Enter Artist Name');
    const filterButton = getByText('Filter');

    fireEvent.change(yearInput, { target: { value: '2020' } });
    fireEvent.change(artistInput, { target: { value: 'Artist Name' } });
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(setFilteredSongsMock).toHaveBeenCalledWith([]);
      expect(setFilterMessageMock).toBeCalledWith('No songs found for artist: Artist Name and release year: 2020');
    });
  });

  it('clears filters correctly', () => {
    const setFilteredSongsMock = jest.fn();
    const setFilterMessageMock = jest.fn();

    const { getByText } = render(
      <SongFilter setFilteredSongs={setFilteredSongsMock} setFilterMessage={setFilterMessageMock} />
    );

    const clearButton = getByText('Clear');

    fireEvent.click(clearButton);

    expect(setFilteredSongsMock).toHaveBeenCalledWith([]);
    expect(setFilterMessageMock).toHaveBeenCalledWith('');
  });
});
