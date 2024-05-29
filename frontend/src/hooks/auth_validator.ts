export const useAuthValidator = (): UserContext | null => {
    const user = localStorage.getItem("notes_app_user");

    if (!user) {
        return null;
    }

    const userData: UserContext = JSON.parse(user);
    if (userData) {
        return userData;
    }

    return null;
}