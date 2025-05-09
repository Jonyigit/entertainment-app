import { apiClient } from "../../api";

const getBookMark = () => {
    return apiClient.get("api/user/bookmarks");
};

export default getBookMark;
