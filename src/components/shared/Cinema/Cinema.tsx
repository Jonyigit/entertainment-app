import getMovies from "../../../service/AllCinema/movie";
import Card from "../../ui/Card/Card";
import cinemaStyle from "./cinema.module.scss";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "../../../utils/type";

interface CinemaProps {
    searchQuery: string;
}

function Cinema({ searchQuery }: CinemaProps) {
    const { data, isPending } = useQuery({
        queryKey: ["movies", searchQuery],
        queryFn: () => getMovies(),
    });

    const filteredMovies = data?.data.filter((movie: Movie) => {
        if (!searchQuery) return true;
        return movie.title.toLowerCase().includes(searchQuery) || movie.category.toLowerCase().includes(searchQuery);
    });

    return isPending ? (
        <div className={cinemaStyle.loading}>
            <span className={cinemaStyle.loader}></span>
        </div>
    ) : (
        <div className={cinemaStyle.cinema}>
            <h1 className={filteredMovies?.length === 0 ? cinemaStyle.none : ""}>
                {searchQuery ? `Results for "${searchQuery}"` : "Recommended for you"}
            </h1>
            {filteredMovies?.length === 0 ? (
                <div className={cinemaStyle.noResults}>No results found for "{searchQuery}"</div>
            ) : (
                <div className={cinemaStyle.cards}>
                    {filteredMovies?.map((item: Movie) => (
                        <Card
                            key={item.id}
                            category={item.category}
                            rating={item.rating}
                            title={item.title}
                            year={item.year}
                            img={item.thumbnail.regular.large}
                            isBookmarked={item.isBookmarked}
                            isTrending={item.isTrending}
                            id={item._id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cinema;
