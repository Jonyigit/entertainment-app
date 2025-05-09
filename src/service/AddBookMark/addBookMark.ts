import { apiClient } from "../../api";

const AddBookMark = (data: string | undefined) => {
    return apiClient.post("/api/user/add_bookmark", {
        movieId: data,
    });
};

export default AddBookMark;
