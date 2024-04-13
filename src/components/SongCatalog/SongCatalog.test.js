import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import SongCatalog from './SongCatalog';
import SongFilter from '../SongFilter/SongFilter';
import * as SongService from '../../services/SongService'; 

// Mocking the SongService
/* jest.mock('../../services/SongService', () => ({
    getAllSongs: jest.fn().mockResolvedValue([]), // Mocking to return an empty array initially
})); */
jest.mock('../../services/SongService', () => ({
    getAllSongs: jest.fn(),
}));

// Mocking the SongFilter component
jest.mock('../SongFilter/SongFilter');

describe('SongCatalog component', () => {
    it('renders without crashing', async () =>  {
        await act(async () => {
            render(<BrowserRouter><SongCatalog /></BrowserRouter>); // Wrap SongCatalog with BrowserRouter
        });
    });

    it('renders filter button', () => {
        // Suppressing warnings shown for "act" during the test execution for this specific test case
        jest.spyOn(console, 'error').mockImplementation(() => {});

        act(() => {
          render(<SongCatalog />);
        });
      
        const filterButton = screen.getByText('Filter Songs');
        expect(filterButton).toBeInTheDocument();
    });

    it('renders songs correctly', async () => {
        // Mock data for 5 songs
        const mockSongs = Array.from({ length: 5 }, (_, index) => ({
          id: index + 1,
          name: `Song ${index + 1}`,
          artist: `Artist ${index + 1}`,
          album: `Album ${index + 1}`,
          releaseYear: 2000 + index,
          length: `${index + 1}:00`,
          genre: 'Pop',
        }));
      
        // Mocking the SongService to return mock songs
        require('../../services/SongService').getAllSongs.mockResolvedValue(mockSongs);
      
        let getByText;
        await act(async () => {
          // Render the SongCatalog component within BrowserRouter
          ({ getByText } = render(<BrowserRouter><SongCatalog /></BrowserRouter>));
        });
      
        // Wait for the loading state to resolve
        await waitFor(() => {
          // Ensure that the song names are rendered correctly
          mockSongs.forEach(song => {
            expect(getByText(song.name)).toBeInTheDocument();
          });
        });
    });

    it('paginates songs correctly', async () => {
        // Mock data for 12 songs
        const mockSongs = Array.from({ length: 12 }, (_, index) => ({
          id: index + 1,
          name: `Song ${index + 1}`,
          artist: `Artist ${index + 1}`,
          album: `Album ${index + 1}`,
          releaseYear: 2000 + index,
          length: `${index + 1}:00`,
          genre: 'Pop',
        }));
      
        // Mocking the SongService to return mock songs
        require('../../services/SongService').getAllSongs.mockResolvedValue(mockSongs);
      
        let getByText, getByLabelText;
        await act(async () => {
          // Render the SongCatalog component within BrowserRouter
          ({ getByText, getByLabelText } = render(<BrowserRouter><SongCatalog /></BrowserRouter>));
        });
      
        // Wait for the loading state to resolve
        await waitFor(() => {
          // Ensure that the pagination bar is rendered
          const pagination = getByLabelText('pagination');
          expect(pagination).toBeInTheDocument();
      
          // Ensure that two navigation page numbers are shown
          const pageButtons = pagination.querySelectorAll('button[aria-label="Page number"]');
          expect(pageButtons.length).toBe(2);
      
          // Ensure that the first 10 songs are shown on the first page
          mockSongs.slice(0, 10).forEach(song => {
            expect(getByText(song.name)).toBeInTheDocument();
          });
      
          // Click on the next page button
          fireEvent.click(pageButtons[1]);
        });
      
        // Wait for the loading state to resolve
        await waitFor(() => {
          // Ensure that the songs "Song 11" and "Song 12" are shown on the second page
          mockSongs.slice(10, 12).forEach(song => {
            expect(getByText(song.name)).toBeInTheDocument();
          });
        });
    });  
    
    it('updates records per page correctly', async () => {
        // Mock data for 30 songs
        const mockSongs = Array.from({ length: 30 }, (_, index) => ({
            id: index + 1,
            name: `Song ${index + 1}`,
            artist: `Artist ${index + 1}`,
            album: `Album ${index + 1}`,
            releaseYear: 2000 + index,
            length: `${index + 1}:00`,
            genre: 'Pop',
        }));
    
        // Mocking the SongService to return mock songs
        require('../../services/SongService').getAllSongs.mockResolvedValue(mockSongs);
    
        let getByText, getByLabelText, getAllByTestId;
        await act(async () => {
            // Render the SongCatalog component within BrowserRouter
            ({ getByText, getByLabelText, getAllByTestId } = render(<BrowserRouter><SongCatalog /></BrowserRouter>));
        });
    
        // Wait for the loading state to resolve
        await waitFor(() => {
            // Ensure that initially only the first 10 songs are shown
            mockSongs.slice(0, 10).forEach(song => {
                expect(getByText(song.name)).toBeInTheDocument();
            });
        });
    
        // Get the select element for selecting records per page
        const selectRecordsPerPage = getByLabelText('Select records');
    
        // Check if the initial value of the select element is 10
        expect(selectRecordsPerPage.value).toBe('10');
    
        // Change the value of the select element to 25
        fireEvent.change(selectRecordsPerPage, { target: { value: '25' } });
    
        // Wait for the component to rerender with the new number of songs
        await waitFor(() => {
            // Ensure that now 25 songs are shown
            mockSongs.slice(0, 25).forEach(song => {
                expect(getByText(song.name)).toBeInTheDocument();
            });
        });
    });
    
    it('renders SongFilter component when Filter Songs button is clicked', async () => {
        // Mock data for 2 songs
        const mockSongs = Array.from({ length: 2 }, (_, index) => ({
            id: index + 1,
            name: `Song ${index + 1}`,
            artist: `Artist ${index + 1}`,
            album: `Album ${index + 1}`,
            releaseYear: 2000 + index,
            length: `${index + 1}:00`,
            genre: 'Pop',
        }));
    
        // Mocking the SongService to return mock songs
        require('../../services/SongService').getAllSongs.mockResolvedValue(mockSongs);
    
        let getByText, getByLabelText, getByRole, queryByTestId;
        await act(async () => {
            // Render the SongCatalog component within BrowserRouter
            ({ getByText, getByLabelText, getByRole, queryByTestId } = render(<BrowserRouter><SongCatalog /></BrowserRouter>));
        });
    
        // Wait for the loading state to resolve
        await waitFor(() => {
            // Ensure that the Filter Songs button is initially shown
            const filterButton = getByText('Filter Songs');
            expect(filterButton).toBeInTheDocument();
        });

        // Check if the SongFilter component is initially not rendered
        expect(SongFilter).not.toHaveBeenCalled();
    
        // Click the Filter Songs button
        fireEvent.click(getByText('Filter Songs'));
    
        // Ensure that the SongFilter component is rendered
        expect(SongFilter).toHaveBeenCalled();
    });
    
    /* it('sorts songs by name in ascending and descending order', async () => {
        // Mock data for 3 songs with different names and release years
        const mockSongs = [
            { id: 1, name: 'Song C', artist: 'Artist 1', album: 'Album 1', releaseYear: 2003, length: '3:00', genre: 'Pop' },
            { id: 2, name: 'Song A', artist: 'Artist 2', album: 'Album 2', releaseYear: 2001, length: '1:00', genre: 'Pop' },
            { id: 3, name: 'Song B', artist: 'Artist 3', album: 'Album 3', releaseYear: 2002, length: '2:00', genre: 'Pop' },
        ];
    
        // Mocking the SongService to return mock songs
        require('../../services/SongService').getAllSongs.mockResolvedValue(mockSongs);
    
        let getByText, getByLabelText;
        await act(async () => {
            // Render the SongCatalog component within BrowserRouter
            ({ getByText, getByLabelText } = render(<BrowserRouter><SongCatalog /></BrowserRouter>));
        });
    
        // Wait for the loading state to resolve
        await waitFor(() => {
            // Ensure that the songs are rendered correctly in the table
            mockSongs.forEach(song => {
                expect(getByText(song.name)).toBeInTheDocument();
                expect(getByText(song.artist)).toBeInTheDocument();
                expect(getByText(song.album)).toBeInTheDocument();
                expect(getByText(String(song.releaseYear))).toBeInTheDocument();
                expect(getByText(song.length)).toBeInTheDocument();
                // Check the genre field specifically
                const genreCells = screen.getAllByText(song.genre);
                expect(genreCells.length).toBe(3); // Ensure that only 3 genre cells are rendered
            });
        });
    
        // Click on the "Song Name" column header to sort in ascending order
        fireEvent.click(screen.getByText('Song Name'));
    
        // Assert that the songs are now rendered in ascending order based on the song name
        expect(getByText('Song A').parentNode).toHaveTextContent('Song A');
        expect(getByText('Song B').parentNode).toHaveTextContent('Song B');
        expect(getByText('Song C').parentNode).toHaveTextContent('Song C');
    
        // Click on the "Song Name" column header again to sort in descending order
        fireEvent.click(screen.getByText('Song Name'));
    
        // Assert that the songs are now rendered in descending order based on the song name
        expect(getByText('Song C').parentNode).toHaveTextContent('Song C');
        expect(getByText('Song B').parentNode).toHaveTextContent('Song B');
        expect(getByText('Song A').parentNode).toHaveTextContent('Song A');
    }); */

    /* it('sorts songs by name in ascending and descending order', async () => {
        const mockSongs = [
            { id: 1, name: 'Song C', artist: 'Artist 1', album: 'Album 1', releaseYear: 2003, length: '3:00', genre: 'Pop' },
            { id: 2, name: 'Song A', artist: 'Artist 2', album: 'Album 2', releaseYear: 2001, length: '1:00', genre: 'Pop' },
            { id: 3, name: 'Song B', artist: 'Artist 3', album: 'Album 3', releaseYear: 2002, length: '2:00', genre: 'Pop' },
        ];
    
        // Mock the getAllSongs function of the SongService
        jest.spyOn(SongService, 'getAllSongs').mockResolvedValue(mockSongs);
    
        // Render the SongCatalog component
        let getByText, getByLabelText;
        await act(async () => {
            // Render the SongCatalog component within BrowserRouter
            ({ getByText, getByLabelText } = render(<BrowserRouter><SongCatalog /></BrowserRouter>));
        });
    
        // Wait for the songs to be rendered
        await screen.findByText('Song A');
    
        // Log each row's details
        const tableRows = screen.getAllByRole('row').slice(1); // Exclude table header row
        tableRows.forEach(row => {
            const columns = row.querySelectorAll('td');
            const rowData = Array.from(columns).map(column => column.textContent.trim());
            console.log('Row Data:', rowData.join(', '));
        });
    
        // Verify that each song is rendered correctly
        mockSongs.forEach(song => {
            expect(screen.getByText(song.name)).toBeInTheDocument();
            expect(screen.getByText(song.artist)).toBeInTheDocument();
            expect(screen.getByText(song.album)).toBeInTheDocument();
            expect(screen.getByText(String(song.releaseYear))).toBeInTheDocument();
            expect(screen.getByText(song.length)).toBeInTheDocument();
        });
    
        // Mock useState to set isLoading and isFetching
        const useStateMock = jest.spyOn(React, 'useState');
        useStateMock.mockReturnValueOnce([false, jest.fn()]); // Mock isLoading
        useStateMock.mockReturnValueOnce([false, jest.fn()]); // Mock isFetching
    
        // Click on the "Song Name" header to trigger sorting
        fireEvent.click(screen.getByText('Song Name'));
        useStateMock.mockReturnValueOnce([false, jest.fn()]); // Mock isLoading
        useStateMock.mockReturnValueOnce([true, jest.fn()]); // Mock isFetching
    
        // Log each row's details after sorting
        const tableRowsAfter = screen.getAllByRole('row').slice(1); // Exclude table header row
        tableRowsAfter.forEach(row => {
            const columns = row.querySelectorAll('td');
            const rowData = Array.from(columns).map(column => column.textContent.trim());
            console.log('Row Data After Click:', rowData.join(', '));
        });
    }); */

});
