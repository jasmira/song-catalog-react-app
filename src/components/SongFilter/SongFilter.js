import React, { useState } from 'react';
import SongService from '../../services/SongService';

const SongFilter = ({ setFilteredSongs, setFilterMessage }) => {
  const [year, setYear] = useState('');
  const [artist, setArtist] = useState('');

  const handleFilter = async () => {
      try {
          let filteredSongs = await SongService.filterSongsByReleaseYearAndArtist(year, artist);

          // Check if filteredSongs is undefined
          if (filteredSongs === undefined) {
            filteredSongs = []; // Set filteredSongs to an empty array
          }

          if (filteredSongs.length === 0) {
            let message = '';
            if(artist !== '' && year !== '') {
              message = `No songs found for artist: ${artist} and release year: ${year}`;
            } else if(artist !== '') {
              message = `No songs found for artist: ${artist}`;
            } else if(year !== '') {
              message = `No songs found for release year: ${year}`;
            }
            setFilteredSongs(filteredSongs); // Set empty array
            setFilterMessage(message);
          } else {
              setFilteredSongs(filteredSongs); // Pass filtered data back to parent
              setFilterMessage('');
          }
      } catch (error) {
          console.error('Error filtering songs:', error);
      }
  };

  const handleClear = () => {
      setYear('');
      setArtist('');
      setFilteredSongs([]); // Clear filtered data
      setFilterMessage('');
  };

  return (
      <div className="mb-3 mt-md-3 mt-3">
          <div className="input-group">
              <input
                  type="text"
                  className="form-control col-4 col-md-3"
                  placeholder="Enter Release Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
              />
              <input
                  type="text"
                  className="form-control col-4 col-md-3"
                  placeholder="Enter Artist Name"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
              />
              <button className="btn bg-btn-custom col-4 col-md-3 me-2" onClick={handleFilter}>Filter</button>
              <button className="btn bg-btn-custom col-4 col-md-3" onClick={handleClear}>Clear</button>
          </div>
      </div>
  );
};

export default SongFilter;
