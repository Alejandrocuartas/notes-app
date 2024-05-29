export const authValidator = (): boolean => {
    const user = localStorage.getItem("notes_app_user");

    if (!user) {
        return false;
    }

    const userData: UserContext = JSON.parse(user);
    if (user) {
        return true;
    }

    return false;
}