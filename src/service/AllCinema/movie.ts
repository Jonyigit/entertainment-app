import { apiClient } from "../../api";

const getMovies = () => {
    return apiClient.get("api/movies");
};

export default getMovies;
