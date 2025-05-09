import searchStyle from "./search.module.scss";
import searchIcon from "../../../assets/icon/search.svg";
import { ChangeEvent } from "react";

interface SearchProps {
    onSearch: (query: string) => void;
}

function Search({ onSearch }: SearchProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value.trim().toLowerCase());
    };

    return (
        <div className={searchStyle.search}>
            <img src={searchIcon} alt="Search icon" />
            <input
                type="text"
                placeholder="Search for movies or TV series"
                className={searchStyle["search-input"]}
                onChange={handleChange}
                aria-label="Search for movies or TV series"
            />
        </div>
    );
}

export default Search;
