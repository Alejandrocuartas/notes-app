import axios from "axios";
import errorManagement from "./error_management";

export const updateNoteRequest = async (noteId: number, notes: string, isArchived: boolean) => {
    try {
        const response = await axios.patch<Note>(`${process.env.API}/notes/${noteId}`, {
            notes,
            is_archived: isArchived,
        });
        return response.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
