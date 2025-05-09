import Card from "../../components/ui/Card/Card";
import TvSeriesStyle from "./tvseries.module.scss";
import { useQuery } from "@tanstack/react-query";
import getMovies from "../../service/AllCinema/movie";
import { Movie } from "../../utils/type";
import { useOutletContext } from "react-router-dom";

function TvSeries() {
    const { searchQuery } = useOutletContext<{ searchQuery: string }>();

    const { data, isPending } = useQuery({
        queryKey: ["seriesCategory", searchQuery],
        queryFn: () => getMovies(),
    });

    const series =
        data?.data?.filter((item: Movie) => {
            if (item.category !== "TV Series") return false;

            if (searchQuery) {
                return item.title.toLowerCase().includes(searchQuery) || item.year.toString().includes(searchQuery);
            }
            return true;
        }) || [];

    return isPending ? (
        <div className={TvSeriesStyle.loading}>
            <span className={TvSeriesStyle.loader}></span>
        </div>
    ) : (
        <div className={TvSeriesStyle.tvseries}>
            <div className={TvSeriesStyle.title}>
                <h1 className={series.length === 0 ? TvSeriesStyle.none : ""}>
                    {searchQuery ? `TV Series matching "${searchQuery}"` : "TV Series"}
                </h1>
            </div>

            {series.length === 0 ? (
                <div className={TvSeriesStyle.noResults}>
                    {searchQuery ? `No TV series found matching "${searchQuery}"` : "No TV series available"}
                </div>
            ) : (
                <div className={TvSeriesStyle["tvseries-cards"]}>
                    {series.map((item: Movie) => (
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

export default TvSeries;
