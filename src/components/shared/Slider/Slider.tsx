import SliderCard from "../sliderCard/SliderCard";
import sliderStyle from "./slider.module.scss";
import { useQuery } from "@tanstack/react-query";
import getMovies from "../../../service/AllCinema/movie";
import { Movie } from "../../../utils/type";

function Slider() {
    const { data } = useQuery({
        queryKey: ["trending"],
        queryFn: () => getMovies(),
    });

    const trendingMovies = data?.data?.filter((item: Movie) => item.isTrending) || [];

    return (
        <div className={sliderStyle["slider-container"]}>
            <h1>Trending</h1>
            <div className={sliderStyle.carrousel}>
                {trendingMovies.map((item: Movie) => {
                    let { id, title, category, rating, year, thumbnail, isBookmarked } = item;

                    return (
                        <SliderCard
                            key={id}
                            title={title}
                            category={category}
                            rating={rating}
                            year={year}
                            img={thumbnail.regular.large}
                            isBookmarked={isBookmarked}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Slider;
