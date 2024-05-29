import axios from "axios";
import errorManagement from "./error_management";

export const addTagToNoteRequest = async (tagID: number, noteID: number) => {
    try {
        const response = await axios.post<User>(`${process.env.API}/tags/${tagID}/notes/${noteID}`);
        return response.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
