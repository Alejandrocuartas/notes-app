import axios from "axios";
import errorManagement from "./error_management";

export const getNotesRequest = async (id: number, page: number, limit: number, archived: boolean, tagId?: number,) => {
    try {
        const response = await axios.get<NotesResponse>(`${process.env.API}/notes/users/${id}`, {
            params: {
                page,
                limit,
                tag_id: tagId,
                archived: archived.toString()
            }
        });
        return response.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
