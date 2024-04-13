import Song from '../entity/Song';

const API_URL = 'http://localhost:8080/api';

const SongService = {
    addSong: async (formData) => {
        const song = Song.fromFormData(formData); // Convert formData to a Song object
        const response = await fetch(`${API_URL}/song`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        });

        if (!response.ok) {
            throw new Error('Failed to add song');
        }
    },

    getAllSongs: async (sortBy) => {
      try {
        let url = `${API_URL}/songs`;
        if (sortBy.key === "name") {
          url += '?sortBySongName=true';
        } else if (sortBy.key === "releaseYear") {
          url += '?sortByReleaseYear=true';
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch song details');
        }
        const songsData = await response.json();
        return songsData.map(song => new Song(song));
      } catch (error) {
        throw error;
      }
    },

    getSongById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/song/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch song details');
            }
            const songData = await response.json();
            return new Song(songData);
        } catch (error) {
            throw new Error('Error fetching song details:', error);
        }
    },

    filterSongsByReleaseYearAndArtist: async (year, artist) => {
        try {
            // Convert year to string to ensure it's always a string
            year = year.toString();

            // Construct URL based on parameters
            let url = `${API_URL}/songs/filter`;

            // Check if either year or artist is present
            if (year && year !== '' && artist && artist.trim() !== '') {
                url += `?year=${year}&artist=${artist}`;
            } else if (year && year.trim() !== '') {
                url += `?year=${year}`;
            } else if (artist && artist.trim() !== '') {
                url += `?artist=${artist}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to filter songs');
            }
            return await response.json();
        } catch (error) {
            throw new Error('Error filtering songs:', error);
        }
    }
};

export default SongService;
