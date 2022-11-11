import React, { FC } from "react";

import "./TrackList.css";

import Track from "../Track/Track";
import PlaylistTrack from "../../models/PlaylistTrack";

interface TrackListProps {
    isRemoval: boolean;
    onAdd: (track: PlaylistTrack) => void;
    onRemove?: (track: PlaylistTrack) => void;
    tracks: PlaylistTrack[];
}

const TrackList: FC<TrackListProps> = ({
    onAdd,
    onRemove,
    isRemoval,
    tracks,
}) => (
    <div className="TrackList">
        {tracks.map((track) => (
            <Track
                onRemove={onRemove}
                isRemoval={isRemoval}
                onAdd={onAdd}
                key={track.id}
                track={track}
            />
        ))}
    </div>
);

export default TrackList;
