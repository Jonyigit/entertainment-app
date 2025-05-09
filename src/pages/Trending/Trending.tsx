import Cinema from "../../components/shared/Cinema/Cinema";
import Slider from "../../components/shared/Slider/Slider";
import { useOutletContext } from "react-router-dom";

function Trending() {
    const { searchQuery } = useOutletContext<{ searchQuery: string }>();

    return (
        <>
            {!searchQuery && <Slider />}
            <Cinema searchQuery={searchQuery} />
        </>
    );
}

export default Trending;
