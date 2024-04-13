import React, { useState, useEffect } from 'react';
import SongService from '../../services/SongService';
import SongFilter from '../SongFilter/SongFilter';
import { Link } from 'react-router-dom';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import './SongCatalog.css'; // Import CSS file for styling

const SongCatalog = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage, setSongsPerPage] = useState(10); // State for songs per page
    const [filterMessage, setFilterMessage] = useState('');
    const [sortBy, setSortBy] = useState({ key: '', order: '' });
    const [recordsPerPageOptions] = useState([10, 25, 50, 100]); // Options for records per page

    useEffect(() => {
        const fetchSongs = async () => {
          try {
                setIsLoading(true);
                const songsData = await SongService.getAllSongs(sortBy);
                setSongs(songsData || []);
                setIsFetching(false);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching songs:', error);
                setIsFetching(false);
                setIsLoading(false);
            }
        };
  
        fetchSongs(); // Call fetchSongs directly inside the useEffect
    }, [currentPage, sortBy]); // Include fetchSongs in the dependency array

    const handleFilterSongs = async (filteredData, message) => {
        setFilteredSongs(filteredData);
        setCurrentPage(1);
        setFilterMessage(message);
    };

    const paginate = (items, page, perPage) => {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return items.slice(start, end);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRecordsPerPageChange = (e) => {
        setSongsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to the first page when changing records per page
    };

    const handleSort = (key) => {
      if (key === 'name') {
        setSortBy({ key: 'name', order: sortBy.key === 'name' ? (sortBy.order === 'asc' ? 'desc' : 'asc') : 'asc' });
      } else if (key === 'releaseYear') {
        setSortBy({ key: 'releaseYear', order: sortBy.key === 'releaseYear' ? (sortBy.order === 'asc' ? 'desc' : 'asc') : 'asc' });
      }
    }; 

    const renderSongs = () => {
      const data = filteredSongs.length > 0 ? filteredSongs : songs;

      // Sorting logic
      const sortedSongs = data.sort((a, b) => {
        const aValue = sortBy.key === 'releaseYear' ? parseInt(a[sortBy.key]) : a[sortBy.key];
        const bValue = sortBy.key === 'releaseYear' ? parseInt(b[sortBy.key]) : b[sortBy.key];

        // Compare values based on the order (ascending or descending)
        if (sortBy.order === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
      const paginatedSongs = paginate(sortedSongs, currentPage, songsPerPage);
  
      return paginatedSongs.map(song => (
          <tr key={song.id}>
              <td>{song.name}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.releaseYear}</td>
              <td>{song.length}</td>
              <td>{song.genre}</td>
              <td>
                  <Link to={`/song/${song.id}`} className="btn bg-btn-custom">Show Details</Link>
              </td>
          </tr>
      ));
    };  

    const calculateTotalPages = () => {
      return Math.ceil((filteredSongs.length > 0 ? filteredSongs.length : songs.length) / songsPerPage);
    };

    const renderPagination = (totalPages) => {
      const pageNumbers = [];

      // Add first page
      pageNumbers.push(1);

      // Add ellipsis if needed
      if (currentPage > 4) {
          pageNumbers.push('...');
      }

      // Add middle pages
      for (let i = Math.max(2, currentPage - 2); i <= Math.min(currentPage + 2, totalPages - 1); i++) {
          pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (currentPage < totalPages - 3) {
          pageNumbers.push('...');
      }

      // Add last page
      if (totalPages > 1) {
          pageNumbers.push(totalPages);
      }

      return (
          <nav>
              <ul className="pagination" aria-label="pagination">
                  {pageNumbers.map((pageNumber, index) => (
                      <li key={index} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => handlePageChange(pageNumber)} aria-label="Page number">
                              {pageNumber}
                          </button>
                      </li>
                  ))}
              </ul>
          </nav>
      );
    };
    

    const totalPages = calculateTotalPages();

    return (
        <div className="song-catalog-container">
            <div className="song-catalog-overlay"></div> {/* Overlay */}
            <div className="container">
                <h2>My Songs Catalog</h2>
                <div className="d-flex justify-content-between mt-2">
                    <div className="mt-2">
                        <button className="btn bg-btn-custom" onClick={() => setShowFilter(!showFilter)} aria-label="Toggle Filter">Filter Songs</button>
                    </div>
                    <div className="mb-3 mt-2">
                        <div className="d-flex justify-content-end align-items-center">
                            <div className="d-flex align-items-center flex-grow-1 custome-records">
                                <select className="form-select custom-select flex-grow-1" value={songsPerPage} onChange={handleRecordsPerPageChange} aria-label="Select records">
                                    {recordsPerPageOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                <label className="form-label ms-2 mb-0" style={{ whiteSpace: 'nowrap' }} aria-label="Records per page">records per page</label>
                            </div>
                        </div>
                    </div>
                </div>
                {showFilter && <SongFilter setFilteredSongs={handleFilterSongs} setFilterMessage={setFilterMessage} />}
                {filterMessage ? (
                    <div className="alert alert-warning mt-3">{filterMessage}</div>
                ) : (
                    <>
                        <table className="table" data-testid="song-table">
                            <thead>
                                <tr>
                                    <th scope="col" onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                                        Song Name {sortBy.key === 'name' && (sortBy.order === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                                    </th>
                                    <th scope="col">Artist</th>
                                    <th scope="col">Album</th>
                                    <th scope="col" onClick={() => handleSort('releaseYear')} style={{ cursor: 'pointer' }}>
                                        Release Year {sortBy.key === 'releaseYear' && (sortBy.order === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                                    </th>
                                    <th scope="col">Length</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(isLoading || isFetching) && (
                                    <tr>
                                        <td colSpan="8">Loading...</td>
                                    </tr>
                                )}
                                {!isLoading && !isFetching && renderSongs()}
                            </tbody>
                        </table>
                        {totalPages > 1 && renderPagination(totalPages)}
                    </>
                )}
            </div>
        </div>
    );
};

export default SongCatalog;
