class Song {
  constructor({ id = '', name = '', artist = '', album = '', releaseYear = '', length = '', genre = '' }) {
    this.id = id;
    this.name = name;
    this.artist = artist;
    this.album = album;
    this.releaseYear = releaseYear;
    this.length = length;
    this.genre = genre;
  }

  static fromFormData(formData) {
    const { id, name, artist, album, releaseYear, length, genre } = formData;
    return new Song({ id, name, artist, album, releaseYear, length, genre });
  }
}

export default Song;