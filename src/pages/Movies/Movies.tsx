import Card from "../../components/ui/Card/Card";
import moviesStyle from "./movies.module.scss";
import { useQuery } from "@tanstack/react-query";
import getMovies from "../../service/AllCinema/movie";
import { Movie } from "../../utils/type";
import { useOutletContext } from "react-router-dom";

function Movies() {
    const { searchQuery } = useOutletContext<{ searchQuery: string }>();

    const { data, isPending } = useQuery({
        queryKey: ["moviesCategory", searchQuery],
        queryFn: () => getMovies(),
    });

    const movies =
        data?.data?.filter((item: Movie) => {
            if (item.category !== "Movie") return false;

            if (searchQuery) {
                return item.title.toLowerCase().includes(searchQuery) || item.year.toString().includes(searchQuery);
            }
            return true;
        }) || [];

    return isPending ? (
        <div className={moviesStyle.loading}>
            <span className={moviesStyle.loader}></span>
        </div>
    ) : (
        <div className={moviesStyle.movies}>
            <div className={moviesStyle.title}>
                <h1 className={movies.length === 0 ? moviesStyle.none : ""}>
                    {searchQuery ? `Movies matching "${searchQuery}"` : "Movies"}
                </h1>
            </div>

            {movies.length === 0 ? (
                <div className={moviesStyle.noResults}>
                    {searchQuery ? `No movies found matching "${searchQuery}"` : "No movies available"}
                </div>
            ) : (
                <div className={moviesStyle["movies-cards"]}>
                    {movies.map((item: Movie) => (
                        <Card
                            key={item.id}
                            title={item.title}
                            category={item.category}
                            rating={item.rating}
                            year={item.year}
                            img={item.thumbnail.regular.large}
                            isBookmarked={item.isBookmarked}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Movies;
