import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SongService from '../../services/SongService';
import './SongDetails.css'; // Import CSS file for styling

const SongDetails = () => {
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const { id } = useParams(); // Get the song ID from URL params

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const songData = await SongService.getSongById(id);
        setSong(songData);
      } catch (error) {
        console.error('Error fetching song details:', error);
      }
    };

    fetchSongDetails();
  }, [id]); // Fetch song details when ID changes

  const navigateToShowCatalog = () => {
    navigate('/catalog'); // Navigate back to the ShowCatalog component
  };

  return (
    <div className="song-details-container">
      <div className="song-details-overlay"></div> {/* Black overlay */}
      <div className="container song-details-inner-container">
        <h2 className="text-center mb-4">Song Details</h2>
        {song && (
          <div className="d-flex flex-column align-items-center text-black bigger-font">
            <p><strong>Name:</strong> {song.name}</p>
            <p><strong>Artist:</strong> {song.artist}</p>
            <p><strong>Album:</strong> {song.album}</p>
            <p><strong>Year:</strong> {song.releaseYear}</p>
            <p><strong>Length:</strong> {song.length}</p>
            <p><strong>Genre:</strong> {song.genre}</p>
          </div>
        )}
        <div className="text-center mt-3">
          <button type="button" onClick={navigateToShowCatalog} className="btn bg-btn-custom">Back to Catalog</button>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
