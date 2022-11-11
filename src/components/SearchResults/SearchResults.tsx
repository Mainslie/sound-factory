import React, { FC } from "react";

import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";
import PlaylistTrack from "../../models/PlaylistTrack";

interface SearchResultsProps {
    onAdd: (track: PlaylistTrack) => void;
    searchResults: PlaylistTrack[];
}

export const SearchResults: FC<SearchResultsProps> = ({
    onAdd,
    searchResults,
}) => {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList onAdd={onAdd} isRemoval={false} tracks={searchResults} />
        </div>
    );
};

export default SearchResults;
