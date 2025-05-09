import { Outlet, useLocation } from "react-router-dom";
import Aside from "../components/shared/Aside/Aside";
import Search from "../components/shared/Search/Search";
import pageStyle from "./pagelayout.module.scss";
import { useState } from "react";

function PageLayout() {
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();

    const handleSearch = (query: string) => {
        setSearchQuery(query.toLowerCase());
    };

    // Determine if we should show search (you can customize this logic)
    const showSearch = !["/login", "/signup"].includes(location.pathname);

    return (
        <main className={pageStyle.home}>
            <Aside />
            <section className={pageStyle["pages-container"]}>
                {showSearch && <Search onSearch={handleSearch} />}
                <div className="container">
                    <Outlet context={{ searchQuery }} />
                </div>
            </section>
        </main>
    );
}

export default PageLayout;
