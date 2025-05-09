import { useQuery } from "@tanstack/react-query";
import bookMarkStyle from "./bookMark.module.scss";
import getBookMark from "../../service/BookMark/bookmark";
import { Movie } from "../../utils/type";
import Card from "../../components/ui/Card/Card";
import { useOutletContext } from "react-router-dom";

function BookMark() {
    // Get search query from PageLayout context
    const { searchQuery } = useOutletContext<{ searchQuery: string }>();

    const { data, isPending } = useQuery({
        queryKey: ["bookmarks", searchQuery],
        queryFn: () => getBookMark(),
    });

    // Filter bookmarks by category AND search query
    const filteredBookmarks =
        data?.data?.filter((item: Movie) => {
            // First filter by isBookmarked (assuming your API returns all items)
            if (!item.isBookmarked) return false;

            // Then apply search filter if query exists
            if (searchQuery) {
                return item.title.toLowerCase().includes(searchQuery) || item.year.toString().includes(searchQuery);
            }
            return true;
        }) || [];

    // Separate into movies and series
    const series = filteredBookmarks.filter((item: Movie) => item.category === "TV Series");
    const movies = filteredBookmarks.filter((item: Movie) => item.category === "Movie");

    return isPending ? (
        <div className={bookMarkStyle.loading}>
            <span className={bookMarkStyle.loader}></span>
        </div>
    ) : (
        <div className={bookMarkStyle.bookmark}>
            {searchQuery ? (
                <div className={bookMarkStyle.searchResults}>
                    <div className={bookMarkStyle.title}>
                        <h1 className={filteredBookmarks.length > 0 ? "" : bookMarkStyle.none}>
                            Bookmarks matching "{searchQuery}"
                        </h1>
                    </div>
                    <div className={bookMarkStyle.cards}>
                        {filteredBookmarks.length > 0 ? (
                            filteredBookmarks.map((item: Movie) => (
                                <Card
                                    key={item.id}
                                    title={item.title}
                                    category={item.category}
                                    rating={item.rating}
                                    year={item.year}
                                    img={item.thumbnail.regular.large}
                                    isBookmarked={item.isBookmarked}
                                />
                            ))
                        ) : (
                            <div className={bookMarkStyle.noResults}>No bookmarks found matching "{searchQuery}"</div>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className={bookMarkStyle.moviesbook}>
                        <div className={bookMarkStyle.title}>
                            <h1>Bookmarked Movies</h1>
                        </div>
                        <div className={bookMarkStyle.cards}>
                            {movies.length > 0 ? (
                                movies.map((item: Movie) => (
                                    <Card
                                        key={item.id}
                                        title={item.title}
                                        category={item.category}
                                        rating={item.rating}
                                        year={item.year}
                                        img={item.thumbnail.regular.large}
                                        isBookmarked={item.isBookmarked}
                                    />
                                ))
                            ) : (
                                <div className={bookMarkStyle.noResults}>No bookmarked movies</div>
                            )}
                        </div>
                    </div>
                    <div className={bookMarkStyle.seriesbook}>
                        <div className={bookMarkStyle.title}>
                            <h1>Bookmarked TV Series</h1>
                        </div>
                        <div className={bookMarkStyle.cards}>
                            {series.length > 0 ? (
                                series.map((item: Movie) => (
                                    <Card
                                        key={item.id}
                                        title={item.title}
                                        category={item.category}
                                        rating={item.rating}
                                        year={item.year}
                                        img={item.thumbnail.regular.large}
                                        isBookmarked={item.isBookmarked}
                                    />
                                ))
                            ) : (
                                <div className={bookMarkStyle.noResults}>No bookmarked TV series</div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default BookMark;
