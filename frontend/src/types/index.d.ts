type User = {
    name: string,
    id: number,
}

type UserContext = {
    name: string | undefined,
    id: number | undefined,
    setUser: Dispatch<SetStateAction<UserContext>>,
    tag_id: number | undefined,
};

type Tag = {
    id: number,
    tag: string,
    emoji: string,
}

type Note = {
    id: number,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    notes: string,
    is_archived: boolean,
    tags: Tag[],
}

type NotesResponse = {
    notes: Note[],
    total: number,
    page: number,
    limit: number,
    total_pages: number,
} | null;
