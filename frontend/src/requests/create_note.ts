import axios from "axios";
import errorManagement from "./error_management";

export const createNoteRequest = async (notes: string, userId: number) => {
    try {
        const response = await axios.post<Note>(`${process.env.API}/notes`, {
            notes,
            user_id: userId,
        });
        return response.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
