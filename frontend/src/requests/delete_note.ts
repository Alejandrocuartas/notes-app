import axios from "axios";
import errorManagement from "./error_management";

export const deleteNoteRequest = async (id: number) => {
    try {
        const response = await axios.delete(`${process.env.API}/notes/${id}`);
        return response.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
