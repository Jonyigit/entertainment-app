import { apiClient } from "../../api";

const removeBookMaker = (data: string | undefined) => {
    return apiClient.delete(`/api/user/remove_bookmark/${data}`);
};

export default removeBookMaker;
