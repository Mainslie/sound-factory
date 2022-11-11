import React, { FC } from "react";
import "./App.css";

const App: FC = () => {
    return (
        <div>
            <h1>
                <span className="highlight">Sound</span>Factory
            </h1>
            <div className="App">
                {/* <SearchBar onSearch={this.search} />
                <div className="App-playlist">
                    <SearchResults
                        onAdd={this.addTrack}
                        searchResults={this.state.searchResults}
                    />
                    <Playlist
                        playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}
                        onSave={this.savePlaylist}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default App;
