import axios from "axios";
import errorManagement from "./error_management";

export const createTagRequest = async (tag: string, emoji: string, noteId: number) => {
    try {
        const response = await axios.post<Tag>(`${process.env.API}/tags`, {
            tag,
            emoji,
            note_id: noteId,
        });
        return response.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
