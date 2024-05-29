type User = {
    name: string,
}

type UserContext = {
    name: string | undefined,
    setUser: Dispatch<SetStateAction<UserContext>>,
} | null;