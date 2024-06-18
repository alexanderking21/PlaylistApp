import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaylistApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to search for songs based on the search term
  const searchSongs = async () => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`);
      setSearchResults(response.data.tracks.items);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add a song to the playlist
  const addToPlaylist = (song) => {
    setPlaylist([...playlist, song]);
  };

  // Function to remove a song from the playlist
  const removeFromPlaylist = (song) => {
    const updatedPlaylist = playlist.filter((item) => item.id !== song.id);
    setPlaylist(updatedPlaylist);
  };

  return (
    <div>
      <h1>Jammming - Playlist App</h1>
      <div>
        <input type="text" value={searchTerm} onChange={handleSearchInputChange} />
        <button onClick={searchSongs}>Search</button>
      </div>
      <div>
        <h2>Search Results</h2>
        {searchResults.map((song) => (
          <div key={song.id}>
            <p>{song.name}</p>
            <p>{song.artists[0].name}</p>
            <p>{song.album.name}</p>
            <button onClick={() => addToPlaylist(song)}>Add to Playlist</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Playlist</h2>
        {playlist.map((song) => (
          <div key={song.id}>
            <p>{song.name}</p>
            <p>{song.artists[0].name}</p>
            <p>{song.album.name}</p>
            <button onClick={() => removeFromPlaylist(song)}>Remove from Playlist</button>
          </div>
        ))}
      </div>
      <button>Export Playlist to Spotify</button>
    </div>
  );
};

export default PlaylistApp;
