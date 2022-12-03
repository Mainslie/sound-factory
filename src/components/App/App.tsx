import React, { FC, useState } from "react";
import "./App.css";

import { spotifyApi } from "../../apis/spotify";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import PlaylistTrack from "../../models/PlaylistTrack";

const App: FC = () => {
    const [searchResults, setSearchResults] = useState<PlaylistTrack[]>([]);
    const [playlistName, setPlaylistName] = useState<string>("My playlist");
    const [playlistTracks, setPlaylistTracks] = useState<PlaylistTrack[]>([]);

    const addTrack = (track: PlaylistTrack) => {
        if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
            return;
        }
        setPlaylistTracks([...playlistTracks, track]);

        let results = searchResults;
        results = results.filter(
            (currentTrack) => currentTrack.id !== track.id
        );
        setSearchResults(results);
    };

    const removeTrack = (track: PlaylistTrack) => {
        let tracks = playlistTracks;
        tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
        setPlaylistTracks(tracks);

        if (searchResults.find((savedTrack) => savedTrack.id === track.id)) {
            return;
        }
        setSearchResults([track, ...searchResults]);
    };

    const updatePlaylistName = (name: string) => {
        setPlaylistName(name);
    };

    const savePlaylist = () => {
        const trackUris = playlistTracks.map((track) => track.uri);
        spotifyApi.savePlaylist(playlistName, trackUris).then(() => {
            setPlaylistName("New Playlist");
            setPlaylistTracks([]);
        });
    };

    const search = async (term: string) => {
        spotifyApi.search(term).then((searchResults) => {
            setSearchResults(searchResults);
        });
    };

    return (
        <div>
            <h1>
                <span className="highlight">Sound</span>Factory
            </h1>
            <div className="App">
                <SearchBar onSearch={search} />
                <div className="App-playlist">
                    <SearchResults
                        onAdd={addTrack}
                        searchResults={searchResults}
                    />
                    <Playlist
                        playlistName={playlistName}
                        playlistTracks={playlistTracks}
                        onRemove={removeTrack}
                        onNameChange={updatePlaylistName}
                        onSave={savePlaylist}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
