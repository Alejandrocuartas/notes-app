import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValidator } from "../hooks/auth_validator";
import { getNotesRequest } from "../requests/get_notes";
import { useGlobalState } from "../context";
import Note from "../components/Note";
import Loading from "../components/Loading";

const Home = () => {
    const [notesResponse, setNotes] = useState<NotesResponse>(null);
    const globalState = useGlobalState()
    const navigate = useNavigate()
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [loading, setLoading] = useState(false);

    const refresh = () => {
        setRefreshTrigger(!refreshTrigger)
    }

    useEffect(() => {
        const userData = useAuthValidator();
        !userData ? navigate("/login") : globalState?.setUser(userData)
    }, [])

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                if (globalState?.id) {
                    const res = await getNotesRequest(globalState.id, 1, 100, false, globalState.tag_id);
                    res ? setNotes(res) : null;
                }
                setLoading(false);
            } catch (error: any) {
                setLoading(false);
                console.log(error);
                alert(error.message);
            }
        };

        fetchNotes();
    }, [globalState?.id, refreshTrigger, globalState?.tag_id])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading width={12} height={12} />
            </div>
        )
    }

    return (
        <div>
            {
                notesResponse?.notes?.length ? (
                    <div className="flex flex-wrap gap-y-4 justify-between">
                        {
                            notesResponse?.notes.map((note) => (
                                <Note refreshCallback={refresh} key={note.id} note={note}></Note>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    );
};

export default Home;