import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SongService from '../../services/SongService';
import SuccessBanner from '../SuccessBanner/SuccessBanner';
import './SongForm.css'; // Import CSS file for styling

const SongForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    album: '',
    releaseYear: '',
    length: '',
    genre: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SongService.addSong(formData);
      setShowSuccessMessage(true);
      setFormData({
        name: '',
        artist: '',
        album: '',
        releaseYear: '',
        length: '',
        genre: ''
      });
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };

  const navigateToShowCatalog = () => {
    navigate('/catalog'); // Navigate back to the ShowCatalog component
  };

  return (
    <div className="song-form-container">
      <div className="custom-success-banner-container">
        <div className="custom-success-banner">
          {showSuccessMessage && <SuccessBanner message="Song added successfully" />}
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="song-form-content">

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Song Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" id="name" placeholder="Song Name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="artist" className="form-label">Artist</label>
                  <input type="text" name="artist" value={formData.artist} onChange={handleChange} className="form-control" id="artist" placeholder="Artist" />
                </div>
                <div className="mb-3">
                  <label htmlFor="album" className="form-label">Album</label>
                  <input type="text" name="album" value={formData.album} onChange={handleChange} className="form-control" id="album" placeholder="Album" />
                </div>
                <div className="mb-3">
                  <label htmlFor="releaseYear" className="form-label">Release Year</label>
                  <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} className="form-control" id="releaseYear" placeholder="Release Year" />
                </div>
                <div className="mb-3">
                  <label htmlFor="length" className="form-label">Song Length</label>
                  <input type="text" name="length" value={formData.length} onChange={handleChange} className="form-control" id="length" placeholder="Song Length" />
                </div>
                <div className="mb-3">
                  <label htmlFor="genre" className="form-label">Genre</label>
                  <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="form-control" id="genre" placeholder="Genre" />
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button type="submit" className="btn bg-btn-custom me-2 w-50">Add Song</button>
                  <button type="button" onClick={navigateToShowCatalog} className="btn bg-btn-custom ms-2 w-50">Back to Catalog</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongForm;
