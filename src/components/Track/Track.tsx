import React, { FC } from "react";
import PlaylistTrack from "../../models/PlaylistTrack";

import "./Track.css";
import TrackButton from "./TrackButton";

interface TrackProps {
    track: PlaylistTrack;
    isRemoval: boolean;
    onAdd?: (track: PlaylistTrack) => void;
    onRemove?: (track: PlaylistTrack) => void;
}

const Track: FC<TrackProps> = ({ track, isRemoval, onAdd, onRemove }) => {
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>
                    {track.artist} | {track.album}{" "}
                </p>
            </div>
            <TrackButton
                isRemoval={isRemoval}
                add={() => {
                    if (onAdd) {
                        onAdd(track);
                    }
                }}
                remove={() => {
                    if (onRemove) {
                        onRemove(track);
                    }
                }}
            />
        </div>
    );
};

export default Track;
