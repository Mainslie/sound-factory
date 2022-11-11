import React, { FC, useState } from "react";

import "./SearchBar.css";

interface SearchBarProps {
    onSearch: (term: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
    const [term, setTerm] = useState<string>("");

    return (
        <div className="SearchBar">
            <input
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Enter A Song, Album, or Artist"
            />
            <button className="SearchButton" onClick={() => onSearch(term)}>
                SEARCH
            </button>
        </div>
    );
};

export default SearchBar;
