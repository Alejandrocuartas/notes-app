import axios from "axios";
import errorManagement from "./error_management";

export const signupRequest = async (name: string, username: string, password: string) => {
    try {
        const response = await axios.post<User>(`${process.env.API}/users`, {
            username,
            password,
            name,
        });
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        errorManagement(error)
    }
};
