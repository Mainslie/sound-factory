import React, { FC } from "react";

import "./Playlist.css";

import TrackList from "../TrackList/TrackList";
import PlaylistTrack from "../../models/PlaylistTrack";

interface PlaylistProps {
    onRemove: (track: PlaylistTrack) => void;
    onNameChange: (name: string) => void;
    playlistTracks: PlaylistTrack[];
    onSave: () => void;
}

export const Playlist: FC<PlaylistProps> = ({
    onRemove,
    onNameChange,
    onSave,
    playlistTracks,
}) => {
    return (
        <div className="Playlist">
            <input
                defaultValue={"New Playlist"}
                onChange={(event) => onNameChange(event.target.value)}
            />
            <TrackList onRemove={onRemove} isRemoval tracks={playlistTracks} />
            <button className="Playlist-save" onClick={onSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
};

export default Playlist;