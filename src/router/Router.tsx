import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login.tsx";
import Sign from "../pages/Sign/Sign.tsx";
import PageLayout from "../PageLayout/PageLayout.tsx";
import Trending from "../pages/Trending/Trending.tsx";
import Movies from "../pages/Movies/Movies.tsx";
import TvSeries from "../pages/TvSeries/TvSeries.tsx";
import BookMark from "../pages/BookMark/BookMark.tsx";

export function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/" element={<PageLayout />}>
                <Route index element={<Trending />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tvseries" element={<TvSeries />} />
                <Route path="/bookmark" element={<BookMark />} />
            </Route>
        </Routes>
    );
}
