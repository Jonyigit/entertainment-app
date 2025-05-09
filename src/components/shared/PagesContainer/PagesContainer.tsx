import { useState } from "react";
import Search from "../Search/Search";
import { Outlet } from "react-router-dom";

function PagesContainer() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Jonyigit Project

    return (
        <section>
            <Search onSearch={handleSearch} />
            <div>
                <Outlet context={{ searchQuery }} />
            </div>
        </section>
    );
}

export default PagesContainer;
