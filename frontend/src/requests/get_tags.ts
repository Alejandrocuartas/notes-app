import axios from "axios";
import errorManagement from "./error_management";

export const getTagsRequest = async () => {
    try {
        const response = await axios.get<Tag[]>(`${process.env.API}/tags`);
        return response.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
