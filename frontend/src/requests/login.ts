import axios from "axios";
import errorManagement from "./error_management";

export const loginRequest = async (username: string, password: string) => {
    try {
        const response = await axios.post<User>(`${process.env.API}/users/login`, {
            username,
            password,
        });
        return response.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
